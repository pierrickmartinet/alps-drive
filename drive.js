// Récupère le module os de node
const os = require('os');

// Récupère le module fs de node en version promise
const fs = require('fs/promises');

// Récupère le module pth de node
const path = require('path');
const { readFile } = require('fs');

// La varible ROOT prend pour valeur le chemin dans lequel les fichiers du drive sont reliés
const ROOT = path.join(os.tmpdir(), 'AlpsDrive/');
console.log(ROOT);

// Création d'un dossier 
function createRootFolder() {
    const promise = fs.access(ROOT)
        .then(() => {
            console.log('OK le dossier est bien créé');
        }).catch(() => {
            console.log('Je créé le dossier');
            return fs.mkdir(ROOT);
        });

    return promise;
}



// Affichage dossiers et fichiers du chemin ROOT
function readFolder() {
    let index = 0;
    let filesAndFolders = [];
    const promise = fs.readdir(ROOT, { withFileTypes: true })
        .then((result) => {
            while (result.length > index) {
                filesAndFolders.push({
                    name: result[index].name,
                    isFolder: result[index].isDirectory(),
                });
                index = index + 1;
            }
            return filesAndFolders;
        }).catch((error) => {
            console.log(error);
        })

    return promise;
};



// Affichage dossiers et fichiers d'un autre repertoire
function readOtherFolder(name) {
    let index = 0;
    let filesAndFolders = [];
    const promise = fs.readdir(path.join(ROOT, name), { withFileTypes: true })
        .then((result) => {
            while (result.length > index) {
                filesAndFolders.push({
                    name: result[index].name,
                    isFolder: result[index].isDirectory(),
                });
                index = index + 1;
            }
            return filesAndFolders;
        }).catch((error) => {
            console.log(error);
            if (error.code == 'ENOTDIR') {
                return fs.readFile(path.join(ROOT, name));
            }
            if (error.code == 'ENOENT') {

                throw new Error("Le dossier n'éxiste pas");
            }
        })

    return promise;
};



// Créer un dossier dans le ROOT depuis le front
function createFolder(ROOT, nomDossier) {
    let promise = fs.mkdir(path.join(ROOT, nomDossier))
        .then(() => {
            console.log("dossier créé");
        }).catch(() => {
            console.log("Dossier pas créer");

        })
    return promise;
};



// Créer un dossier dans un dossier du ROOT depuis le front
function createFolderInFolder(ROOT, nameFolder, nameNewFolder) {
    let promise = fs.mkdir(path.join(ROOT, nameFolder, nameNewFolder))
        .then(() => {
            console.log("Dossier créé dans " + nameFolder);
        }).catch(() => {
            console.log("Dossier dans dossier non créé");
        });
    return promise;
};



// Supprime un dossier du ROOT depuis le front
function deleteFolder(ROOT, nameFolder) {
    let promise = fs.rmdir(path.join(ROOT, nameFolder))
        .then(() => {
            console.log("Dossier supprimé")
        }).catch((error) => {
            console.log(error);
        });
    return promise;
};



// Déplace un fichier temporaire stocké dans T (Dossier du ROOT avant Alps_drive) dans le ROOT et supprime le dossier temporaire
function moveFile(file, destination) {
    const promise = fs.copyFile(file, destination)
        .then((result) => {
            fs.unlink(file)
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
    return promise;
};


// Exports
module.exports = {
    ROOT: ROOT,
    createRootFolder: createRootFolder,
    readFolder: readFolder,
    readOtherFolder: readOtherFolder,
    createFolder: createFolder,
    createFolderInFolder: createFolderInFolder,
    deleteFolder: deleteFolder,
    moveFile: moveFile,
}