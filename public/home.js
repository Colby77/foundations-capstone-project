


const racesPic = document.getElementById('races-pic')
const infoSearch = document.getElementById('info-search')
const infoResult = document.getElementById('info-result')
const spellsPic = document.getElementById('spells-pic')
const spellSelect = document.getElementById('spell-select')


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
    axios.get(`http://www.dnd5eapi.co/api/${group}/${thing}`)
    .then((res) => {
        infoResult.innerHTML = `
        <h3>${res.data.name}</h3>
        <h4>Speed: ${res.data.speed}</h4>
        <p>Alignment: ${res.data.alignment}</p>
        <p>Age: ${res.data.age}</p>
        <p>Size: ${res.data.size_description}</p>
        <div id='trait-desc'></div>`
        let traits = document.createElement('ul')
        traits.textContent = 'Traits:'
        for(let i = 0; i < res.data.traits.length; i++){
            let trait = document.createElement('li')
            trait.innerHTML = `<p onclick="traitSearch('${res.data.traits[i].index}')">${res.data.traits[i].name}</p>`
            traits.appendChild(trait)
        }
        infoResult.appendChild(traits)
        console.log(res.data)
    })
}

racesPic.addEventListener('click', () => {
    infoSearch.innerHTML = ``
    infoResult.innerHTML=``
    group = 'races'
    axios.get(`http://www.dnd5eapi.co/api/${group}`)
    .then((res) => {
        const {results} = res.data
        results.forEach((ele, i) => {
            let info = document.createElement('div')
            info.innerHTML = `
            <h4 class='search-res' onclick="specSearch('${results[i].index}')">${results[i].name}</h4>
            `
            infoSearch.appendChild(info)
        })
    })
})

const spellSearch = (spell) => {
    // console.log(level)
    infoResult.innerHTML = ``
    axios.get(`http://www.dnd5eapi.co/api/spells/${spell}`)
    .then((res) => {
        // console.log(res.data)
        const {name, desc} = res.data
        console.log(name)
        let newSpell = document.createElement('div')
        newSpell.innerHTML = `
        <h3>${name}</h3>
        <p>Description: ${desc}</p>
        `
        infoResult.appendChild(newSpell)
    })
}

spellsPic.addEventListener('click', () => {
    group = 'spells'
    infoSearch.innerHTML = ``
    infoResult.innerHTML=``
    let spellLevel = document.getElementById('spell-level').value
    axios.get(`http://www.dnd5eapi.co/api/spells/?level=${spellLevel}`)
    .then((res) => {
        // console.log(res.data)
        const {results} = res.data
        results.forEach((ele, i) => {
            let info = document.createElement('div')
            info.innerHTML = `
            <li class='search-res' onclick="spellSearch('${results[i].index}')">${results[i].name}</li>`
            infoSearch.appendChild(info)
        })
        let spellDesc = document.createElement('div')
        infoSearch.appendChild(spellDesc)
    })
    
    // <label for='spell-level'>Enter a spell level</label>
    // <input id='spell-level' type='number' max=9 min=0>
    // <button 'type='submit' onclick="spellSearch(${spellNum})">Submit</button>
    // `
    // var spellNum = document.getElementById('spell-level')
    // var spellNum = document.getElementsByName('spell-level')
    // infoSearch.appendChild(spellQuestion)
    // let spellLevel = document.getElementById('spell-level')
    // infoSearch.appendChild(spellLevel)
    // axios.get(`http://www.dnd5eapi.co/api/${group}?level=${spellLevel.value}`)
    // .then((res) => {
        //     console.log(res.data)
        //     const {results} = res.data
    //     results.forEach((ele, i) => {
    //         let info = document.createElement('div')
    //         info.innerHTML = `
    //         <h5>${results[i].name}</h5>`
    //         infoSearch.appendChild(info)
    //     })
    // })
})