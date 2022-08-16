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
                            <a href="" class="add-btn" style="background-color:green">+ ADD YOUR LIST</a>
                            <a href="" class="add-btn" style="background-color:#63a4ff">+ ADD Review</a>
                            <div class="rate-box">
                            <a href=""><i class="fa fa-thumbs-up"></i></a> <a href=""><i
                                    class="fa fa-thumbs-down"></i></a> <strong>87% liked this film</strong>
                                    
                        </div>
                        
                            <div style="border:1px solid black;margin:10px;width:50%" >
                            <div class="comment" style="justify-content:center;">
                            <figure class="avatar"><img src="http://localhost:8085/image/terry.jpg" style="width:50px;height:50px;float:left" alt="Image"></figure>
                                <h3>Great Movie</h3>
                                <h4 style="color:navy">-Tommy, 20 April 2022</h4>
                                <h3>Rating: 5/5</h3>
                            </div>
                        </div>
                        <div style="border:1px solid black;margin:10px;width:50%" >
                            <div class="comment" style="justify-content:center;">
                            <figure class="avatar"><img src="http://localhost:8085/image/terry.jpg" style="width:50px;height:50px;float:left" alt="Image"></figure>
                                <h3>Great Movie</h3>
                                <h4 style="color:navy">-Tommy, 20 April 2022</h4>
                                <h3>Rating: 5/5</h3>
                            </div>
                        </div>
                        <div style="border:1px solid black;margin:10px;width:50%" >
                            <div class="comment" style="justify-content:center;">
                            <figure class="avatar"><img src="http://localhost:8085/image/terry.jpg" style="width:50px;height:50px;float:left" alt="Image"></figure>
                                <h3>Great Movie</h3>
                                <h4 style="color:navy">-Tommy, 20 April 2022</h4>
                                <h3>Rating: 5/5</h3>
                            </div>
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
    fetch(`http://localhost:8085/comment/${movieid}`)
        .then(response => response.json(console.log("Comment status code: ", response.status)))
        .then(data => {
            console.log("Comments retrieved:", data);
            if (data.length > 0) {

                for (let i = 0; i < data.length; i++) {
                    const { comment, username, created_on, pic } = data[i];
                    let commentHTML = `
                <li>
                <figure class="avatar"><img src="http://localhost:8085/image/${pic}" alt="Image"></figure>
                <div class="comment">
                <h6>${username}</h6>
                <p>${comment}</p>
                <small>${created_on}</small>
                </div>
            </li>
                `;
                    $('.comments-list').append(commentHTML);

                }
            }
            else {
                let commentHTML = `
                <li>
                <div class="comment">
                <h6>No comments yet</h6>
                <p>Be the first to comment</p>
                </div>
            </li>
                `;
                $('.comments-list').append(commentHTML);
            }
        })
    document.getElementById('commentButton').addEventListener('click', function () {
        // send a post request to add a comment to the movie
        let comment = document.getElementById('comment').value;
        // ensure the comment is not empty
        if (comment == '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to enter a comment',
            })
            return
        }
        let userId = localStorage.getItem('userId');
        fetch(`http://localhost:8085/comment/${movieid}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: comment,
                userID: userId
            })
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    title: 'Comment added',
                    text: 'Your comment has been added!',
                    icon: 'success',
                    confirmButtonText: 'Reload'
                }).then(() => {
                    window.location.reload();
                }).catch(err => alert(err));
            })
            .catch(err => alert(err));
    })

});

