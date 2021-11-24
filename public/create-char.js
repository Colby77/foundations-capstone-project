let diceRoll = document.querySelector('#dice-roll');
let raceBlocks = document.querySelector('.race-section');
let testBtn = document.getElementById('test')
let classSection = document.getElementById('class-blocks')
let attributeSection = document.querySelector('.attributes-section')
let attributeSectionTest = document.querySelector('.attributes-section-test')
let skillsSection = document.querySelector('.skills-section')
let raceChoice = document.getElementById('race-choice')
let classChoice = document.getElementById('class-choice')
const backgroundChoice = document.getElementById('background-choice')
const backgrounds = document.getElementById('backgrounds')

const chaScore = document.getElementById('cha-score')
const conScore = document.getElementById('con-score')
const dexScore = document.getElementById('dex-score')
const intScore = document.getElementById('int-score')
const strScore = document.getElementById('str-score')
const wisScore = document.getElementById('wis-score')

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
                raceChoice.value = `${results[i].name}`
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
                classChoice.value = `${results[index].name}`
                // console.log(`${newClass.id} clicked`, abc.value)
            })
            classSection.appendChild(newClass)
        })
    })
}
getClasses()

backgrounds.addEventListener('click', () => {
    backgroundChoice.value = backgrounds.value
})

const getAttributes = (req, res) => {
    axios.get('http://www.dnd5eapi.co/api/ability-scores')
    .then((res) => {
        const {results} = res.data
        console.log(results)
        results.forEach((attribute, index) => {
            let abilityScore = document.createElement('div')
            abilityScore.classList.add('ability-block')
            abilityScore.innerHTML = 
            `<h5>${results[index].name}</h5>
             <p id='${results[index].index}'class='att-score'></p>
             <h4></h4>`
            abilityScore.addEventListener('click', () => {
                console.log(`${abilityScore.id} clicked`)
            })
            attributeSection.appendChild(abilityScore)
        })
    })
    .catch((err) => console.log(err))
}
getAttributes()



const getSkills = (req, res) => {
    axios.get('http://www.dnd5eapi.co/api/skills')
    .then((res) => {
        const {results} = res.data
        console.log(results)
        results.forEach((element, index) => {
            let skillBlock = document.createElement('div')
            skillBlock.classList.add('skill-block')
            skillBlock.innerHTML = 
            `<input type='checkbox' id='${results[index].index}' value='${results[index].name}'
             <label for='${results[index].index}'>${results[index].name}</label><br>
            `
            skillBlock.addEventListener('click', () => {
                console.log(`${results[index].name}`)
            })
            skillsSection.appendChild(skillBlock)
        })

    })
}
getSkills()

// diceRollScores()
diceRoll.addEventListener('click', () => {
    axios.get('http://localhost:4004/attribute_scores')
    .then((res) => {
        console.log(res.data)
        let charisma = document.getElementById('cha')
        let constitution= document.getElementById('con')
        let dexterity = document.getElementById('dex')
        let intelligence = document.getElementById('int')
        let strength = document.getElementById('str')
        let wisdom = document.getElementById('wis')
        charisma.textContent = res.data[0]
        constitution.textContent = res.data[1]
        dexterity.textContent = res.data[2]
        intelligence.textContent = res.data[3]
        strength.textContent = res.data[4]
        wisdom.textContent = res.data[5]
        chaScore.value = res.data[0]
        conScore.value = res.data[1]
        dexScore.value = res.data[2]
        intScore.value = res.data[3]
        strScore.value = res.data[4]
        wisScore.value = res.data[5]
    }).catch((err) => console.log(err))
})