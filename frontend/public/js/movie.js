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
                            <button id="reviewButton" type="button" class="add-btn" style="background-color:#63a4ff">+ ADD Review</button>
                            <div class="rate-box">
                            <a href=""><i class="fa fa-thumbs-up"></i></a> <a href=""><i
                                    class="fa fa-thumbs-down"></i></a> <strong>87% liked this film</strong>
                                    
                        </div>
                        <div id="reviewWrapper"></div>
                        
                        
                           
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
            document.getElementById('reviewButton').addEventListener('click', function () {
                let userId = localStorage.getItem('userId');
                let movieId = movieid;
                // when clicked, open the Swal form where user will enter a rating and a review
                Swal.fire({
                    title: 'Add Review',
                    html: `
                    <form id="reviewForm">
                        <div class="form-group">
                            <label for="rating">Rating</label>
                            <input type="number" class="form-control" id="rating" min="0" max="5" placeholder="Enter rating out of 5">
                        </div>
                        <div class="form-group">
                            <label for="review">Review</label>
                            <textarea class="form-control" id="review" rows="3"></textarea>
                        </div>
                    </form>
                    `,
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Submit',
                    cancelButtonText: 'Cancel',
                }).then((result) => {
                    if (result.value) {
                        console.log("clocied")
                        // when user clicks submit, get the values of the form and send them to the server
                        let rating = parseInt($('#rating').val());
                        let review = $('#review').val();
                        console.log(data);
                        fetch(`http://localhost:8085/review/${movieId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userID: userId,
                                rating: rating,
                                review: review
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            Swal.fire({
                                title: 'Review Added',
                                text: 'Your review has been added',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                            .then(() => {
                                window.location.reload();
                            })
                        }).catch(err => {
                            Swal.fire({
                                title: 'Error',
                                text: 'Something went wrong',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            })
                        })

                    }
                })
            });
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
    });

    fetch(`http://localhost:8085/review/${movieid}`) // get the reviews of the movie
        .then(response => response.json())
        .then(data => {
            console.log("Reviews retrieved:", data);
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    const { rating, review, username, created_on, pic } = data[i];
                    let reviewHTML = `
                    <div style="border:1px solid black;margin:10px;width:50%;background:rgb(40, 42, 43);border-radius:10px">
                    <div class="comment" style="justify-content:center;">
                    <figure class="avatar"><img src="http://localhost:8085/image/${pic}" style="width:70px;height:70px;float:left" alt="Image"></figure>
                        <h3 style="color:white;font-weight:bolder">${review}</h3>
                        <h4 style="color:orange">-${username}, ${created_on}</h4>
                        <h4 style="color:white">Rating: <svg class="circle-chart" viewBox="0 0 30 30" margin-bottom="-15px" width="50" height="50"
                        xmlns="http://www.w3.org/2000/svg"   style="margin-bottom:-12px;">
                        <circle class="circle-chart__background" stroke="#2f3439" stroke-width="2"
                            fill="none" cx="15" cy="15" r="14"></circle>
                        <circle class="circle-chart__circle" stroke="gold" stroke-width="2"
                            stroke-dasharray="${rating * 20},100" cx="15" cy="15" r="14"></circle>  
                            <b style="margin-left:-40px">${rating}/5</b>
                        </svg>   
                        
                        </h4>
                    </div>
                    </div>
                
                `;
                    $('#reviewWrapper').append(reviewHTML);
                }
            }
            else {
                let reviewHTML = `
                <li>
                <div class="comment">
                <h6>No reviews yet</h6>
                <p>Be the first to review</p>
                </div>
            </li>
                `;
                $('.reviews-list').append(reviewHTML);
            }
        }).catch(err => alert(err));
    

});

