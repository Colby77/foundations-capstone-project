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
        const{character_name, character_race, character_class, background, character_alignment,
        prof_bonus, cha, con, dex, intl, str, wis, profs, langs, spells} = req.body
        sqlize.query(`
        INSERT INTO characters(name, race, class, background, alignment, prof_bonus,
            cha, con, dex, intl, str, wis, profs, langs, spells)
            VALUES('${character_name}', '${character_race}', '${character_class}', '${background}',
                '${character_alignment}', ${prof_bonus}, ${cha}, ${con}, ${dex}, ${intl},
                ${str}, ${wis}, '${profs}', '${langs}', '${spells}');
        `).then(() => {
            console.log('character saved to DB')
            res.sendStatus(200)
        }).catch(err => console.log('error saving character', err))
    },
    seed: (req, res) => {
        sqlize.query(`
        drop table if exists characters;
        drop table if exists users;

        create table users(
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(100),
            password VARCHAR(255),
            email VARCHAR(50)
        );

        create table characters(
            character_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
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


        INSERT INTO users(username, password, email)
        VALUES('login123', 'password', 'log@in');

        INSERT INTO characters(user_id, name, race, class, background, alignment, prof_bonus,
             cha, con, dex, intl, str, wis, profs, langs, spells)
             VALUES(1, 'Imsh', 'Half-Orc', 'Bard', 'Soldier', 'Chaotic-Good',
              2, 17, 11, 13, 8, 17, 12, 'Intimidation, Athletics, Persuasion, Performance', 'Orc, Common',
              'Vicious Mockery, Prestidigitation, Minor Illusion'),

              (1, 'Clank', 'Goblin', 'Cleric', 'Noble', 'Chaotic-Neutral', 2, 12, 12, 14, 12, 10, 13,
              'Persuasion, Religion, Medicine, Arcana', 'Common, Goblin', 'Guidance, Mage Hand');
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const {username, password, email} = req.body
        sqlize.query(`
        INSERT INTO users(username, password, email)
        VALUES('${username}', '${password}', '${email}');
        `)
        let newUser = {
            username: username,
            password,
            email
        }
        res.status(200).send(newUser)
    },
    login: (req, res) => {
        console.log('logging in')
        console.log(req.body)
        const{username, password} = req.body
        let user = sqlize.query(`
        SELECT username FROM users
        WHERE password = ${password}
        `)
        res.status(200).send(user)
    }
}