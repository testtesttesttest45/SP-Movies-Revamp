// display out all movies in homepage , from the url http:localhost:8085/movies

$(document).ready(function () {
    let homeHTML = '';
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
                                stroke-dasharray="${score * 20 },100" cx="15" cy="15" r="15"></circle>
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
                $('#movieContainer').append(homeHTML);
            }
        });
    
});