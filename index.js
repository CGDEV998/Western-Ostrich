const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const profileApi = require('./routes/profile');
const indexApi = require('./routes/index');
const env = require('dotenv').config();

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(indexApi());
app.use(profileApi());

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/profile', (request, res) => {
  res.render('pages/profile');
});

// Keep as last route
app.get('*', (req, res) => {
  res.render('pages/404');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
