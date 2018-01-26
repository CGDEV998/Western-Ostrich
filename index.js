const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { userService} = require('./services');
const env = require('dotenv').config();

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(api());

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/profile/:username', (request, res) => {
  userService.getUser(request.params.username)
    .then(userData => {
      if (userData.rows.length === 0) {
        res.render('pages/404');
      } else {
        var user = userData.rows[0];
        res.render('pages/profile', user);
      }
    })
    .catch(e => {
      console.error(e);
    });
});

app.get('*', (req, res) => {
  res.render('pages/404');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
