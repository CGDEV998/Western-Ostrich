/* global $ */

$.get('/profile-info/01', (data) => {
  $('#username').text(data.username);
});

$.get('/watched-list/01', (data) => {
  const watched = data.watched;
  for (var i = 0; i < watched.length; i++) {
    $('#watched-list').append($('<li>' + watched[i].title + '</li>'));
  };
});

$.get('/towatch-list/01', (data) => {
  const toWatch = data.toWatch;
  for (var i = 0; i < toWatch.length; i++) {
    $('#to-watch-list').append($('<li>' + toWatch[i].title + '</li>'));
  };
});

