// document ready signupButton click function
$(document).ready(function () {
    $("#signupButton").click(function () {
        var emailInput = $('#email').val();
        var passwordInput = $('#password').val();
        var usernameInput = $('#username').val();
        var contactInput = $('#contact').val();
        var body = JSON.stringify({ email: emailInput, password: passwordInput, username: usernameInput, contact: contactInput });
        $.ajax({
            url: 'https://sp-movies-backend.herokuapp.com/signup',
            type: 'POST',
            data: body,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, xhr) {
                // Swal .fire only if status is 201
                if (xhr.status == 201) {
                    Swal.fire({
                        title: 'Success',
                        text: 'User created successfully, please login!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    // redirect to login page after 2 second delay
                    setTimeout(function () {
                        window.location.assign("login.html");
                    }, 2000);
                    return;
                }
                


            },
            error: function (xhr, textStatus, errorThrown) {
                // if error code is 422, then user already exists
                if (xhr.status == 422) {
                    Swal.fire({
                        title: 'Error',
                        text: 'User already exists!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
                else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Something went wrong!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }

        });
    });
})