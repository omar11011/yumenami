const { Router } = require('express')
const { HomePage, FormPage, DataPage, ResultPage } = require('../controllers/page.controller')

const router = Router()

router.get('/', HomePage)
router.get('/form', FormPage)
router.get('/data', DataPage)
router.get('/results', ResultPage)

module.exports = router