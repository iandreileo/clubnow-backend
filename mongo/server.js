const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const mongoose = require('mongoose')

mongoose.connect(source, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("DB connected.");
})