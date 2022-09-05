function DeleteMovie(thisMovieId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true
    })
        .then((result) => {
            if (result.value) {
                $.ajax({
                    url: "https://sp-movies-backend.herokuapp.com/movie/" + thisMovieId,
                    type: "DELETE",
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    },
                    success: function (data) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: "The movie has been deleted.",
                            icon: 'success'
                        })
                            // when ok is clicked, reload the page
                            .then(function () {
                                window.location.reload();
                            });
                    },
                    error: function (data) {
                        Swal.fire({
                            title: 'Error!',
                            text: data.responseJSON.message,
                            icon: 'error'
                        })
                    }
                });
            }
            else {
                Swal.fire({
                    title: 'Delete cancelled!',
                    text: "The movie not been deleted.",
                    icon: 'info'
                })
            }
        })
        .catch(function (err) {
            Swal.fire({
                title: 'Error',
                text: err,
                icon: 'error'
            })
        })
}
function uploadThumbnailButtonClick() {
    $.ajax({
        url: 'https://sp-movies.netlify.app/thumbnail-upload-single',
        type: 'POST',
        enctype: 'multipart/form-data',
        data: new FormData(document.getElementById("FileUploadForm")),
        processData: false,
        contentType: false,
        success: function (result) {
            alert(result.message);
        },
        error: function (error) {
            alert(error.responseJSON.message);
        }
    });
}
function EditMovie(thisMovieId) {
    // thisMovieId is the id of the movie that is being edited, display the movie details in the form
    console.log("Movie Id: ", thisMovieId);
    fetch("https://sp-movies-backend.herokuapp.com/movie/" + thisMovieId)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            Swal.fire({
                title: 'Edit Movie',
                html:
                    '<form id="editMovieForm">' +
                    '<div class="form-group">' +
                    '<label for="title">Title</label>' +
                    `<input type="text" class="form-control" id="title" placeholder="Enter title" value="${data.title}">` +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="description">Description</label>' +
                    '<textarea class="form-control" id="description" rows="3">' + data.description + '</textarea>' +
                    '</div>' +
                    // select genre
                    '<div class="form-group">' +
                    '<label for="genre">Genre</label>' +
                    '<select class="form-control" id="genre">' +
                    `<option value="${data.genre}">` + data.genre + '</option>' +
                    '</select>' +
                    '<div class="form-group">' +
                    '<label for="genre">Sub-Genre</label>' +
                    // select sub-genre
                    '<select class="form-control" id="subgenre">' +
                    // the selected sub-genre is the one that is already in the database
                    `<option value="${data.subgenre}">` + data.subgenre + '</option>' +
                    '</select>' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="cast">Cast</label>' +
                    '<input type="text" class="form-control" id="cast" placeholder="Enter cast" value="' + data.cast + '">' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="releaseDate">Released date</label>' +
                    '<input type="text" class="form-control" id="releaseDate" placeholder="Enter release date" value="' + data.opening_date + '">' +
                    '</div>' +
                    '<div class="form-group">' +
                    '<label for="duration">Duration</label>' +
                    '<input type="text" class="form-control" id="duration" placeholder="Enter duration" value="' + data.time + '">' +
                    '</div>' +
                    '</form>' +
                    '<form id="FileUploadForm">' +
                    '<div class="form-group" style="display:flex">' +
                    '<div>' +
                    '<label for="thumbnail">Thumbnail</label>' +
                    '<input type="file" name="thumbnail-file" id="thumbnail" required/>' +
                    '</div>' +
                    '<div>' +
                    '<button type="submit" id="uploadThumbnail" style="visibility:hidden">Upload</button>' +
                    '</div>' +
                    '</form>',

                showCancelButton: true,
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
            })
                .then(function (result) {
                    if (result.value) {
                        // get the values from the form
                        var title = $('#title').val();
                        var description = $('#description').val();
                        var genre = $('#genre').val();
                        var subgenre = $('#subgenre').val();
                        var cast = $('#cast').val();
                        var releaseDate = $('#releaseDate').val();
                        var duration = $('#duration').val();
                        var thumbnail = $('#thumbnail').val().split('\\').pop();
                        const uploadThumbnailButton = document.getElementById('uploadThumbnail');
                        // create a json object with the values
                        var movie = {
                            "title": title,
                            "description": description,
                            "genreid": genre,
                            "genreid1": subgenre,
                            "cast": cast,
                            "opening_date": releaseDate,
                            "time": duration,
                            "thumbnail": thumbnail
                        };
                        console.log(movie);
                        if (thumbnail !== "") {
                            // uploadThumbnailButton.addEventListener("click", uploadThumbnailButtonClick());
                            uploadThumbnailButton.addEventListener("click", function (e) {
                                e.preventDefault();
                                uploadThumbnailButtonClick();
                            });
                            uploadThumbnailButton.click();
                        }
                        $.ajax({
                            url: "https://sp-movies-backend.herokuapp.com/movie/" + thisMovieId,
                            // contentType: "application/json", // ensure the datatype is application json and can be parsed to be sent to the server
                            type: "PUT",
                            headers: {
                                "Authorization": localStorage.getItem("token"),
                                "Content-Type": "application/json" // ensure the datatype is application json and can be parsed to be sent to the server
                            },
                            data: JSON.stringify(movie),
                            success: function (data) {
                                Swal.fire({
                                    title: 'Saved!',
                                    html: `<div class="container-fluid">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="alert alert-success alert-dismissable">
                                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                                        &times;
                                                    </button>Movie updated. Reloading...
                                                </div>
                                                </div>
                                            </div>
                                        </div>`,
                                    icon: 'success'
                                })
                                    .then(function () { // when ok is clicked, reload the page
                                        window.location.reload();
                                    });
                            },
                            error: function (jqXHR) {
                                Swal.fire({
                                    title: 'Error',
                                    // send back the error message from the server
                                    text: jqXHR.responseJSON.message,
                                    icon: 'error'
                                })
                            }
                        });
                    }
                    else {
                        Swal.fire({
                            title: 'Save cancelled!',
                            html: `<div class="container-fluid">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="alert alert-info alert-dismissable">
                                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                                            &times;
                                        </button>Movie not updated.
                                    </div>
                                </div>
                            </div>
                        </div>`,
                            icon: 'info'
                        })
                    }
                })
                .catch(function (err) {
                    Swal.fire({
                        title: 'Error',
                        text: err,
                        icon: 'error'
                    })
                });
            // this will be used to populate the select dropdown with the genres that are in the database
            fetch("https://sp-movies-backend.herokuapp.com/genre")
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    // remove the genre that is in #genre.val() from the list of genres
                    var genreInput = document.getElementById("genre").textContent;
                    var subgenreInput = document.getElementById("subgenre").textContent;
                    // append all the genres to the select dropdown list.       
                    for (var i = 0; i < data.length; i++) {
                        // dont display genre that is in genreInput, dont display genre that is in subgenreInput,
                        if (data[i].genre != genreInput && data[i].genre != subgenreInput) {
                            $('#genre').append(`<option value="${data[i].genre}">${data[i].genre}</option>`);
                        }
                    }
                    for (var i = 0; i < data.length; i++) {
                        if (genreInput != data[i].genre && genreInput != subgenreInput) {
                            $('#subgenre').append(`<option value="${data[i].genre}">` + data[i].genre + '</option>');
                        }
                    }
                    // write a loop, document.getElementById("subgenre") will clear away its options and replace it with the new ones when an option in document.getElementById("genre") is selected
                    $('#genre').change(function () {
                        const X = document.getElementById("subgenre").value;
                        $('#subgenre').empty();
                        for (var i = 0; i < data.length; i++) {
                            // update genreInput to the selected genre
                            genreInput = document.getElementById("genre").value;
                            document.getElementById("subgenre").value = X;
                            if (data[i].genre != genreInput) {
                                $('#subgenre').append(`<option value="${data[i].genre}">` + data[i].genre + '</option>');
                            }
                        }
                    })
                    $('#subgenre').change(function () {
                        const Y = document.getElementById("genre").value;
                        $('#genre').empty();
                        for (var i = 0; i < data.length; i++) {
                            // update genreInput to the selected genre
                            subgenreInput = document.getElementById("subgenre").value;
                            document.getElementById("genre").value = Y;
                            if (data[i].genre != subgenreInput) {
                                $('#genre').append(`<option value="${data[i].genre}">` + data[i].genre + '</option>');
                            }
                        }
                    })
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
}

function jwt_decode(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

$(document).ready(function () {
    let homeHTML = '';
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const movieContainer = document.getElementById('movieContainer');
    const adminButton = document.getElementById('adminButton');
    const token = localStorage.getItem('token'); // decode the token to get role
    if (token) {
        const decodedToken = jwt_decode(token);
        if (decodedToken.role == 'Admin') {
            adminButton.style.display = 'block';
        }
    }
    fetch('https://sp-movies-backend.herokuapp.com/movies')
        .then(response => response.json())
        .then(data => {
            console.log("Total movies retrieved:", data);
            for (let i = 0; i < data.length; i++) {
                const { movieid, title, genre, time, thumbnail, score, opening_date, description, cast } = data[i];
                homeHTML = `
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" id="container">
                    <div class="video-thumb">
                    <figure class="video-image"><img src="https://sp-movies-backend.herokuapp.com/image/movies/${data[i].thumbnail}" class="movieBanner" alt="Image">
                    <div class="circle-rate">
                        <svg class="circle-chart" viewBox="0 0 30 30"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle class="circle-chart__background" stroke="#2f3439" stroke-width="2" fill="none"
                                cx="15" cy="15" r="14"></circle>
                            <circle class="circle-chart__circle" stroke="lightsalmon" stroke-width="1.5"
                                stroke-dasharray="${score * 20},100" cx="15" cy="15" r="15"></circle>
                        </svg>
                        <b>${score}</b>
                        <div class="age" style="border: 1px solid greenyellow;margin:-80px 0px 0px 0px; color:white">PG13</div>
                        
                    </div>
                    <div class="hd">1080 <b>HD</b>
                    <div class="social-info AdminButtons" style="margin-top:-50px;width:150%;height:150%">
                    <button type="button" style="color:orange;background:transparent" title="Edit" onclick=EditMovie(${movieid})><i class="fa fa-pencil" style="font-size:1.3rem"></i></button>
                    <button type="button" title="Delete" onclick=DeleteMovie(${movieid}); style="color:red;background:transparent"><i class="fa fa-trash" style="font-size:1.3rem"></i></button>
                    </div>
                    </div>
                            </figure>
                            <div class="video-content"> <small class="range">${data[i].time},</small>
                                <ul class="tags">
                                    <li>${data[i].genre}</li>
                                </ul>
                                <h3 class="name"><a href="https://sp-movies.netlify.app/movie.html?movieid=${data[i].movieid}">${data[i].title}</a></h3>
                            </div>
                        </div>
                    </div>
                `;
                // append child

                movieContainer.innerHTML += homeHTML;
            }
            // for each document.getElementByClassName("AdminButtons"), if the user is not an admin, hide the buttons
            const AdminButtons = document.getElementsByClassName("AdminButtons");
            for (let i = 0; i < AdminButtons.length; i++) {
                const decodedToken = jwt_decode(token);
                if (decodedToken.role == 'Admin') {
                    AdminButtons[i].style.display = 'block';
                }
            }

        });
    const searchIcon = document.getElementById('searchIcon');
    searchIcon.addEventListener('click', function () {
        if (searchIcon.className === 'fa fa-search') {
            searchIcon.className = 'fa fa-times';
        }
        else {
            searchIcon.className = 'fa fa-search';
        }
    });
    // search button detect enter pressed
    searchButton.addEventListener('click', function (event) {
        // prevent page from reloading
        event.preventDefault();
        movieContainer.innerHTML = '';
        // send a fetch request to the server to search for the movie
        // first, set the query string to the value of the search input
        const queryString = searchInput.value;
        fetch(`https://sp-movies-backend.herokuapp.com/search?searchText=${queryString}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    movieContainer.innerHTML = `<h1 style="color:red">No results found</h1>`;
                    return;
                }
                console.log("Total movies retrieved after Search:", data);
                // loop through the data and display the movies
                for (let i = 0; i < data.length; i++) {
                    const { movieid, title, genre, time, thumbnail, score } = data[i];
                    homeHTML = `
                        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" id="container">
                            <div class="video-thumb">
                            <figure class="video-image"><img src="https://sp-movies-backend.herokuapp.com/image/movies/${data[i].thumbnail}" class="movieBanner" alt="Image">
                            <div class="circle-rate">
                                <svg class="circle-chart" viewBox="0 0 30 30"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle class="circle-chart__background" stroke="#2f3439" stroke-width="2" fill="none"
                                        cx="15" cy="15" r="14"></circle>
                                    <circle class="circle-chart__circle" stroke="lightsalmon" stroke-width="1.5"
                                        stroke-dasharray="${score * 20},100" cx="15" cy="15" r="15"></circle>
                                </svg>
                                <b>${score}</b>
                                <!-- Delete from favourites/Go to the movie -->
                                <div class="social-info"><button type="button" title="Remove from Favourites" onclick=DeleteFromFavourites(${movieid}); style="border:none;background:transparent"><i class="fa fa-trash"></i></button><a title="Go To" href="https://sp-movies.netlify.app/movie.html?movieid=${movieid}"><i class="fa fa-external-link"></i></a></div>
                                <div class="age" style="border: 1px solid greenyellow;margin:-80px 0px 0px 0px; color:white">PG13</div>
                            </div>
                            <div class="hd">1080 <b>HD</b></div>
                                    </figure>
                                    <div class="video-content"> <small class="range">${data[i].time},</small>
                                        <ul class="tags">
                                            <li>${data[i].genre}</li>
                                        </ul>
                                        <h3 class="name"><a href="https://sp-movies.netlify.app/movie.html?movieid=${data[i].movieid}">${data[i].title}</a></h3>
                                    </div>
                                </div>
                            </div>
                        `;
                    // append to id = movieContainer
                    movieContainer.innerHTML += homeHTML;
                }

            });

    });
});