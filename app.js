var SERVER_NAME = 'notes-api';
var PORT = 8080;
var HOST = '127.0.0.1';

//dependencies
var restify = require('restify');
var notesSaved = require('save')('notes');

//creating server
server = restify.createServer({ name: SERVER_NAME});

//starting server
server.listen(PORT, HOST, function () {
    console.log("Server %s started listening at %s", server.name, server.url);
    console.log("endpoints:");
    console.log("%s/sendGet", server.url);
    console.log("%s/sendPost", server.url);
    console.log("%s/sendDelete", server.url);
});

//ability to use POST and mapping request parametrs
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());