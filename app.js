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


var getCount = 0;
var postCount = 0;


//sendGet  *** shows all the notes
server.get('/sendGet', function (req, res, next) {
    getCount++;
    console.log("> sendGet: request received");
    notesSaved.find({}, function (error, notes) {
        console.log("< sendGet: sending response");
        res.send(notes);
    })
    console.log("Processed Request Counters ---> GET: %s | POST: %s", getCount, postCount);
});

//sendPost *** add a note: {id, name, text}
server.post('/sendPost', function (req, res, next) {
    postCount++;
    console.log("> sendPost: request received");
    //creating a note
    var newNote = {
        name: req.params.name,
        text: req.params.text
    };
    notesSaved.create(newNote, function (error, note) {
        if (req.params.name === undefined ) {
            console.log("sendPost: Error Note name must be entered!");
            console.log("Processed Request Counters ---> GET: %s | POST: %s", getCount, postCount);
            return next(new restify.InvalidArgumentError('Note name must be entered!'));
        }
        if (error) {
            console.log("sendPost: Error creating a Note");
            console.log("Processed Request Counters ---> GET: %s | POST: %s", getCount, postCount);
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        }
        else {
            res.send(201,note);
            console.log("sendPost: Successfully Added Note");
        }
    }); 
    console.log("Processed Request Counters ---> GET: %s | POST: %s", getCount, postCount);
});

//sendDelete *** Delete all notes
server.del('/sendDelete', function (req, res, next) {
    console.log("> sendDelete: request received");
    notesSaved.deleteMany({}, function (error, notes) {
        if (error) {
            console.log("sendDelete: Error");
            return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)));
        }
        else {
            res.send(200);
            console.log("sendDelete: Successfully Deleted all Notes");
        }
    });
});