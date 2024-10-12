const Survey = require('../models/Survey')
const questions = require('../data/questions')
const {
    createFolder, convertToJson,
    convertToCsv, convertToSql,
    convertToExcel, convertToTxt,
    convertToPdf,
} = require('../utils/convertData')

const HomePage = (req, res) => {
    return res.render('home', {
        navbar: 'home',
    })
}

const FormPage = (req, res) => {
    return res.render('form', {
        questions,
        navbar: 'form',
    })    
}

const DataPage = async (req, res) => {
    const datos = await Survey.find({}).select('-createdAt -updatedAt -__v').lean()
    try {
        createFolder()
        convertToJson(datos)
        convertToCsv(datos)
        convertToSql(datos)
        convertToExcel(datos)
        convertToTxt(datos)
        convertToPdf(datos)
    } catch (err) {
        console.error('Error al exportar datos:', err)
    }

    return res.render('data', {
        navbar: 'data',
        numberOfData: datos.length,
        typeOfData: ['csv', 'xlsx', 'json', 'sql', 'txt', 'pdf'],
    })
}

const ResultPage = async (req, res) => {
    let results = JSON.parse(JSON.stringify(questions))
    let schools = []
    let datos = await Survey.find({}).select('-createdAt -updatedAt -__v').lean()
    
    results.forEach(e => {
        e.questions = e.questions.map(q => {
            return {
                question: q,
            }
        })
    })

    datos.forEach((e, idx) => {
        for (let i = 1; i <= 30; i++) {
            let section = parseInt(i / 5)
            if (i % 5 === 0) section -= 1
            let question = i - 1 - section * 5
            if (!results[section].questions[question].percentage) results[section].questions[question].percentage = 0
            if (e[`P${i}`] === true) results[section].questions[question].percentage += 1
            if (idx === datos.length - 1) {
                results[section].questions[question].percentage = (results[section].questions[question].percentage * 100 / datos.length).toFixed(2)
            }
        }
        let school = schools.findIndex(f => f.name === e.school)
        if (school < 0) schools.push({
            name: e.school,
            type: e.typeOfSchool,
            province: e.province,
            count: 1,
        })
        else schools[school].count += 1
    })

    console.log(schools)
    return res.render('results', {
        navbar: 'results',
        results,
        schools,
    })
}

module.exports = {
    HomePage,
    FormPage,
    DataPage,
    ResultPage,
}