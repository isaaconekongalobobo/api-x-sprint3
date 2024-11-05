const { data } = require("../data")
const GetUserProfileController = (req, res) => {
    const userFound = data.find (user => user.name === req.params.userName)
    if (userFound) {
        res.status (200).json (userFound)
    } else {
        res.status (404).json ([])
    }
}

module.exports = {GetUserProfileController}