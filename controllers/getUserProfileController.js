const { data } = require("../data")
const GetUserProfileController = (req, res) => {
    const userFound = data.find (user => user.name === req.body.username)
    if (userFound) {
        res.status (200).json ({userFound, data})
    }
}

module.exports = {GetUserProfileController}