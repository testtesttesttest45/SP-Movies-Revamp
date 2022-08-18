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
    if (userId) {
        fetch(`http://localhost:8085/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log("User details:", data);
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
    }
    else {
        alert("Siam")
        window.location.href = "login.html";
    }
})
