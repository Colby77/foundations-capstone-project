require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const {SERVER_PORT} = process.env

const app = express()

const {diceRollScores, saveChar, seed, register, login, logout, getChars} = require('./controller.js')

app.use(express.json())
app.use(cors())
app.use(session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    })
)

app.get('/', (req, res) => {
    req.session.test = 'testing'
    // req.session.currentUser = null
    console.log(req.session)
    console.log(req.session.id)
    res.status(200).send(req.session)
})

app.post('/seed', seed)

app.get('/attribute_scores', diceRollScores)
app.post('/character_complete', saveChar)
app.post('/register', register)
app.post('/login', login)
app.post('/logout', logout)
app.get('/chars/:id', getChars)

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))