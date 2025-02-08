const Router = require('express')
const { getHello, postNewContact } = require('../controllers/contactController')

const contactRouter = Router()

contactRouter.get('/', getHello)
contactRouter.post('/', postNewContact)

module.exports = contactRouter