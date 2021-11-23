// const { default: axios } = require("axios")


let diceRoll = document.querySelector('#dice-roll');
let raceBlocks = document.querySelector('.race-section');
let testBtn = document.getElementById('test')

let getRaces = (req, res) => {
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
// diceRollScores()
diceRoll.addEventListener('click', () => {
    axios.get('http://localhost:4004/attribute_scores')
    .then((res) => {
        console.log(res.data)
    }).catch((err) => console.log(err))
})