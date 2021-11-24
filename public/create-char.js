


let diceRoll = document.querySelector('#dice-roll');
let raceBlocks = document.querySelector('.race-section');
let testBtn = document.getElementById('test')
let classSection = document.getElementById('class-blocks')
let attributeSection = document.querySelector('.attributes-section')
let attributeSectionTest = document.querySelector('.attributes-section-test')
let skillsSection = document.querySelector('.skills-section')

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
            let skillSelect = document.getElementById(results[index].index)
            skillSelect.addEventListener('click', () => console.log('clkldsjf'))
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
    }).catch((err) => console.log(err))
})