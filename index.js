require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

//* Add your own configuration here
const mongo_url = process.env.MONGO_URL
const port = process.env.PORT

mongoose.set('strictQuery', false)
mongoose.connect(mongo_url)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(error => console.log('There was an error connecting to MongoDB', error.message))

app.listen(port,
    () => console.log('Listening on port: ', port)
)