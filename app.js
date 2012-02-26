var child;
var util = require("util"),
    sys = require("sys"),
    url = require("url"),
    express = require("express"),
    exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    expose = require('express-expose'),
    querystring = require("querystring"),
    fs = require('fs');
var app = module.exports = express.createServer();

// Don't crash on errors.
process.on("uncaughtException", function(error) {
  util.log(error.stack);
});

app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(require('stylus').middleware({ src: __dirname + '/public' }));
        app.use(app.router);
        app.use(express.static(__dirname + '/public'));
        });

app.configure('development', function(){
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
        });

app.configure('production', function(){
        app.use(express.errorHandler()); 
        });

app.use(express.bodyParser());
app.use(app.router);

//Routes

function addHeaders(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
}

app.all('/*',function(req, res, next) {
    addHeaders(res);
    next(); 
});

app.get('/', function(req, res){
  res.render('index', { title: "Remote Run Test" } );
});


app.get('/about', function(req, res){
      res.render('about', { title: 'Help' });
});

app.post('/start/', function(req, res, next) {
  startCrawl(req.body.data, res);
});

app.post('/stop/', function(req, res, next) {
  stopCrawl(req.body.data, res);
});


app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
