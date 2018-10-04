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

//sendGet  *** shows all the notes
server.get('/sendGet', function (req, res, next) {
    notesSaved.find({}, function (error, notes) {
        res.send(notes);
    })
});

//sendPost *** add a note: {id, name, text}
server.post('/sendPost', function (req, res, next) {
    //creating a note
    var newNote = {
        name: req.params.name,
        text: req.params.text
    };

    //saving Note in memory, if error, display error, otherwise send Note info in body response
    notesSaved.create(newNote, function (error, note) {
        if (error) {
            console.log("sendPost: Error creating a Note");
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        }
        else {
            res.send(201,note);
            console.log("sendPost: Successfully Added Note");
        }
    });
    });