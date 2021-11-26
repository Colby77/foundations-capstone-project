

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
const alignments = document.getElementById('alignment')
const alignmentChoice = document.getElementById('alignment-choice')
const proficienciesList = document.getElementById('proficiencies')
const languagesList = document.getElementById('languages')
const charBonuses = document.getElementById('char-bonuses')
const raceDescr = document.querySelector('.race-desc')
const raceTitle = document.getElementById('race-title')
const classTitle = document.getElementById('class-title')
const classDescr = document.querySelector('.class-desc')
const spellsBtn = document.getElementById('get-spells')
const spellsSection = document.getElementById('spells-section')
const spellsList = document.getElementById('spells-choice')

const chaScore = document.getElementById('cha-score')
const conScore = document.getElementById('con-score')
const dexScore = document.getElementById('dex-score')
const intScore = document.getElementById('int-score')
const strScore = document.getElementById('str-score')
const wisScore = document.getElementById('wis-score')

let proficiencies = []
proficienciesList.value = 'N/A';
let languages = []
languagesList.value = 'N/A';
let spells = []
spellsList.value = 'N/A';
let race = '';
let playerClass = '';

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
                // console.log(`${newRace.id} clicked`)
                raceChoice.value = `${results[i].name}`
                race = `${results[i].name}`.toLowerCase()
                getRaceInfo()
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
                playerClass = `${results[index].name}`.toLowerCase()
                getClassInfo()
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
            <h3 id='${results[index].index}'class='att-score'></h3>`
            abilityScore.addEventListener('click', () => {
                console.log(`${abilityScore.id} clicked`)
                
            })
            attributeSection.appendChild(abilityScore)
        })
    })
    .catch((err) => console.log(err))
}
getAttributes()

function addSkill(skill){
    proficienciesList.value = ''
    if(proficiencies.includes(skill) === false){
        proficiencies.push(skill)
    }
    proficienciesList.value = proficiencies
}

const getSkills = (req, res) => {
    axios.get('http://www.dnd5eapi.co/api/skills')
    .then((res) => {
        const {results} = res.data
        console.log(results)
        results.forEach((element, index) => {
            let skillBlock = document.createElement('div')
            skillBlock.classList.add('skill-block')
            skillBlock.innerHTML = 
            `<input type='checkbox' id='${results[index].index}' onclick="addSkill('${results[index].name}')">
            
            <label for='${results[index].index}'>${results[index].name}</label><br>
            `
            skillsSection.appendChild(skillBlock)
        })
    })
    .catch((err) => console.log(err))
}
getSkills()


const addLang = (language) => {
    languagesList.value = ''
    if(languages.includes(language) === false){
        languages.push(language)
    }
    languagesList.value = languages
}

const getLangs = (req, res) => {
    axios.get('http://www.dnd5eapi.co/api/languages')
    .then((res) => {
        const {results} = res.data
        console.log(results)
        let langTitle = document.createElement('h3')
        langTitle.textContent = 'Languages'
        skillsSection.appendChild(langTitle)
        results.forEach((element, index) => {
            let lang = document.createElement('div')
            lang.classList.add('skill-block')
            lang.innerHTML = `
            <input type='checkbox' id='${results[index].index}' onclick="addLang('${results[index].name}')">
            <label for='${results[index].index}'>${results[index].name}</label><br>`
            skillsSection.append(lang)
        })
    })
}
getLangs()

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

// charBonuses.addEventListener('click', () => {
    const getRaceInfo = () => {
        // console.log(race, playerClass)
        raceDescr.innerHTML = ""
        axios.get(`http://www.dnd5eapi.co/api/races/${race}`)
        .then((res) => {
            // console.log(res.data)
            const {age, alignment, language_desc, starting_proficiencies, traits} = res.data
            let title = document.createElement('h2')
            title.textContent = race.toUpperCase()
            let charAge = document.createElement('p')
            charAge.textContent = `Age: ${age}`
            let charAlignment = document.createElement('p')
            charAlignment.textContent = `Alignment: ${alignment}`
            let language = document.createElement('p')
            language.textContent = `Language(s): ${language_desc}`
            let skillList = document.createElement('ul')
            skillList.textContent = 'Proficient:'
            // console.log(res.data.starting_proficiencies[0].name)
            for(let i = 0; i < starting_proficiencies.length; i++){
                console.log(starting_proficiencies[i].name)
                let skillItem = document.createElement('li')
                skillItem.textContent = starting_proficiencies[i].name
                skillList.appendChild(skillItem)
            }
            let traitList = document.createElement('ul')
            traitList.textContent = 'Traits:'
            for(let i = 0; i < traits.length; i++){
                console.log(traits[i].name)
                let trait = document.createElement('li')
                trait.textContent = traits[i].name
                traitList.appendChild(trait)
            }
            raceDescr.appendChild(title)
            raceDescr.appendChild(charAge)
            raceDescr.appendChild(charAlignment)
            raceDescr.appendChild(language)
            raceDescr.appendChild(skillList)
            raceDescr.appendChild(traitList)
        })
        .catch((err) => console.log(err))
    }
    
    const getClassInfo = () => {
        classDescr.innerHTML = ""
        axios.get(`http://www.dnd5eapi.co/api/classes/${playerClass}`)
        .then((res) => {
            const {proficiency_choices, hit_die, subclasses, proficiencies, saving_throws, starting_equipment} = res.data
            // console.log(proficiency_choices[1])
            
            console.log(proficiency_choices[0].type)
            let title = document.createElement('h2')
            title.textContent = playerClass.toUpperCase()
            let hitDie = document.createElement('h3')
            hitDie.textContent = `Hit die: 1d${hit_die}`
            let profChoices = document.createElement('ul')
            profChoices.textContent = `Starting Proficiencies, Choose ${proficiency_choices[0].choose} from:`
            let otherChoices = document.createElement('ul')
            for(let i = 0; i < proficiency_choices[0].from.length; i++){
                let profChoice = document.createElement('li')
                profChoice.textContent =  proficiency_choices[0].from[i].name
                profChoices.appendChild(profChoice)
            }
            if(proficiency_choices.length > 1){
                otherChoices.textContent = `Other Proficiencies, Choose ${proficiency_choices[1].choose} from:`
                for(let i = 0; i < 5; i++){
                    let profChoice = document.createElement('li')
                    profChoice.textContent =  proficiency_choices[1].from[i].name
                    otherChoices.appendChild(profChoice)
                }
            }
            let otherSkills = document.createElement('p')
            otherSkills.textContent = 'Other Skills: '
            for(let i = 0; i < proficiencies.length; i++){
                otherSkills.textContent += `${proficiencies[i].name}, `
            }
            let savingThrows = document.createElement('ul')
            savingThrows.textContent = 'Saving Throws:'
            for(let i = 0; i < saving_throws.length; i++){
                
                let savethrow = document.createElement('li')
                savethrow.textContent = saving_throws[i].name
                savingThrows.appendChild(savethrow)
            }
            let startEquip = document.createElement('p')
            startEquip.textContent = 'Starting Equipment: '
            for(let i = 0; i < starting_equipment.length; i++){
                startEquip.textContent += `${starting_equipment[i].equipment.name}, `
            }
            classDescr.appendChild(title)
            classDescr.appendChild(hitDie)
            classDescr.appendChild(profChoices)
            classDescr.appendChild(otherChoices)
            classDescr.appendChild(otherSkills)
            classDescr.appendChild(savingThrows)
            classDescr.appendChild(startEquip)
        })
        .catch((err) => console.log(err))
    }
    
    const addSpell = (spell) => {
        spellsList.value = ''
        if(spells.includes(spell) === false){
            spells.push(spell)
        }
        spellsList.value = spells
    }
    spellsBtn.addEventListener('click', () => {
        axios.get('http://www.dnd5eapi.co/api/spells?level=0')
        .then((res) => {
            const {results} = res.data
            console.log(res.data)
            results.forEach((ele, ind) => {
                let spell = document.createElement('div')
                // spell.classList.add('spells')
                spell.innerHTML = `
                <input type='checkbox' id='${results[ind].index}' onclick="addSpell('${results[ind].name}')">
                <label for='${results[ind].index}'>${results[ind].name}</label><br>`
                spellsSection.appendChild(spell)
            })
        })
        .catch((err) => console.log(err))
    })

backgrounds.addEventListener('click', () => {
    backgroundChoice.value = backgrounds.value
})
alignments.addEventListener('click', () => {
    alignmentChoice.value = alignments.value
})