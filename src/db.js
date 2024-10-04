const { set, connect } = require('mongoose')

module.exports = async () => {
    try {
        set('strictQuery', true)
        connect('mongodb://127.0.0.1:27017/yumenami', {})
        .then(async () => {
            console.log('Conexión exitosa a MongoDB')
        })
        .catch((error) => {
            console.error('Error al conectar a MongoDB:', error.message)
        })
    }
    catch(err) {
        console.log(err)
    }
}