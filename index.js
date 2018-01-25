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
/*
steps:
1. get user
2. get user media
3. render user on profile page
4. render watched list on profile page
5. render to watch list on profile page
*/
app.get('/profile/:username', (req, res) => {
  var username = req.params.username;
  var data = {};

  blueBirdPromise.all([
    userService.getUser(username), 
    watchService.getWatched(1),
    watchService.getToWatch(1)
  ]).then((values) => {
    console.log(values);
  });

//   var userPromise = userService.getUser(username)
//     .then(userData => {
//       var user = userData.rows[0];
//       data["user"] = user;
//       var watchedPromise = watchService.getWatched(username)
//       .then(watchedListData => {
//         var watchedlist = watchedListData.rows;
//         data["watchedList"] = watchedlist;
//       }).catch(e => { console.error('error: ', e) });
//       var toWatchPromise = watchService.getToWatch(username)
//       .then(toWatchListData => {
//         var toWatchList = toWatchListData.rows;
//         data["toWatchList"] = toWatchList;
//       }).catch(e => { console.error('error: ', e) });
//       watchedPromise.then((values) => {
//         toWatchPromise.then((values) => {
//           userPromise.then((values) => {
//             res.render(`./pages/profile`, {
//               user: data.user,
//               watchedList: data.watchedList,
//               toWatchList: data.toWatchList
//             });
//           }).catch(e => { console.error('error: ', e) });
//         }).catch(e => { console.error('error: ', e) });
//       }).catch(e => { console.error('error: ', e) });
//     }).catch(e => { console.error('error: ', e) });
});

app.get('*', (req, res) => {
  res.render('pages/404');
});

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

