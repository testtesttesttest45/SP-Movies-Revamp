// display out all movies in homepage , from the url http:localhost:8085/movies

$(document).ready(function () {
    let homeHTML = '';
    fetch('http://localhost:8085/movies')
        .then(response => response.json())
        .then(data => {
            console.log("Total movies retrieved:" ,data);
            for (let i = 0; i < data.length; i++) {
                const { title, genre, time, thumbnail } = data[i];
                homeHTML = `
                <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" id="container">
                    <div class="video-thumb">
                    <figure class="video-image"><a href="#"><img src="http://localhost:8085/image/movies/${data[i].thumbnail}" alt="Image"></a>
                    <div class="circle-rate">
                                    <svg class="circle-chart" viewBox="0 0 30 30" width="100" height="100"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <circle class="circle-chart__background" stroke="#2f3439" stroke-width="2"
                                            fill="none" cx="15" cy="15" r="14"></circle>
                                        <circle class="circle-chart__circle" stroke="#4eb04b" stroke-width="2"
                                            stroke-dasharray="50,100" cx="15" cy="15" r="14"></circle>
                                    </svg>
                                    <b>5.7</b>
                                </div>
                                <div class="hd">1080 <b>HD</b></div>
                            </figure>
                            <div class="video-content"> <small class="range">${data[i].time},</small>
                                <ul class="tags">
                                    <li>${data[i].genre}</li>
                                </ul>
                                <div class="age">PG13</div>
                                <h3 class="name"><a href="">${data[i].title}</a></h3>
                            </div>
                        </div>
                    </div>
                `;
                // append to id = testing
                $('#movieContainer').append(homeHTML);

            }
        });
});