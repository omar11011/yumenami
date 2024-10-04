const Survey = require('../models/Survey')

const Create = async (req, res) => {
    let data = req.body

    if (!data.password | data.password !== process.env.APIKEY) return res.redirect('/form')

    for (let i = 1; i <= 30; i++) {
        if (data[`p${i}`]) data[`p${i}`] = true
    }
    
    await Survey.create(data)
    return res.redirect('/form')
}

module.exports = {
    Create,
}