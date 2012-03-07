var child;
var format = require("util").format,
    util = require("util"),
    sys = require("sys"),
    http = require('http'),
    url = require("url"),
    express = require("express"),
    exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    expose = require('express-expose'),
    querystring = require("querystring"),
    fs = require('fs'),
    formidable = require('formidable');
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

app.post('/refresh', function(req, res, next) {
  refresh(req.body.data, res);
});

app.post('/start/', function(req, res, next) {
  startMath(req, res);
});

app.post('/stop/', function(req, res, next) {
  stopMath(req, res);
});

app.post('/upload', function(req, res, next){
  //fs.renameSync(req.files.upload.path, "data\\" + req.files.upload.name);
  fs.renameSync(req.files.upload.path, "data\\in.txt");
  console.log("Upload OK");
  res.redirect('back');
  /*res.send(format('\nuploaded %s (%d Kb) to %s as %s'
    , req.files.upload.name
    , req.files.upload.size / 1024 | 0 
    , req.files.upload.path
    , req.body.title));*/
});

function startMath(req, res){
	if(child != undefined){
      child.kill();
	  }
	  console.log("Request handler START was called.");

      //var err/or="";
      child = exec("C:\\\"Program Files\"\\Java\\jre7\\bin\\java.exe -jar test.jar", function (error) { 
		child.stderr.on('error', function (error) {
			console.log(child.pid+ ' stderr: ' + error);
			fs.writeFile('data\\errorLog.txt', error, function (err) {
				if (err) throw err;
				console.log('It\'s saved!');
			});
		});
		
		var log = fs.readFileSync("data\\log.txt").toString("utf8");
		console.log(log);
		if (error == undefined) {
			res.send({ "log": log });
			res.end();
		} else {
			res.send({ "error": error });
			res.end();
			console.log('error:' + error);
		}
    });
	
}

app.listen(5555);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
