const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { userService, watchService} = require('./services');
const env = require('dotenv').config();
var blueBirdPromise = require("bluebird");

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/profile/:username', (req, res) => {
  var username = req.params.username;
  blueBirdPromise.all([
    userService.getUser(username),
    watchService.getWatched(username),
    watchService.getToWatch(username)
  ]).then((values) => {
    res.render(`./pages/profile`, {
      user: values[0].rows[0],
      watchedList: values[1].rows,
      toWatchList: values[2].rows
    });
  });
});

app.get('*', (req, res) => {
  res.render('pages/404');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

