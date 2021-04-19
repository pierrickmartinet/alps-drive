let server = require ('./server');

let drive = require ('./drive');


drive.createRootFolder().then(() => {
    server.start();
});