require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env

const app = express()

const {diceRollScores, saveChar, seed, register, login, getChars} = require('./controller.js')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.post('/seed', seed)

app.get('/attribute_scores', diceRollScores)
app.post('/character_complete', saveChar)
app.post('/register', register)
app.post('/login', login)
app.get('/chars/:id', getChars)

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))