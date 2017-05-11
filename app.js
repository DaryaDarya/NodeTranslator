const express = require("express");
const bodyParser = require("body-parser");
const templating = require('consolidate');
const path = require("path");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

//var db = require("./repositories/words");
const wordsController = require("./controllers/wordsController");
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({secret: 'translator', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

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
app.get('/login', function(req, res){
  res.render('login');
});
app.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/login'
  })
);
app.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/login'
  })
);

app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
});

app.listen(8080, ()=>{
	console.log('Express server listening on port 8080');
});
