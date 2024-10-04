const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')
const PDFDocument = require('pdfkit')
const { Parser } = require('json2csv')

const folder = path.join(__dirname, '../public/downloads')

const createFolder = () => {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true })
}

const convertToJson = data => {
    fs.writeFileSync(path.join(folder, 'data.json'), JSON.stringify(data, null, 2), 'utf-8')
}

const convertToCsv = data => {
    const json2csvParser = new Parser()
    const csv = json2csvParser.parse(data)
    fs.writeFileSync(path.join(folder, 'data.csv'), csv)
}

const convertToSql = data => {
    const sentenciasSQL = []
    data.forEach(e => {
        const sql = `INSERT INTO surveys (${Object.keys(e).join(", ")}) VALUES ('${Object.keys(e).map(f => e[f]).join("', ")}');`
        sentenciasSQL.push(sql)
    })
    const contenidoSQL = sentenciasSQL.join('\n')
    fs.writeFileSync(path.join(folder, 'data.sql'), contenidoSQL)
}

const convertToExcel = data => {
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Surveys')
    XLSX.writeFile(workbook, path.join(folder, 'data.xlsx'))
}

const convertToTxt = data => {
    const textoPlano = data.map(e => Object.keys(e).map(f => f + `: ` + e[f]).join(', ')).join('\n')
    fs.writeFileSync(path.join(folder, 'data.txt'), textoPlano)
}

const convertToPdf = data => {
    const doc = new PDFDocument()
    doc.pipe(fs.createWriteStream(path.join(folder, 'data.pdf')))

    data.forEach(e => {
        doc.text(Object.keys(e).map(f => f + `: ` + e[f]).join(', '))
        doc.moveDown()
    })
    
    doc.end()
}

module.exports = {
    createFolder,
    convertToJson,
    convertToCsv,
    convertToSql,
    convertToExcel,
    convertToTxt,
    convertToPdf,
}