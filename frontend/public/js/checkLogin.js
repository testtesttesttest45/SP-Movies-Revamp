$(document).ready(function () {
    function jwt_decode(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    var token = localStorage.getItem('token');
    if (token) {
        var decoded = jwt_decode(token);
        $('#thisusername').text(decoded.username);
        localStorage.setItem('userId', decoded.userid);
        document.getElementById('thisusername').setAttribute('href', 'profile.html'); // or $('#thisusername').attr('href', 'profile.html');
    }
    else {
        document.getElementById('thisusername').setAttribute('href', 'login.html'); // or $('#thisusername').attr('href', 'login.html');
    }
});


