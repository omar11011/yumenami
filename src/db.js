const { set, connect } = require('mongoose')

module.exports = async () => {
    try {
        set('strictQuery', true)
        connect(process.env.MONGODB_URI, {})
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