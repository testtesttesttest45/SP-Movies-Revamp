





$(document).ready(function () {

    const newMovieModal = document.getElementById("openMovieModal");
    const clearMovieModal = document.getElementById("clearMovieModal");
    const backgroundAnimationStop = document.getElementById("showStopper");
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
    backgroundAnimationStop.addEventListener("click", function (e) {
        const birdContainer = document.getElementsByClassName("bird-container");
        const x = birdContainer[0].style.animationPlayState;
        for (let i = 0; i < birdContainer.length; i++) {
            x === "running" 
                ? (birdContainer[i].style.animationPlayState = "paused", this.className = "btn btn-success", this.innerHTML = "<i class='fa fa-play'> Start Animation</i>")
                : (birdContainer[i].style.animationPlayState = "running", this.className = "btn btn-danger", this.innerHTML = "<i class='fa fa-stop'> Stop Animation</i>");
        }





    });

})