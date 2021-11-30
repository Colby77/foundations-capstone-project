

const racesPic = document.getElementById('races-pic')
const infoSearch = document.getElementById('info-search')

let group=""

const specSearch = (thing) => {
    axios.get(`http://www.dnd5eapi.co/api/${group}/${thing}`)
    .then((res) => {
        console.log(res.data)
    })
}

racesPic.addEventListener('click', () => {
    group = 'races'
    axios.get(`http://www.dnd5eapi.co/api/${group}`)
    .then((res) => {
        const {results} = res.data
        infoSearch.innerHTML = ``
        results.forEach((ele, i) => {
            let info = document.createElement('div')
            info.innerHTML = `
            <h4 onclick="specSearch('${results[i].index}')">${results[i].name}</h4>
            `
            infoSearch.appendChild(info)
        })
    })
})