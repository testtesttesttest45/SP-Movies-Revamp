function DeleteGenre(genreID) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete genre!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: 'http://localhost:8085/genre/' + genreID,
                type: 'DELETE',
                success: function (result) {
                    Swal.fire({
                        title: 'Genre deleted!',
                        text: 'The genre has been deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    getGenres();
                },

                error: function (error) {
                    document.getElementById("ErrorAlert").style.display = "inline";
                    document.querySelector("#ErrorAlert h4").innerHTML += "Error: " + error.responseJSON.message; // display the error on the h4 of #ErrorAlert
                }
            });
        } else {
            Swal.fire({
                title: 'Cancelled',
                html: `<div class="container-fluid">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="alert alert-info alert-dismissable">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                            &times;
                                        </button>Genre deletion cancelled.
                                    </div>
                                </div>
                            </div>
                        </div>`,
                icon: 'info',
                confirmButtonText: 'OK'
            })
        }
    })

}

function EditGenre(genreID) {
    const editGenreTitle = document.getElementById("edit-genre-title");
    const editGenreDescription = document.getElementById("edit-genre-description");
    const GENREID = document.getElementById("GENREID");
    fetch("http://localhost:8085/genre/" + genreID)
        .then(response => response.json())
        .then(data => {
            GENREID.textContent = data.result[0].genreID;
            editGenreTitle.value = data.result[0].genre;
            editGenreDescription.value = data.result[0].description;
        }).catch(error => {
            console.log(error);
            document.getElementById("ErrorAlert").style.display = "inline";
            document.querySelector("#ErrorAlert h4").innerHTML = "Error: " + error;
        });

}

function DeleteUser(userID) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete user!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: 'http://localhost:8085/users/' + userID,
                type: 'DELETE',
                success: function (result) {
                    Swal.fire({
                        title: 'User deleted!',
                        text: result.message,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    getUsers();
                },

                error: function (error) {
                    console.log(error);
                    document.getElementById("ErrorAlert").style.display = "inline";
                    document.querySelector("#ErrorAlert h4").innerHTML += "Error: " + error.responseJSON.message; // display the error on the h4 of #ErrorAlert
                }
            });
        } else {
            Swal.fire({
                title: 'Cancelled',
                html: `<div class="container-fluid">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="alert alert-info alert-dismissable">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                            &times;
                                        </button>User deletion cancelled.
                                    </div>
                                </div>
                            </div>
                        </div>`,
                icon: 'info',
                confirmButtonText: 'OK'
            })
        }
    })

}

function UpdateUserRole(userID, role, username) {
    if (role == "Customer") {
        Swal.fire({
            title: 'Promote ' + username + '?',
            text: `Updating role from ${role} to Admin`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update role!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: `http://localhost:8085/users/${userID}/role`,
                    type: 'PUT',
                    data: {
                        role: "Admin"
                    },
                    success: function (result) {
                        Swal.fire({
                            title: 'User updated!',
                            text: result.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        getUsers();
                    },
                    catch: function (error) {
                        console.log(error);
                        document.getElementById("ErrorAlert").style.display = "inline";
                        document.querySelector("#ErrorAlert h4").innerHTML += "Error: " + error.responseJSON.message; // display the error on the h4 of #ErrorAlert
                    }
                });
            } else {
                Swal.fire({
                    title: 'Cancelled',
                    html: `<div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="alert alert-info alert-dismissable">
                                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                                &times;
                                            </button>User update cancelled.
                                        </div>
                                    </div>
                                </div>
                            </div>`,
                    icon: 'info',
                    confirmButtonText: 'OK'
                })
            }
        })
    }
    else if (role == "Admin") {
        Swal.fire({
            title: 'Demote ' + username + '?',
            text: `Updating role from ${role} to Customer`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update role!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: `http://localhost:8085/users/${userID}/role`,
                    type: 'PUT',
                    data: {
                        role: "Customer"
                    },
                    success: function (result) {
                        Swal.fire({
                            title: 'User updated!',
                            text: result.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                        getUsers();
                    }
                });
            } else {
                Swal.fire({
                    title: 'Cancelled',
                    html: `<div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="alert alert-info alert-dismissable">
                                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                                &times;
                                            </button>User update cancelled.
                                        </div>
                                    </div>
                                </div>
                            </div>`,
                    icon: 'info',
                    confirmButtonText: 'OK'
                })
            }
        })
    }
}

function getUsers() {
    console.log("getUsers() called");
    const allUserBody = document.getElementById("all-user-body");
    $.ajax({
        url: 'http://localhost:8085/users',
        type: 'GET',
        success: function (result) {
            allUserBody.innerHTML = "";
            for (let i = 0; i < result.length; i++) {
                allUserBody.innerHTML +=
                    `<tr class="userTest">
                        <td>
                            ${i + 1}
                        </td>
                        <td style="width:250px">
                            ${result[i].username}
                        </td style="width:250px">
                        <td>
                            ${result[i].email}
                        </td>
                        <td>
                            ${result[i].role}
                        </td>
                        <td>
                            <button class="btn btn-warning" type="button" onclick="UpdateUserRole(${result[i].userid}, '${result[i].role}', '${result[i].username}')">Update Role</button>
                            <button class="btn btn-danger" type="button" onclick="DeleteUser(${result[i].userid})">Delete User</button>
                        </td>
                    </tr>`
            }
        },
        error: function (error) {
            document.getElementById("ErrorAlert").style.display = "inline";
            document.querySelector("#ErrorAlert h4").innerHTML += "Error: " + error.responseJSON.message; // display the error on the h4 of #ErrorAlert
        }
    });

}

function getGenres() {
    console.log("getGenres() called.")
    const newMovieModal = document.getElementById("openMovieModal");
    const newMovieGenre = document.getElementById("new-movie-genre");
    const newMovieSubGenre = document.getElementById("new-movie-subgenre");
    const clearGenreModal = document.getElementById("clearGenreModal");
    const allGenreBody = document.getElementById("all-genre-body");
    fetch("http://localhost:8085/genre") //fetch all genres
        // append the genres to newMovieGenre select options and newMovieSubGenre select options
        .then(response => response.json())
        .then(data => {
            allGenreBody.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                allGenreBody.innerHTML += `
                <tr class="genreTest">
                    <td>
                        ${i + 1}
                    </td>
                    <td>
                        ${data[i].genre}
                    </td>
                    <td style="width:550px">
                        ${data[i].description}
                    </td>
                    <td>
                        <button class="btn btn-warning" type="button" data-toggle="modal"
                        data-target="#exampleModal4" id="openMovieModal" onclick="EditGenre(${data[i].genreID})">Edit</button>
                        <button class="btn btn-danger" id="DeleteGenre" onclick="DeleteGenre(${data[i].genreID})">Delete</button>
                    </td>
                </tr > `;
            }


            newMovieSubGenre.innerHTML = "";
            newMovieGenre.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].genre !== newMovieSubGenre.value) {
                    newMovieGenre.innerHTML += `<option value = "${data[i].genre}" > ${data[i].genre}</option> `;
                    newMovieGenre.value = "";
                }
            }

            for (let i = 0; i < data.length; i++) {
                if (data[i].genre !== newMovieGenre.value) {
                    newMovieSubGenre.innerHTML += `<option value = "${data[i].genre}" > ${data[i].genre}</option> `;
                    newMovieSubGenre.value = "";
                }
            }
            $("#new-movie-genre").change(function () {
                const X = document.getElementById("new-movie-subgenre").value;
                $('#new-movie-subgenre').empty();
                for (let i = 0; i < data.length; i++) {
                    if (data[i].genre !== newMovieGenre.value) {
                        newMovieSubGenre.innerHTML += `<option value = "${data[i].genre}" > ${data[i].genre}</option> `;
                        document.getElementById("new-movie-subgenre").value = X;
                    }
                }
            });
            $("#new-movie-subgenre").change(function () {
                const Y = document.getElementById("new-movie-genre").value;
                $('#new-movie-genre').empty();
                for (let i = 0; i < data.length; i++) {
                    if (data[i].genre !== newMovieSubGenre.value) {
                        newMovieGenre.innerHTML += `<option value = "${data[i].genre}" > ${data[i].genre}</option> `;
                        document.getElementById("new-movie-genre").value = Y;
                    }
                }
            });
        })
        .catch(error => {
            document.getElementById("ErrorAlert").style.display = "inline";
            document.querySelector("#ErrorAlert h4").innerHTML += "Error: " + error; // display the error on the h4 of #ErrorAlert
        });
}



$(document).ready(function () {

    const createMovieButton = document.getElementById("createMovie");
    const clearMovieModal = document.getElementById("clearMovieModal");
    const addGenreButton = document.getElementById("addGenre");
    const backgroundAnimationStopFly = document.getElementById("stopAnimationForward");
    const backgroundAnimationStopFlap = document.getElementById("stopAnimationFlap");
    const refreshButtonGenre = document.getElementById("refreshButtonGenre");
    const refreshButtonUser = document.getElementById("refreshButtonUser");
    const editGenreTitle = document.getElementById("edit-genre-title");
    const editGenreDescription = document.getElementById("edit-genre-description");
    const editGenreButton = document.getElementById("EditGenre");
    const clearEditGenreModal = document.getElementById("clearEditGenreModal");
    const manageUsersButton = document.getElementById("manageUsers");
    getGenres();

    createMovieButton.addEventListener("click", function (e) { // NEW MOVIE
        const newMovieTitleInput = document.getElementById("new-movie-title").value;
        const newMovieDescriptionInput = document.getElementById("new-movie-description").value;
        const newMovieCastInput = document.getElementById("new-movie-cast").value;
        const newMovieReleaseDateInput = document.getElementById("new-movie-releasedate").value;
        const newMovieDurationInput = document.getElementById("new-movie-duration").value;
        const newMovieGenre = document.getElementById("new-movie-genre");
        const newMovieSubGenre = document.getElementById("new-movie-subgenre");
        const newMovieGenreInput = newMovieGenre.value;
        const newMovieSubGenreInput = newMovieSubGenre.value;
        const newMovie = {
            title: newMovieTitleInput,
            description: newMovieDescriptionInput,
            cast: newMovieCastInput,
            opening_date: newMovieReleaseDateInput,
            time: newMovieDurationInput,
            genreid: newMovieGenreInput,
            genreid1: newMovieSubGenreInput
        };
        if (newMovie.title == "" || newMovie.description == "" || newMovie.cast == "" || newMovie.opening_date == "" || newMovie.time == "" || newMovie.genreid == "" || newMovie.genreid1 == "") {
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all fields',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
        // send a request to post movie
        $.ajax({
            url: "http://localhost:8085/movie",
            type: "POST",
            data: JSON.stringify(newMovie),
            contentType: "application/json",
            success: function (data) {
                Swal.fire({
                    title: 'Success',
                    text: 'Movie created successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                // click closeMovieModal
                const closeMovieModal = document.getElementById("closeMovieModal");
                closeMovieModal.click();
            },
            error: function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error creating movie',
                    text: error.responseJSON.message
                })
            }
        });

    });
    clearMovieModal.addEventListener("click", function (e) { // CLEAR MOVIE MODAL FORM
        document.getElementById("new-movie-title").value = "";
        document.getElementById("new-movie-description").value = "";
        document.getElementById("new-movie-cast").value = "";
        document.getElementById("new-movie-releasedate").value = "";
        document.getElementById("new-movie-duration").value = "";
        document.getElementById("new-movie-genre").value = "";
        document.getElementById("new-movie-subgenre").value = "";
    });
    addGenreButton.addEventListener("click", function (e) { // NEW GENRE
        const newGenreTitleInput = document.getElementById("new-genre-title").value;
        const newGenreDescriptionInput = document.getElementById("new-genre-description").value;
        const newGenre = {
            genre: newGenreTitleInput,
            description: newGenreDescriptionInput,
        };
        if (newGenre.genre == "" || newGenre.description == "") {
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all fields',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
        // send a request to post genre
        $.ajax({
            url: "http://localhost:8085/genre",
            type: "POST",
            data: JSON.stringify(newGenre),
            contentType: "application/json",
            success: function (data) {
                Swal.fire({
                    title: data.message,
                    text: "genreId: " + data.genreId,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                getGenres();
                // click closeMovieModal
                const closeGenreModal = document.getElementById("closeGenreModal");
                closeGenreModal.click();
            },
            error: function (error) {
                document.getElementById("ErrorAlert").style.display = "inline"; // display the error on the h4 of #ErrorAlert
                error.status === 422 || error.status === 500
                    ? document.querySelector("#ErrorAlert h4").innerHTML = "Error: " + error.responseJSON.message
                    : document.querySelector("#ErrorAlert h4").innerHTML = "Error: " + error.statusText; // display the error on the h4 of #ErrorAlert
            }
        });
    });
    clearGenreModal.addEventListener("click", function (e) { // CLEAR GENRE MODAL FORM
        document.getElementById("new-genre-title").value = "";
        document.getElementById("new-genre-description").value = "";
    });
    backgroundAnimationStopFly.addEventListener("click", function (e) { // STOP ANIMATION FORWARD
        const birdContainer = document.getElementsByClassName("bird-container");
        const x = birdContainer[0].style.animationPlayState;
        for (let i = 0; i < birdContainer.length; i++) {
            x === "running"
                ? (birdContainer[i].style.animationPlayState = "paused", this.className = "btn showStopper2", this.innerHTML = "<i class='fa fa-play'> Start Flying</i>")
                : (birdContainer[i].style.animationPlayState = "running", this.className = "btn showStopper", this.innerHTML = "<i class='fa fa-stop'> Stop Flying</i>");
        }
    });
    backgroundAnimationStopFlap.addEventListener("click", function (e) { // STOP ANIMATION FLAP WINGS
        const birdContainer = document.getElementsByClassName("bird");
        const x = birdContainer[0].style.animationName;
        for (let i = 0; i < birdContainer.length; i++) {
            x === "fly-cycle"
                ? (birdContainer[i].style.animationName = "none", this.className = "btn showStopper2", this.innerHTML = "<i class='fa fa-play'> Start Flapping</i>")
                : (birdContainer[i].style.animationName = "fly-cycle", this.className = "btn showStopper", this.innerHTML = "<i class='fa fa-stop'> Stop Flapping</i>");
        }
    });
    refreshButtonGenre.addEventListener("click", function (e) { // REFRESH DATA FETCHING(USELESS BUT USEFUL)
        getGenres();
        // add the animation "rotation 2s infinite linear;" to refresh button when clicked
        this.style.animation = "rotation 1s infinite linear";
        setTimeout(function () {
            refreshButtonGenre.style.animation = "none";
        }, 200);
    });
    editGenreButton.addEventListener("click", function () { // EDIT GENRE
        const GENREID = document.getElementById("GENREID").textContent;
        // console.log("The genreid is: " + GENREID);
        if (editGenreTitle.value == "" || editGenreDescription.value == "") {
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all fields',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return;
        }
        $.ajax({
            url: 'http://localhost:8085/genre/' + GENREID,
            type: 'PUT',
            data: {
                genre: editGenreTitle.value,
                description: editGenreDescription.value
            },
            success: function (result) {
                Swal.fire({
                    title: 'Genre edited!',
                    text: 'The genre has been edited.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                getGenres();
                // click closeMovieModal
                const closeEditGenreModal = document.getElementById("closeEditGenreModal");
                closeEditGenreModal.click();
            },
            error: function (error) {
                document.getElementById("ErrorAlert").style.display = "inline";
                document.querySelector("#ErrorAlert h4").innerHTML = "Error: " + error.responseJSON.message; // display the error on the h4 of #ErrorAlert
            }
        });
    });
    clearEditGenreModal.addEventListener("click", function (e) { // CLEAR EDIT GENRE MODAL FORM
        editGenreTitle.value = "";
        editGenreDescription.value = "";
    });
    manageUsersButton.addEventListener("click", function (e) { // MANAGE USERS
        getUsers();
    });
    refreshButtonUser.addEventListener("click", function (e) { // REFRESH DATA FETCHING(USELESS BUT USEFUL)
        getUsers();
        // add the animation "rotation 2s infinite linear;" to refresh button when clicked
        this.style.animation = "rotation 1s infinite linear";
        setTimeout(function () {
            refreshButtonUser.style.animation = "none";
        }, 200);
    });

})