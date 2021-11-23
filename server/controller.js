const { default: axios } = require("axios");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

module.exports = {
    diceRollScores: (req, res) => {
        let scores = []
        for(let i = 0; i < 6; i++){
            let rolls = []
            for(let i = 0; i < 4; i++){
                let roll = Math.floor(Math.random() * 6)
                rolls.push(roll)
            }
            rolls = rolls.sort()
            rolls.shift()
            let score = rolls[0] + rolls[1] + rolls[2]
            scores.push(score)
        }
        res.status(200).send(scores)
    },
    getRaces: async (req, res) => {
        const {data: response} = await axios.get('http://www.dnd5eapi.co/api/races')
       console.log(response.results)
      return response.results
        // .then((response) => {
        //     let {data} = response
        //     console.log(response.data);
        //     response.status(200).send(response.data);
        // }).catch((err) => console.log(err))
    }
}