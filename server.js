// Appel du module express
let express = require('express');

let fs = require('fs');
const { readFolder } = require('./drive');
const drive = require('./drive');


// La variable app prend pour valeur la fonction express du module express
const app = express();

let port = 3000;

function start(){
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
    readFolderPromise.then((filesAndFolders) =>{
        res.send(filesAndFolders);
    })

})



// Retourne le contenu de {name} / (req.params.name) récupère ce qu'il y a dans {name}
app.get('/api/drive/:name', function (req, res){
    res.status(200).json(

        fs.stat('/api/drive/:name', (err, stats) => {
            console.log(stats.isFile());
        })

        [
            {
              name: "Autre dossier",
              isFolder: true
            }, {
              name: "passeport",
              size: 1003,
              isFolder: false
            }
          ]
    )
})


// Exports

module.exports = {
    start : start,
}
