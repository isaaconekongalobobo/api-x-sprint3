const express  = require ('express')
const app = express ()

const cors = require ('cors')
const { HomeController } = require('./controllers/homeController')
const multer = require ('multer')
const path = require ('path')

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
app.post ('/uploads/image', upload.single ('image'), (req, res) => {
    if (req.file) {
        // Je construit l'url de l'image, qui la rendra accessible de partout
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        // Je renvoie l'url genere a mon client react
        res.status (200).json ({imageUrl})
    } else {
        res.status (400).send ('Aucune image recus')
    }
})

app.listen (port, () => {
    console.log(`Le serveur tourne sur port ${port} `);
    console.log(`http://localhost:${port}`);
})