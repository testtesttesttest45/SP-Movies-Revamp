// display out all movies in homepage , from the url http:localhost:8085/movies

$(document).ready(function () {
    let homeHTML = '';
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const movieContainer = document.getElementById('movieContainer');
    fetch('http://localhost:8085/movies')
        .then(response => response.json())
        .then(data => {
            console.log("Total movies retrieved:", data);
            for (let i = 0; i < data.length; i++) {
                const { movieid, title, genre, time, thumbnail, score } = data[i];
                homeHTML = `
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" id="container">
                    <div class="video-thumb">
                    <figure class="video-image" id="here"><img src="http://localhost:8085/image/movies/${data[i].thumbnail}" class="movieBanner" alt="Image">
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
                    <div class="hd">1080 <b>HD</b></div>
                            </figure>
                            <div class="video-content"> <small class="range">${data[i].time},</small>
                                <ul class="tags">
                                    <li>${data[i].genre}</li>
                                </ul>
                                <h3 class="name"><a href="http://localhost:3001/movie.html?movieid=${data[i].movieid}">${data[i].title}</a></h3>
                            </div>
                        </div>
                    </div>
                `;
                // append child
                movieContainer.innerHTML += homeHTML;
            }
        });
    // loop through, if  document.getElementsByID('searchIcon') is clicked, change classname to 'fa fa-times'
    // if document.getElementsByID('searchIcon') is clicked, change classname to 'fa fa-search'
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
        fetch(`http://localhost:8085/search?searchText=${queryString}`)
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
                            <figure class="video-image" id="here"><img src="http://localhost:8085/image/movies/${data[i].thumbnail}" class="movieBanner" alt="Image">
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
                            <div class="hd">1080 <b>HD</b></div>
                                    </figure>
                                    <div class="video-content"> <small class="range">${data[i].time},</small>
                                        <ul class="tags">
                                            <li>${data[i].genre}</li>
                                        </ul>
                                        <h3 class="name"><a href="http://localhost:3001/movie.html?movieid=${data[i].movieid}">${data[i].title}</a></h3>
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