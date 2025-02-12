const Router = require('express')
const { postNewContact } = require('../controllers/contactController')

const contactRouter = Router()

contactRouter.post('/', postNewContact)

module.exports = contactRouter