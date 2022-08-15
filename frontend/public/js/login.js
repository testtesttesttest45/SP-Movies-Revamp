$(document).ready(function () {
    $("#loginButton").click(function () {
        var emailInput = $('#email').val();
        var passwordInput = $('#password').val();
        var body = JSON.stringify({ email: emailInput, password: passwordInput });
        console.log(body);
        $.ajax({
            url: 'http://localhost:8085/user/login',
            type: 'POST',
            data: body,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, xhr) {
                if (data) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userInfo', data.UserData);
                    window.location.assign("index.html");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                if (xhr.status == 404) {
                    Swal.fire({
                        title: 'Error',
                        text: 'User not found or password incorrect!s',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
        return false;
    });
});  