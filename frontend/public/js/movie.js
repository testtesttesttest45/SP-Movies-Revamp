// display out all movies in homepage , from the url http:localhost:8085/movie/:movieid

$(document).ready(function () {
    let queryParams = new URLSearchParams(window.location.search); // or you can also use window.location.search.split('=')[1];
    let movieid = queryParams.get('movieid');
    let movieHTML = '';
    fetch(`http://localhost:8085/movie/${movieid}`)
        .then(response => response.json())
        .then(data => {
            console.log("Movie retrieved:", data);
            const { title, description, cast, opening_date, genre, time, thumbnail } = data;
            movieHTML = `
                <div class="col-lg-8">
                        <div class="movie-info-box">
                            <h2 class="name">${title}<br>
                            </h2>
                            <ul class="features">
                                <li>
                                    <div class="rate">
                                        <svg class="circle-chart" viewBox="0 0 30 30" width="40" height="40"
                                            fill="transparent" xmlns="http://www.w3.org/2000/svg">
                                            <circle class="circle-chart__background" stroke="#eee" stroke-width="2"
                                                fill="none" cx="15" cy="15" r="14"></circle>
                                            <circle class="circle-chart__circle" stroke="#4eb04b" stroke-width="2"
                                                stroke-dasharray="87,100" cx="15" cy="15" r="14"></circle>
                                        </svg>
                                        <b>8.7</b> Total rating
                                    </div>
                                    <!-- end rate -->
                                </li>
                                
                                <li>
                                    <div class="hd">1080 <b>HD</b></div>
                                </li>
                                <li>
                                    <div class="tags">${genre}</div>
                                </li>
                            </ul>
                            <p class="description">${description}</p>
                            <a href="#" class="add-btn">+ ADD YOUR LIST</a>

                            <div class="rate-box">
                                <a href=""><i class="fa fa-thumbs-up"></i></a> <a href=""><i
                                        class="fa fa-thumbs-down"></i></a> <strong>87% liked this film</strong>
                            </div>
                        </div>
                        <!-- end movie-info-box -->
                    </div>
                    <!-- end col-8 -->
                    <div class="col-lg-4">
                        <div class="movie-side-info-box">
                            <figure><img src="http://localhost:8085/image/movies/${thumbnail}" alt="Image"></figure>
                            <ul>
                                <li><strong>Release date: </strong> ${opening_date}</li>
                                <li><strong>Cast:</strong> ${cast}</li>
                                <li><strong>Genre:</strong> ${genre}</li>
                                <li><strong>Duration:</strong> ${time}</li>
                            </ul>
                        </div>
                        <!-- end movie-side-info-box -->
                    </div>
                `;
            // append to id = movieContainer
            $('#movieContainer').append(movieHTML);
            $('title').text(`SP Movies | ${title}`); // replace the title of the page with the title of the movie
            $('#movie-poster').attr('poster', `http://localhost:8085/image/movies/${thumbnail}`); // replace the poster of the page with the poster of the movie

        })
        .catch(err => alert(err));




})