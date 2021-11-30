const racesPic = document.getElementById('races-pic')
const infoSearch = document.getElementById('info-search')
const infoResult = document.getElementById('info-result')
const spellsPic = document.getElementById('spells-pic')
const spellSelect = document.getElementById('spell-select')
const monsterPic = document.getElementById('monsters-pic')
const equipPic = document.getElementById('equip-pic')

let group=""

const traitSearch = (thing) => {
    let traitDesc = document.getElementById('trait-desc')
    console.log(thing)
    axios.get(`http://www.dnd5eapi.co/api/traits/${thing}`)
    .then((res) => {
        console.log(res.data.name)
        traitDesc.innerHTML = ``
        traitDesc.innerHTML = `<h5>${res.data.name}</h5>
        <p>${res.data.desc}</p>`
    })
}

const specSearch = (thing) => {
    infoResult.innerHTML = ``
    axios.get(`http://www.dnd5eapi.co/api/races/${thing}`)
    .then((res) => {
        const {name, speed, alignment, age, size_description, traits} = res.data
        infoResult.innerHTML = `
        <h3>${name}</h3>
        <h4>Speed: ${speed}</h4>
        <p>Alignment: ${alignment}</p>
        <p>Age: ${age}</p>
        <p>Size: ${size_description}</p>
        <div id='trait-desc'></div>`
        let raceTraits = document.createElement('ul')
        raceTraits.textContent = 'Traits:'
        for(let i = 0; i < res.data.traits.length; i++){
            let trait = document.createElement('li')
            trait.innerHTML = `<p onclick="traitSearch('${traits[i].index}')">${traits[i].name}</p>`
            raceTraits.appendChild(trait)
        }
        infoResult.appendChild(raceTraits)
    })
}

racesPic.addEventListener('click', () => {
    infoSearch.innerHTML = ``
    infoResult.innerHTML=``
    axios.get(`http://www.dnd5eapi.co/api/races`)
    .then((res) => {
        const {results} = res.data
        results.forEach((ele, i) => {
            let info = document.createElement('div')
            info.innerHTML = `
            <h4 class='search-res' onclick="specSearch('${results[i].index}')">${results[i].name}</h4>`
            infoSearch.appendChild(info)
        })
    })
})

const spellSearch = (spell) => {
    infoResult.innerHTML = ``
    axios.get(`http://www.dnd5eapi.co/api/spells/${spell}`)
    .then((res) => {
        const {name, desc} = res.data
        console.log(name)
        let newSpell = document.createElement('div')
        newSpell.innerHTML = `
        <h3>${name}</h3>
        <p>Description: ${desc}</p>`
        infoResult.appendChild(newSpell)
    })
}

spellsPic.addEventListener('click', () => {
    infoSearch.innerHTML = ``
    infoResult.innerHTML=``
    let spellLevel = document.getElementById('spell-level').value
    axios.get(`http://www.dnd5eapi.co/api/spells/?level=${spellLevel}`)
    .then((res) => {
        const {results} = res.data
        results.forEach((ele, i) => {
            let info = document.createElement('div')
            info.innerHTML = `
            <p class='search-res' onclick="spellSearch('${results[i].index}')">${results[i].name}</p>`
            infoSearch.appendChild(info)
        })
        let spellDesc = document.createElement('div')
        infoSearch.appendChild(spellDesc)
    })
})

const monstSearch = (monster) => {
    axios.get(`http://www.dnd5eapi.co/api/monsters/${monster}`)
    .then((res) => {
        const {name, size, type, alignment, languages, armor_class, challenge_rating, xp} = res.data
        infoResult.innerHTML = `
        <h3>${name}</h3>
        <h4>Size: ${size}</h4>
        <p>Type: ${type}</p>
        <p>Alignment: ${alignment}</p>
        <p>Languages: ${languages}</p>
        <p>Armor Class: ${armor_class}</p>
        <p>Challenge Rating: ${challenge_rating}</p>
        <p>XP: ${xp}</p>`
        let actions = document.createElement('ul')
        actions.textContent = 'Actions:'
        for(let i = 0; i < res.data.actions.length; i++){
            let action = document.createElement('li')
            action.innerHTML = `<p>${res.data.actions[i].name}: ${res.data.actions[i].desc}</p>`
            actions.appendChild(action)
        }
        infoResult.appendChild(actions)
        console.log(res.data)
    })
}

monsterPic.addEventListener('click', () => {
    infoSearch.innerHTML = ``
    infoResult.innerHTML=``
    axios.get(`http://www.dnd5eapi.co/api/monsters`)
    .then((res) => {
        const {results} = res.data
        results.forEach((ele, i) => {
            let info = document.createElement('div')
            info.innerHTML = `
            <h5 class='search-res' onclick="monstSearch('${results[i].index}')">${results[i].name}</h5>`
            infoSearch.appendChild(info)
        })
    })
})

const equipSearch = (equipment) => {
    infoResult.innerHTML = ``
    axios.get(`http://www.dnd5eapi.co/api/equipment/${equipment}`)
    .then((res) => {
        const {name, equipment_category} = res.data
        console.log(name)
        let newItem = document.createElement('div')
        if(equipment_category.index === 'weapon'){
            newItem.innerHTML = `
            <h3>${name}</h3>
            <p>Category: ${res.data.equipment_category.name}</p>
            <p>Damage: ${res.data.damage.damage_dice}, ${res.data.damage.damage_type.name}</p>
            <p>Cost: ${res.data.cost.quantity} ${res.data.cost.unit}</p>`
        }else if(equipment_category.index === 'armor'){
            newItem.innerHTML = `
            <h3>${name}</h3>
            <p>Category: ${equipment_category.name}</p>
            <p>AC: ${res.data.armor_category}, ${res.data.armor_class.base}</p>
            <p>Cost: ${res.data.cost.quantity} ${res.data.cost.unit}</p>`
        }else if(equipment_category.index === 'adventuring-gear'){
            newItem.innerHTML = `
            <h3>${name}</h3>
            <p>Category: ${equipment_category.name}</p>
            <p>Description: ${res.data.desc}</p>
            <p>Cost: ${res.data.cost.quantity} ${res.data.cost.unit}</p>`
        }
        infoResult.appendChild(newItem)
    })
}

equipPic.addEventListener('click', () => {
    infoSearch.innerHTML = ``
    infoResult.innerHTML=``
    let equipSelect = document.getElementById('equip-select').value
    axios.get(`http://www.dnd5eapi.co/api/equipment-categories/${equipSelect}`)
    .then((res) => {
        console.log(res.data)
        const {equipment} = res.data
        equipment.forEach((ele, i) => {
            let info = document.createElement('div')
            info.innerHTML = `
            <p class='search-res' onclick="equipSearch('${equipment[i].index}')">${equipment[i].name}</p>`
            infoSearch.appendChild(info)
        })
        let spellDesc = document.createElement('div')
        infoSearch.appendChild(spellDesc)
    })
})