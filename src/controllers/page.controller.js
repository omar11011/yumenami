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
    console.log(datos.length)
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

module.exports = {
    HomePage,
    FormPage,
    DataPage,
}