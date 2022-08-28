function DeleteGenre(genreID) {
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
            getGenre();
        },

        error: function (error) {
            document.getElementById("ErrorAlert").style.display = "inline";
            document.querySelector("#ErrorAlert h4").innerHTML += "Error: " + error.responseJSON.message; // display the error on the h4 of #ErrorAlert
        }
    });
}

function getGenre() {
    console.log("called")
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
                <tr class="table-warning">
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
                        <button class="btn btn-warning" id="EditGenre">Edit</button>
                        <button class="btn btn-danger" id="DeleteGenre" onclick="DeleteGenre(${data[i].genreID})">Delete</button>
                    </td>
                </tr>`;
            }
            newMovieSubGenre.innerHTML = "";
            newMovieGenre.innerHTML = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].genre !== newMovieSubGenre.value) {
                    console.log(data[i].genre);
                    newMovieGenre.innerHTML += `<option value="${data[i].genre}">${data[i].genre}</option>`;
                    newMovieGenre.value = "";
                }
            }

            for (let i = 0; i < data.length; i++) {
                if (data[i].genre !== newMovieGenre.value) {
                    newMovieSubGenre.innerHTML += `<option value="${data[i].genre}">${data[i].genre}</option>`;
                    newMovieSubGenre.value = "";
                }
            }
            $("#new-movie-genre").change(function () {
                const X = document.getElementById("new-movie-subgenre").value;
                $('#new-movie-subgenre').empty();
                for (let i = 0; i < data.length; i++) {
                    if (data[i].genre !== newMovieGenre.value) {
                        newMovieSubGenre.innerHTML += `<option value="${data[i].genre}">${data[i].genre}</option>`;
                        document.getElementById("new-movie-subgenre").value = X;
                    }
                }
            });
            $("#new-movie-subgenre").change(function () {
                const Y = document.getElementById("new-movie-genre").value;
                $('#new-movie-genre').empty();
                for (let i = 0; i < data.length; i++) {
                    if (data[i].genre !== newMovieSubGenre.value) {
                        newMovieGenre.innerHTML += `<option value="${data[i].genre}">${data[i].genre}</option>`;
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

    getGenre();

    createMovieButton.addEventListener("click", function (e) {
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
    clearMovieModal.addEventListener("click", function (e) {
        document.getElementById("new-movie-title").value = "";
        document.getElementById("new-movie-description").value = "";
        document.getElementById("new-movie-cast").value = "";
        document.getElementById("new-movie-releasedate").value = "";
        document.getElementById("new-movie-duration").value = "";
        document.getElementById("new-movie-genre").value = "";
        document.getElementById("new-movie-subgenre").value = "";
    });
    addGenreButton.addEventListener("click", function (e) {
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
                getGenre();
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
    clearGenreModal.addEventListener("click", function (e) {
        document.getElementById("new-genre-title").value = "";
        document.getElementById("new-genre-description").value = "";
    });

    backgroundAnimationStopFly.addEventListener("click", function (e) {
        const birdContainer = document.getElementsByClassName("bird-container");
        const x = birdContainer[0].style.animationPlayState;
        for (let i = 0; i < birdContainer.length; i++) {
            x === "running"
                ? (birdContainer[i].style.animationPlayState = "paused", this.className = "btn showStopper2", this.innerHTML = "<i class='fa fa-play'> Start Flying</i>")
                : (birdContainer[i].style.animationPlayState = "running", this.className = "btn showStopper", this.innerHTML = "<i class='fa fa-stop'> Stop Flying</i>");
        }
    });
    backgroundAnimationStopFlap.addEventListener("click", function (e) {
        const birdContainer = document.getElementsByClassName("bird");
        const x = birdContainer[0].style.animationName;
        for (let i = 0; i < birdContainer.length; i++) {
            x === "fly-cycle"
                ? (birdContainer[i].style.animationName = "none", this.className = "btn showStopper2", this.innerHTML = "<i class='fa fa-play'> Start Flapping</i>")
                : (birdContainer[i].style.animationName = "fly-cycle", this.className = "btn showStopper", this.innerHTML = "<i class='fa fa-stop'> Stop Flapping</i>");
        }
    });

})