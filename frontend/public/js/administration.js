





$(document).ready(function () {

    const newMovieModal = document.getElementById("openMovieModal");
    const clearMovieModal = document.getElementById("clearMovieModal");
    const backgroundAnimationStopFly = document.getElementById("stopAnimationForward");
    const backgroundAnimationStopFlap = document.getElementById("stopAnimationFlap");
    newMovieModal.addEventListener("click", function (e) {
        const createMovie = document.getElementById("createMovie");
    });
    createMovie.addEventListener("click", function (e) {
        const newMovieTitleInput = document.getElementById("new-movie-title").value;
        const newMovieDescriptionInput = document.getElementById("new-movie-description").value;
        const newMovieCastInput = document.getElementById("new-movie-cast").value;
        const newMovieReleaseDateInput = document.getElementById("new-movie-releasedate").value;
        const newMovieDurationInput = document.getElementById("new-movie-duration").value;
        const newMovieGenreInput = document.getElementById("new-movie-genre").value;
        const newMovieSubGenreInput = document.getElementById("new-movie-subgenre").value;
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