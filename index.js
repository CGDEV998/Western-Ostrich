const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/profile', function(request, response) {
	response.render('pages/profile');
});

app.get('/account', function(request, response) {
	response.render('pages/account');
});

app.get('/profile-info/:userid', (request, response) => {
  let userId = request.params.userid;
  let profileInfo1 = {
    "userid": "01",
    "username": "Harry Potter",
    "avatar": "/images/ostrich-profile.jpg",
  };
  let profileInfo2 = {
      "userid": "02",
      "username": "Dumbledore",
      "avatar": "/images/ostrich-profile.jpg",
  };

  switch(userId) {
      case '01':
          return response.status(200), response.json(profileInfo1);
          break;
      case '02':
          return response.status(200), response.json(profileInfo2);
          break;
      default:
          return response.sendStatus(404);
  };
})

app.get('/watched-list/:userid', (request, response) => {
  let userId = request.params.userid;

  let watched01 = {
    data: ['power rangers', 'justice league']
  };
  let watched02 = {
    data: ['die hard', 'blade runner']
  };

  switch (userId) {
    case '01':
      return response.status(200), response.json(watched01);
      break;
    case '02':
      return response.status(200), response.json(watched02);
      break;
    default:
      return response.sendStatus(404);
  };
});

app.get('/towatch-list/:userid', (request, response) => {
  let userId = request.params.userid;

  let toWatch1 = {
    data: ['back to the future2', 'star wars'],
  };
  let toWatch2 = {
    data: ['star trek', 'game of thrones'],
  };

  switch (userId) {
    case '01':
      return response.status(200), response.json(toWatch1);
      break;
    case '02':
      return response.status(200), response.json(toWatch2);
      break;
    default:
      return response.sendStatus(404);
  };
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

