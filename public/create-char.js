

let diceRoll = document.querySelector('#dice-roll')


// diceRollScores()
diceRoll.addEventListener('click', () => {
    axios.get('http://localhost:4004/attribute_scores')
    .then((res) => {
        console.log(res.data)
    }).catch((err) => console.log(err))
})