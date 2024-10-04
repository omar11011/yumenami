const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const express = require('express')

const app = express()

// Settings
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/page.routes'))
app.use('/api', require('./routes/api.routes'))

app.use((req, res, next) => {
    res.redirect('/')
})

module.exports = app