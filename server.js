// Appel du module express
let express = require('express');
let isAlphanumeric = require('is-alphanumeric');

let fs = require('fs');
const { readOtherFolder, ROOT } = require('./drive');

const drive = require('./drive');


// La variable app prend pour valeur la fonction express du module express
const app = express();

let port = 3000;

function start() {
    console.log('serveur lancé');
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    });
}
// Utilise la fonction use de la fonction express (variable app) et la fonction static du module express
app.use(express.static('frontend'));

// Debugger
app.get('/', (req, res) => {
    console.log(res);
})



// Etape 7

// Retourne une liste contenant les dossiers et fichiers à la racine du “drive”
app.get('/api/drive', function (req, res) {
    const readFolderPromise = drive.readFolder();
    readFolderPromise.then((filesAndFolders) => {
        res.send(filesAndFolders);
    })

});



// Retourne le contenu de {name} / (req.params.name récupère ce qu'il y a dans {name})
app.get('/api/drive/:name', function (req, res) {
    let name = req.params.name;
    const readOtherFolderPromise = drive.readOtherFolder(name);
    readOtherFolderPromise.then((filesAndFolders) => {
        res.send(filesAndFolders);
    }).catch((error) => {
        res.status(404).send(error.message);
    });
});



// Créer un dossier avec le nom {name} / req.query.name récupère le nom du dossier saisi dans le front
app.post('/api/drive', function (req, res) {
    if (isAlphanumeric(req.query.name) == false) {
        res.status(400).send("Veuillez saisir un nom de dossier valide");
    } else {
        const createFolderPromise = drive.createFolder(ROOT, req.query.name);
        createFolderPromise.then((result) => {
            res.status(201).send(result);

        });
    }
});



// Créer un dossier avec le nom {name} dans {folder}
app.post('/api/drive/:name', function (req, res) {
    if (isAlphanumeric(req.query.name) == false) {
        res.status(400).send("Veuillez saisir un nom de dossier valide");
    } else {
        let nameCreateFolder = req.params.name;
        const createFolderInFolderPromise = drive.createFolderInFolder(ROOT, nameCreateFolder, req.query.name);
        createFolderInFolderPromise.then((result) => {
            res.status(201).send(result);
        })
    }
});



// Exports

module.exports = {
    start: start,
}
