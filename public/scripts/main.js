console.log('this is a profile page');

$.get('/profile-info/01', (data) => {
    $('#username').text(data.username);
});


