
/**** CHARGEMENT DES MODULES */
const fs = require('fs');
const http = require('http');

const express = require('express');
const app = express();

const path = require('path')

app.use("/css", express.static(__dirname + '/public/css'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/images", express.static(__dirname + '/public/Assets/images'));
app.use("/cv", express.static(__dirname + '/public/Assets/CV'));
app.use("/musique", express.static(__dirname + '/public/Assets/musique'));

app.get('/', function (req, res) {
    res.sendFile('./indexABEv2.html', { root: './html' });
});


const server = http.createServer();


/********************************************/

// HTTP serveur

/********************************************/


server.on('request', function (request, response) {
    fs.readFile('./indexABEv2.html', function (error, data) {
        let statusCode;
        let responseBody;
        if (error) {
            statusCode = 404;
            responseBody = new Buffer('<h1>Erreur 404</h1>');
        } else {
            statusCode = 200;
            responseBody = data;
        }
        response.writeHead(statusCode, {
            'Content-Length': responseBody.length,
            'Content-Type': 'text/html;charset=utf-8'
        });
        response.write(responseBody, function () {
            response.end();
        });


        // /********************************************/

        // // MONGODB

        // /********************************************/

        // const mongodb = require('mongodb');

        // mongodb.MongoClient.connect('mongodb://localhost:27017/sharkooBackEnd', function (error, client) {
        //     if (!error) {
        //         let players = client.db('sharkooBackEnd').collection('players');
        //         players.find({}).toArray(function (error, documents) {
        //            res.render('nomdelaDiv', {liste: data, title: 'nomdelaDiv'});

        //             });


        //             response.writeHead(statusCode, {
        //                 'Content-Length': responseBody.length,
        //                 'Content-Type': 'text/html;charset=utf-8'
        //             });
        //             response.write(responseBody, function () {
        //                 response.end();
        //             });
        //         })
        //     }
        // }); // fin mongodb.MongoClient.connect






    });
}); // fin server.on


/********************************************/

// socket.IO

/********************************************/


// const SocketIo = require('socket.io');

// let socketIo = new SocketIo(server);



// socketIo.on('connection', function (websocketConnection) { // reponse et validation du handshake

//     websocketConnection;

//     // Que faire en cas de réception de l'action InitJeuDom.
//     websocketConnection.on('InitJeuDom', function (dataInitJeuDom) { // .on InitJeuDom
//     });

//     websocketConnection.broadcast.emit('InitJeuDom'); // broadcast = diffuse a tous les joueurs sauf moi

//     // Que faire en cas de réception de l'action mouseClickRegleJeu.
//     websocketConnection.on('mouseClickRegleJeu', function (dataRegleJeu) { // .on regleJeu

//     });
//     websocketConnection.broadcast.emit('mouseClickRegleJeu', dataRegleJeu);


//     // Que faire en cas de réception de l'action boutonRejouer.
//     websocketConnection.on('boutonRejouer', function (dataReload) { // .on boutonRejouer

//     });
//      websocketConnection.broadcast.emit('boutonRejouer', dataReload);

//     // Que faire en cas de réception de l'action boutonInterrogation.
//     websocketConnection.on('boutonInterrogation', function (dataBoutonInterrogation) { // .on boutonInterrogation

//     });
//     websocketConnection.broadcast.emit('boutonInterrogation', dataBoutonInterrogation);


//     // Que faire en cas de réception de l'action keyDown.
//     websocketConnection.on('keyDown', function (dataKeydown) { // .on keyDown

//     });
//     websocketConnection.broadcast.emit('keyDown', dataKeydown);






//     // La déconnexion on envoie l'objet contenant les méta données du carré au front-end pour qu'il soit supprimé.
//     websocketConnection.on('disconnect', function () {

//         socketIo.emit('removeSquare', square);
//     });
// }); // fin socketIo.on










/********************************************/

// Ecoute serveur

/********************************************/

server.listen(8888, function () {
    console.log('CONNECTED TO serverSocketIoV2.js !');
});