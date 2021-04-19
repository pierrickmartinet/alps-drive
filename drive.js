// Récupère le module os de node
const os = require('os');

// Récupère le module fs de node en version promise
const fs = require('fs/promises');

// Récupère le module pth de node
const path = require('path');

// La varible ROOT prend pour valeur le chemin dans lequel les fichiers du drive sont reliés
const ROOT = path.join(os.tmpdir(),'dossierCréé');
console.log(ROOT);

// Création d'un dossier 
function createRootFolder(){
    const promise = fs.access(ROOT)
    .then(() => {
        console.log('OK le dossier est bien créé');
    }).catch(() => {
        console.log('Je créé le dossier');
        return fs.mkdir(ROOT);
    });

    return promise;
}

// Affichage dossier et fichier du chemin ROOT
function readFolder(){
    let index = 0;
    let filesAndFolders = [];
    const promise = fs.readdir(ROOT, {withFileTypes:true})
    .then((result) => {
        while (result.length > index) {
            filesAndFolders.push({
                name : result[index].name,
                isFolder : result[index].isDirectory(),
            });
            index = index +1;
        }
        return filesAndFolders;
    }).catch((error) => {
        console.log(error);
    })

    return promise;
}


// Exports
module.exports = {
    createRootFolder : createRootFolder,
    readFolder : readFolder,
}
