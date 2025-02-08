/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const requestLogger = (req, _res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('_____')
    next()
}

const checkCredentials = (req, _res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    console.log(token)
    if (!token) return next(new Error('token'))

    const decodedToken = jwt.verify(token, secret)
    if (!decodedToken) return next(new Error('token'))
    next()
}

const errorHandler = (err, _req, res) => {
    console.error(err.stack)
    res.status(500).json({ error: err.message || 'Internal Server Error' })
}

const unknownEndpoint = (_req, res) => {
    res.status(404).json({ message: 'Unknown endpoint' })
}

module.exports = {
    requestLogger,
    checkCredentials,
    errorHandler,
    unknownEndpoint
}