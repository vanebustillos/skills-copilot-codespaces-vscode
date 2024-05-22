//Create web server
var express = require('express');
var app = express();
var fs = require('fs');

//Set up server
var server = app.listen(3000, listening);

function listening() {
    console.log("listening...");
}

//Set up route
app.use(express.static('public'));

//Set up socket.io
var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }
}

//Set up database
var Datastore = require('nedb');
var db = new Datastore({filename: 'comments.db', autoload: true});

//Set up POST request
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/comment', function(request, response) {
    var data = request.body;
    console.log(data);
    db.insert(data, function(err, newDocs) {
        db.find({}, function(err, docs) {
            response.json(docs);
        });
    });
});

app.get('/comment', function(request, response) {
    db.find({}, function(err, docs) {
        response.json(docs);
    });
});

//Set up GET request
app.get('/comment', function(request, response) {
    db.find({}, function(err, docs) {
        response.json(docs);
    });
});