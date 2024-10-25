const express  = require ('express')
const app = express ()

const cors = require ('cors')
const { HomeController } = require('./controllers/homeController')
const multer = require ('multer')
const path = require ('path')
const { GetTweetController } = require('./controllers/getTweetController')
const { GetUserProfileController } = require('./controllers/getUserProfileController')
// Importation du tableau des donnees
const { data, pushTweet } = require('./data')

// Middleware pour parser les données du formulaire
app.use(express.urlencoded({ extended: true }));
// Pour le Json
app.use(express.json());
// Pour autoriser les requettes de tout les autres domaines
app.use (cors())
// Pour rendre accessible les fichiers statiques de mon projet
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuration de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer ({storage})


app.use (cors ())
require ('dotenv').config ()
const port = process.env.PORT || 5000

app.get ('/', (req, res) => HomeController(req, res))
app.post ('/create/tweet', upload.single ('image'), (req, res) => {
    // Recuperation des donnees dans le corps de la requette
    const {content, userId} = req.body
    let imageUrl = ''
    if (content !== '' && userId !== '') {
        if (req.file) {
            // Je construit l'url de l'image, qui la rendra accessible de partout
            imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        } else {
            res.status (400).send ('Aucune image recus')
        }   
        const userFound = data.find (user => user.userId === 1)
        if (userFound) {
            const newTweet = {
                tweetId: userFound.tweets.length + 1,
                content,
                createdAt: Date.now (),
                likes: 0,
                imageUrl,
                retweets: 0,
                comments: 0,
                numberShare: 0,
            }  
            pushTweet (newTweet)
            res.status(200).send ()
        }
    }

})
app.get ('/getTweets', (req, res) => GetTweetController (req, res))

app.post ('/getUser', (req, res) => {
    GetUserProfileController(req,res)
})

app.listen (port, () => {
    console.log(`Le serveur tourne sur port ${port} `);
    console.log(`http://localhost:${port}`);
})