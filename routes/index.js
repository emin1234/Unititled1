var express = require('express');
var router = express.Router();

var users = [];
var tacan1 = false;
var tacan2 = false;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login');
});
router.post('/login', function (req, res, next) {
    var userInfo = req.body;
    function checkUser(currentValue) {
        return (currentValue.username === userInfo.username && currentValue.password === userInfo.password);
    }
    if(users.find(checkUser)){
        tacan2 = true;
        res.redirect('/private');
        //res.render('welcome', { username: userInfo.username });
    }
    else{
      res.render('greska',{message:"Netacan Username ili Password" });
    }
});

router.post('/register', function(req, res, next) {
    var userInfo = req.body;
    if (userInfo.username === "" || userInfo.password === "") {
        res.render('greska', {message: "Greska: Prazan username ili password"});
        return;
    }
    function checkUser(currentValue) {
        return (currentValue.username === userInfo.username);
    }
    if(users.find(checkUser)) {
        res.render('greska', {message: 'Vec ste registrovani'});
    }
    else {
        users.push({
            username: userInfo.username,
            password: userInfo.password
        });
        //res.render('welcome', { username: userInfo.username });
        /*router.get('/private', function (req, res, next) {
            res.render('welcome', { username: userInfo.username });
        });*/
        res.redirect('/private');
        tacan1 = true;
    }
});
router.get('/private', function(req, res, next) {
    if(tacan1 == true || tacan2 == true){
        res.render('welcome');
    }
    else
      res.redirect('/public');
});

router.get('/public', function (req, res, next) {
    res.render('javna');
});

module.exports = router;
