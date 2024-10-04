const { Router } = require('express')
const { HomePage, FormPage, DataPage } = require('../controllers/page.controller')

const router = Router()

router.get('/', HomePage)
router.get('/form', FormPage)
router.get('/data', DataPage)

module.exports = router