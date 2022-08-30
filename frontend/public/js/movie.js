// display out all movies in homepage , from the url http:localhost:8085/movie/:movieid


$(document).ready(function () {
    let queryParams = new URLSearchParams(window.location.search); // or you can also use window.location.search.split('=')[1];
    let movieid = queryParams.get('movieid');
    let movieHTML = '';
    let userId = localStorage.getItem('userId');
    let commentButton = document.getElementById('commentButton');

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
                                        <svg class="circle-chart" viewBox="0 0 30 30"
                                            fill="transparent" xmlns="http://www.w3.org/2000/svg">
                                            <circle class="circle-chart__background" stroke="#eee" stroke-width="2"
                                                fill="none" cx="15" cy="15" r="14"></circle>
                                            <circle class="circle-chart__circle" stroke="#4eb04b" stroke-width="2"
                                                stroke-dasharray="87,100" cx="15" cy="15" r="14"></circle>
                                        </svg>
                                        <b>4.7</b> Total rating
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
                            <button id="favouriteButton" type="button" class="add-btn" style="background-color:green">+ ADD TO FAVOURITES</a>
                            <button id="reviewButton" type="button" class="add-btn" style="background-color:#63a4ff">+ ADD REVIEW</button>
                        <h4 class="reviewStatus" style="margin-top:10px;color:red">Displaying lastest 3 reviews.</h4>
                        <div id="reviewWrapper"></div>
                        </div>
                    </div>
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
                    </div>
                `;
            // append to id = movieContainer
            $('#movieContainer').append(movieHTML);
            $('title').text(`SP Movies | ${title}`); // replace the title of the page with the title of the movie
            $('#movie-poster').attr('poster', `http://localhost:8085/image/movies/${thumbnail}`); // replace the poster of the page with the poster of the movie
            const reviewButton = document.getElementById('reviewButton');
            reviewButton.addEventListener('click', function () {
                let movieId = movieid;
                if (!userId) {
                    Swal.fire({
                        title: 'Please login first to add review',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                    return;
                }
                // when clicked, open the Swal form where user will enter a rating and a review
                fetch(`http://localhost:8085/review/${movieId}`)
                    .then(response => response.json())
                    .then(data => {
                        // loop through the array and check the userid. if data[i].user_id == userId, show alert: You have already reviewed this movie, and dont show the form
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].user_id == userId) {
                                Swal.fire({
                                    title: 'You have already reviewed this movie',
                                    icon: 'warning',
                                    confirmButtonText: 'OK'
                                });
                                return;
                            }
                        }
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
                                // when user clicks submit, get the values of the form and send them to the server
                                let rating = parseInt($('#rating').val());
                                let review = $('#review').val();
                                if (isNaN(rating) || rating < 0 || rating > 5 || review == '') {
                                    Swal.fire({
                                        title: 'Please enter a valid rating or review!',
                                        icon: 'warning',
                                        confirmButtonText: 'OK'
                                    });
                                    return;
                                }
                                fetch(`http://localhost:8085/review/${movieId}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
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
                    })
            });
            const favouriteButton = document.getElementById('favouriteButton');
            if (userId) {
                fetch(`http://localhost:8085/favourite/${movieid}?userId=${userId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log("isFavourite?", data);
                        if (data.length > 0) {
                            favouriteButton.textContent = '- REMOVE FROM FAVOURITES';
                            favouriteButton.style.backgroundColor = '#ff5776'; // pink
                            favouriteButton.addEventListener('click', function () {
                                if (!userId) {
                                    Swal.fire({
                                        title: 'Please login first to add to favourites',
                                        icon: 'warning',
                                        confirmButtonText: 'OK'
                                    })
                                    return;
                                }
                                // when clicked, remove the movie from the favourites list by using the delete api
                                fetch(`http://localhost:8085/favourite/${movieid}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    },
                                    body: JSON.stringify({
                                        userId: localStorage.getItem('userId')
                                    })
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        Swal.fire({
                                            title: 'Removed from Favourites',
                                            text: 'This movie has been removed from your favourites',
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

                            });
                        }
                        else {
                            favouriteButton.addEventListener('click', function () {
                                fetch(`http://localhost:8085/favourite/${movieid}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    },
                                    body: JSON.stringify({
                                        userId: localStorage.getItem('userId'),
                                        favourite: 1,
                                    })
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        Swal.fire({
                                            title: 'Added to favourites',
                                            text: 'This movie has been added to your favourites',
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
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            } else {
                favouriteButton.addEventListener('click', function () {
                    Swal.fire({
                        title: 'Please login first to add to favourites',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                    return;
                });
            }


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
                <figure class="avatar"><img src="http://localhost:8085/image/${pic}" alt="Image"  class="rounded-circle"></figure>
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
    commentButton.addEventListener('click', function () {
        let userId = localStorage.getItem('userId');
        // if (!userId) {
        //     Swal.fire({
        //         title: 'Please login first to add comments',
        //         icon: 'warning',
        //         confirmButtonText: 'OK'
        //     })
        //     return;
        // }
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
        fetch(`http://localhost:8085/comment/${movieid}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                comment: comment,
                userID: userId
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 403) {
                    throw new Error('Unauthorized');
                } // else
                throw new Error('Something big went wrong');
            })
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
            .catch(err => {
                // console.warn(err) // Example is Error: Unauthorized
                Swal.fire({
                    title: 'Error',
                    text: err.message, // 'Unauthorized'
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            })
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
                    <figure class="avatar"><img src="http://localhost:8085/image/${pic}"  class="rounded-circle" style="width:70px;height:70px;float:left" alt="Image"></figure>
                        <h3 style="color:white;font-weight:bold">${review}</h3>
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

                let x = document.getElementsByClassName('reviewStatus')[0];
                // x will have a font weight of 600 and innerhtml
                x.style.fontWeight = "600";
                x.style.marginTop = "30px";
                x.innerHTML = "No reviews yet. Be the first to review!";
                // $('#reviewWrapper').append(reviewHTML);
            }
        }).catch(err => alert(err));


});

