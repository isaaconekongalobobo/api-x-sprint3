const express  = require ('express')
const cors = require ('cors')
const { HomeController } = require('./controllers/homeController')
const { ImageUploadController } = require('./controllers/imageUploadController')
const multer = require ('multer')
const path = require ('path')

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

const app = express ()
app.use (cors ())
require ('dotenv').config ()
const port = process.env.PORT || 5000

app.get ('/', (req, res) => HomeController(req, res))
app.post ('/uploads/image', upload.single ('image'), (req, res) => {
    console.log("Requette pour l'upload");
    console.log(req.body.image);
    
})

app.listen (port, () => {
    console.log(`Le serveur tourne sur port ${port} `);
    console.log(`http://localhost:${port}`);
})