const HomeController = (req, res) => {
    console.log('Nouvelle requette');
    res.status = 200
    res.send ('Bienvenue')
}
 module.exports = {
    HomeController
 }