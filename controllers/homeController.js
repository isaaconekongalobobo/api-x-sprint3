const HomeController = (req, res) => {
    console.log('Nouvelle requette');
    res.status = 200
    // Je recupere le end point de mon api
    const endPoint1 = `${req.protocol}://${req.get('host')}`
    res.send (`<h1>Bienvenu dans mon api: <a href='${endPoint1}' >${endPoint1}<a/> </h1>`)
}
 module.exports = {
    HomeController
 }