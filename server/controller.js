const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config()
const {CONNECTION_STRING} = process.env

const Sequelize = require("sequelize")
const sqlize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

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
            if(score < 8 && score > 5){
                score += 2
                scores.push(score)
            }else if(score <= 5){
                score += 4
                scores.push(score)
            }else{
                scores.push(score)
            }
        }
        res.status(200).send(scores)
    },
    saveChar: (req, res) => {
        console.log(req.body)
        res.status(200).send('server side ok, sent to front')
    },
    seed: (req, res) => {
        sqlize.query(`
        drop table if exists characters;

        create table characters(
            character_id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            race VARCHAR(50),
            class VARCHAR(50),
            background VARCHAR(50),
            alignment VARCHAR(50),
            prof_bonus INTEGER,
            cha INTEGER,
            con INTEGER,
            dex INTEGER,
            intl INTEGER,
            str INTEGER,
            wis INTEGER,
            profs VARCHAR(200),
            langs VARCHAR(100),
            spells VARCHAR(200)

        );

        INSERT INTO characters(name, race, class, background, alignment, prof_bonus,
             cha, con, dex, intl, str, wis, profs, langs, spells)
             VALUES('Imsh', 'Half-Orc', 'Bard', 'Soldier', 'Chaotic-Good',
              2, 17, 11, 13, 8, 17, 12, 'Intimidation, Athletics, Persuasion, Performance', 'Orc, Common',
              'Vicious Mockery, Prestidigitation, Minor Illusion');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}