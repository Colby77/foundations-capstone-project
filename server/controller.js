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
            scores.push(score)
        }
        res.status(200).send(scores)
    }
}