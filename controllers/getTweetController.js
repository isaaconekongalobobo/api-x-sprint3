const { data } = require("../data")

const GetTweetController = (req, res) => {
    res.status (200).json (data)
}

module.exports = { GetTweetController }