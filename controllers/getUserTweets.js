const {data} = require ('../data')
const GetUserTweetsController = (req, res) => {
    const userFound = data.find (user => user.name === req.params.userName)
    const data = new FormData ()
    data.append (
        {
            tweets: userFound.tweets, 
            autor: {
                name:userFound.name,
                profilePicture: userFound.profilePicture,
                username: userFound.username
            }
        }
    )
    if (userFound) {
        res.status (200).json (data)
    }
}

module.exports = {GetUserTweetsController}