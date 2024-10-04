const { Router } = require('express')
const { Create } = require('../controllers/api.controller')

const router = Router()

router.post('/create', Create)

module.exports = router