const {data} = require ('../data')
const GetAllDataController = (req, res) => {
    res.status (200).json (data)
}

module.exports = {
    GetAllDataController
}