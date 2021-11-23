// const { default: axios } = require("axios")

// const { default: axios } = require("axios");


let diceRoll = document.querySelector('#dice-roll');
let raceBlocks = document.querySelector('.race-section');
let testBtn = document.getElementById('test')
let classSection = document.getElementById('class-blocks')

const getRaces = (req, res) => {
    axios.get('http://www.dnd5eapi.co/api/races')
    .then((res) => {
        const {results} = res.data
        console.log(results)
        for(let i = 0; i < results.length; i++){
            let newRace = document.createElement('div')
            newRace.classList.add('race-option')
            newRace.innerHTML = `<h4>${results[i].name}<h4>`
            newRace.id = results[i].index
            newRace.addEventListener('click', () => {
                console.log(`${newRace.id} clicked`)
            })
            raceBlocks.appendChild(newRace)
        }

    }).catch((err) => console.log('somethins messed up'))
}
getRaces()

const getClasses = (req, res) => {
    axios.get('http://www.dnd5eapi.co/api/classes')
    .then((res) => {
        const {results} = res.data
        console.log(results)
        results.forEach((element, index) => {
            let newClass = document.createElement('div')
            newClass.classList.add('class-option')
            newClass.innerHTML = `<h3>${results[index].name}</h3>`
            newClass.id = results[index].index
            newClass.addEventListener('click', () => {
                console.log(`${newClass.id} clicked`)
            })
            classSection.appendChild(newClass)
        })
    })
}
getClasses()

// diceRollScores()
diceRoll.addEventListener('click', () => {
    axios.get('http://localhost:4004/attribute_scores')
    .then((res) => {
        console.log(res.data)
    }).catch((err) => console.log(err))
})