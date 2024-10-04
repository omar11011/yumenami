const { Schema, model } = require('mongoose')

const questions = {}

for (let i = 1; i <= 30; i++) questions[`P${i}`] = Boolean

const surveySchema = new Schema({
    age: { type: Number, default: 12 },
    school: { type: String, default: 'IEP Exitus' },
    typeOfSchool: { type: String, default: 'Particular' },
    province: { type: String, default: 'Piura' },
    district: { type: String, default: 'Piura' },
    ...questions,
}, {
    timestamps: true,
})

module.exports = model('Survey', surveySchema)