const express = require('express')
const cors = require('cors')

const app = express()

const { diceRollScores } = require('./controller.js')

app.use(express.json())
app.use(cors())

const port = 4004

app.get('/attribute_scores', diceRollScores)

app.listen(port, () => console.log(`Server running on port ${port}`))