const {data} = require ('../data')
const GetUserTweetsController = (req, res) => {
    const userFound = data.find (user => user.name === req.params.userName)
    if (userFound) {
        res.status (200).json (userFound.tweets)
    }
}

module.exports = {GetUserTweetsController}