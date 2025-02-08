const cors = require('cors')
require('dotenv').config()
const express = require('express')
const express_ws = require('express-ws')
const bodyParser = require('body-parser')

const { requestLogger, unknownEndpoint, errorHandler } = require('./config/middleware')

const contactRouter = require('./routes/contactRoute')

//* create express server
const { app } = express_ws(express())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(requestLogger)

//* create websocket connection (needs server setup first*)
// app.ws('/', (websocket, request) => {
//     server.handleConnection(websocket, request)
// })

app.use('/', contactRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app