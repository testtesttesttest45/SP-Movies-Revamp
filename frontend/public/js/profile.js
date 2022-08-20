$(document).ready(function () {
    const nameSide = document.getElementById('nameSide');
    const profilePhoto = document.getElementById('profilePhoto');
    const nameMain = document.getElementById('nameMain');
    const emailMain = document.getElementById('emailMain');
    const phoneMain = document.getElementById('phoneMain');
    const roleMain = document.getElementById('roleMain');
    const registeredMain = document.getElementById('registeredMain');
    const editButton = document.getElementById('editButton');
    const logoutButton = document.getElementById('logoutButton');
    const requestAdminButton = document.getElementById('requestAdminButton');
    const deleteButton = document.getElementById('deleteButton');
    const userId = localStorage.getItem('userId');
    let favouriteHTML = '';
    if (userId) {
        fetch(`http://localhost:8085/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log("User details:", data);
                $('title').text(`SP Movies | ${data.username}`); // replace the title of the page with the title of the movie
                nameSide.innerHTML = data.username;
                profilePhoto.src = `http://localhost:8085/image/${data.pic}`;
                nameMain.innerHTML = data.username;
                emailMain.innerHTML = data.email;
                phoneMain.innerHTML = data.contact;
                roleMain.innerHTML = data.role;
                registeredMain.innerHTML = data.created_at;
            })
            .catch(err => console.log(err));
        logoutButton.addEventListener('click', function () {
            window.localStorage.clear();
            Swal.fire({
                title: 'You have been logged out.',
                text: "Do you want to go back to homepage?",
                icon: 'warning',
                // show yes and no button. yes will bring to homepage and no will go to login page
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: 'lightsalmon',
                cancelButtonText: 'No, get me out!',
                confirmButtonText: 'Yes, bring me to homepage!'
            }).then((result) => {
                if (result.value) {
                    window.location.href = "index.html";
                } else {
                    window.location.href = "login.html";
                }
            })
        });
        requestAdminButton.addEventListener('click', function () {
            // when clicked, just show alert message
            Swal.fire({
                title: 'Application sent!',
                text: 'You will receive an email in 3 working years.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            })
        });
        deleteButton.addEventListener('click', function () {
            Swal.fire({
                title: 'Are you sure you want to delete your account?',
                text: 'This cannot be undone!',
                icon: 'warning',
                confirmButtonColor: '#ff2e54', // red
                showCancelButton: true
            })
                .then((result) => {
                    if (result.value) {
                        fetch(`http://localhost:8085/user/${userId}`, {
                            method: 'DELETE'
                        })
                            .then(response => response.json())
                            .then(data => {
                                window.localStorage.clear();
                                Swal.fire({
                                    title: 'Account deleted!',
                                    text: 'You will be redirected to the login page.',
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'OK'
                                }).then((result) => {
                                    if (result.value) {
                                        window.location.href = "login.html";
                                    }
                                })
                            })

                    }

                })

        });
        editButton.addEventListener('click', function () {
            Swal.fire({
                title: 'Edit your profile',
                html: `<form id="editForm">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" placeholder="Enter username" value="${nameMain.innerHTML}">
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email" value="${emailMain.innerHTML}">
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="text" class="form-control" id="phone" placeholder="Enter phone" value="${phoneMain.innerHTML}">
                        </div>
                        <div class="form-group">
                            <label for="password">Old Password</label>
                            <input type="password" class="form-control" id="oldPassword" placeholder="Enter old password" value="">
                        </div>
                        <div class="form-group">
                            <label for="password">New Password</label>
                            <input type="password" class="form-control" id="newPassword" placeholder="Confirm password" value="">
                        </div>
                        <div class="form-group">
                            <label for="password">Confirm New Password</label>
                            <input type="password" class="form-control" id="confirmNewPassword" placeholder="Confirm new password" value="">
                        </div>
                        <div class="form-group">
                            <label for="profilePicture">Profile Picture</label>
                            <input type="file" class="form-control" id="profilePicture" placeholder="Upload profile picture" value="">
                        </div>

                    </form>`,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: 'lightsalmon',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Save'
            }).then((result) => {
                if (result.value) {
                    const username = document.getElementById('username').value;
                    const email = document.getElementById('email').value;
                    const phone = document.getElementById('phone').value;
                    const oldPassword = document.getElementById('oldPassword').value;
                    const newPassword = document.getElementById('newPassword').value;
                    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
                    const profilePicture = document.getElementById('profilePicture').value;
                    // profilePicture is a file object, need to convert it to a form data object, then save it to the http://localhost:8085/image folder

                    const data = {
                        username: username,
                        email: email,
                        contact: phone,
                        password: newPassword,
                    };
                    fetch(`http://localhost:8085/users/${userId}`)
                        .then(response => response.json())
                        .then(doggy => {
                            console.log("User password:", doggy.password);
                            if (oldPassword === '' || newPassword === '' || confirmNewPassword === '' || username === '' || email === '' || phone === '') {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Please fill in all fields.',
                                    icon: 'error',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'OK'
                                })
                                return;
                            } else if (oldPassword !== doggy.password || newPassword !== confirmNewPassword) {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Password does not match!',
                                    icon: 'error',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'OK'
                                })
                                return;
                            }
                            else {
                                fetch(`http://localhost:8085/user/${userId}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json' // Without using this, the server will not understand the data. maybe 415 error(unsupported media type)
                                    },
                                    body: JSON.stringify(data)
                                })
                                    .then(response => response.json(console.log("Updating profile status: ", response.status)))
                                    .then(data => {
                                        console.log(data.status)
                                        if (data.status === 200) { // to access the status , ensure to send back from backend the (message + status) like so: res.send({ message: "Username or email already exists", status: 409 });
                                            Swal.fire({
                                                title: 'Profile updated!',
                                                text: 'Reload now.',
                                                icon: 'success',
                                                confirmButtonColor: '#3085d6',
                                                confirmButtonText: 'OK'
                                            }).then((result) => {
                                                if (result.value) {
                                                    window.location.href = "profile.html";
                                                }
                                            })
                                        }
                                        else {
                                            Swal.fire({
                                                title: 'Error!',
                                                text: data.message,  // show the error message, exact same as the one in the backend
                                                icon: 'error',
                                                confirmButtonColor: '#3085d6',
                                                confirmButtonText: 'OK'
                                            })
                                        }

                                    })
                            }
                        })
                        .catch(err => console.log(err));

                }

            })
        })
        // fetch and display all favourites of the user
        fetch(`http://localhost:8085/userFavourite/${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log("You favourite these: ", data);
                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        const { title, thumbnail, opening_date } = data[i];
                        favouriteHTML = `
                        <div class="col-12 col-sm-6 col-lg-3" style="padding-top:40px">
                        <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style="visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;max-width: 100%;
                            max-height: 300px;">
                        <div class="advisor_thumb"><img src="http://localhost:8085/image/movies/${thumbnail}"
                                class="movieBanner">
                        </div>
                        <div class="single_advisor_details_info">
                            <h6>${title}</h6>
                            <p class="designation">Release date: ${opening_date}</p>
                        </div>
                        </div>
                        </div>
                        `;
                        $('#favouriteContainer').append(favouriteHTML);
                    }
                    
                }
            })
            .catch(err => console.log(err));
    }

    else {
        alert("Siam")
        window.location.href = "login.html";
    }
})
