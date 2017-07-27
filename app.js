const express = require('express');
const mustacheExpress = require('mustache-express');
const data = require('./data.js');// he has "./data"
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use('/public', express.static('public'));
//listening on root
app.get('/', function(req, res){
  //index.mustache render
  res.render('index', data)//data.users
});
//look in data and find username matches the request's username
app.get('/:id', function(req, res) {
  var user = {};
  for (let i = 0; i < data.users.length; i++) {
    user = data.users[i];
    //Ben used const user =data.users.find(function(user){return user.username ==== req.params.id})
    if (user.id == req.params.id) {
      break;
    }
  };
  res.render('userProfile', user)
});

app.listen(3000, function(){
  console.log('Listening...');
});
