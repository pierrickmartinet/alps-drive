// Appel du module express
let express = require('express');
// La variable app prend pour valeur la fonction express du module express
const app = express();

let port = 3000;

// Utilise la fonction use de la fonction express (variable app) et la fonction static du module express
app.use(express.static('frontend'));


// La fonction express écoute le port 3000
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
