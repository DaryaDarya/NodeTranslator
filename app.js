var express = require("express");
var bodyParser = require("body-parser");
var templating = require('consolidate');
var path = require("path");

//var db = require("./repositories/words");
var wordsController = require("./controllers/wordsController");
var app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.engine('html', templating.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, "views"));
app.use(express.static('public'));


app.get('/', wordsController.index);
app.post('/', wordsController.translateWord);
app.post("/saveWordsPair", wordsController.saveWordsPair);
app.get("/list", wordsController.getList);
app.post("/delete", wordsController.delete);
app.get("/training", wordsController.getUnstudiedList);
app.post("/updateRate", wordsController.updateRate);

app.listen(8080, ()=>{
	console.log('Express server listening on port 8080');
});
