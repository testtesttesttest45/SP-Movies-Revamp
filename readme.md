

# **SP MOVIES SELF LEARNING PROJECT**
#### This is a self learning project done during my free hours for the SP Movies app, which I got a score of 10/100. It is completed and no longer maintained.
``` Project started on 15 August 2022 and completed/hosted successfully on 4 September 2022.```
#### This project is made with 
> Javascript
> MySQL
> CSS
> HTML
>> jQuery, Bootstrap


___


## To run the project:

1. Clone the repository
2. Execute **dumpfile_new.sql** in MySQL database to create the database schema and tables  
3. Go backend folder and Run `npm install` to install all the dependencies
4. Run `npm start` to start the backend server
5. Go frontend folder and Run `npm install` to install all the dependencies
6. Run `npm start` to start the frontend server
7. Open the browser and go to `https://sp-movies.netlify.app` to view the app
___

### Pre-registered accounts:

| Email | Password | User Role |
| ------ | ----------- | ----------- |
| _mary@email.com_   | _password_ | _Customer_ |
| _admin@email.com_ | _password_ |    _Admin_ |

___

### Project includes:

+ Guest, Customer and Admin user roles
+ Guest operations include
    - Viewing movies on the homepage
    - Searching for movies with server side filtering
    - Viewing movie details on a movie page
    - Viewing the actual movie trailer on a movie page
    - Viewing comments on a movie page
    - Viewing ratings and reviews on a movie page
+ Customer operations include
    - All `Guest Operations`
    - Adding/Removing movies to/from the favourite list
    - Adding/Removing reviews and ratings for a movie
    - Leaving comments on a movie page
    - Viewing Profile page
    - Viewing the favourite list on Profile page
    - Account settings such as editing profile, changing password,     deleting account, requesting Admin role on Profile page, changing profile picture, etc
    - Deleting/Going to the movie page from list of favourite movies on Profile page
+ Admin operations include
    - All `Guest Operations`
    - All `Customer Operations`
    - Editing/Removing movies from the homepage/database
    - Administrations page
      * Adding movies
        * List of genres to choose from are fetched from the database, with proper options listed out
      * Adding genres, deleting/editing genres
      * Managing users operations such as promoting/demoting user roles, deleting users, etc
      * ~~Exciting _**Birdwatch**_ view with 2 responsive buttons to control the birds~~
+ Image upload for profile picture and movie poster with Multer
+ Proper global error handling with custom stylish alerts
+ Proper input validation
+ Protection from Broken Access Control and SQL Injection
___

### Project drawbacks:

+ Vulnerable to some attacks (I did not focus on security for this project)
  - Broken Authentication
    * Poor storage of authentication tokens
    * Tokens never expires
  - Sensitive Data Exposure
    * Passwords are stored in plain text
    * No encryption of sensitive data such as password
    * Possible Cross-Site Scripting (XSS) attacks
    * Lack of CSRF protection
  - Security Misconfiguration
    * Many security headers are not set
  - No logging/monitoring
+ A few pages are not designed properly
+ Does not have search for movies by genre
+ No pagination
+ No sorting
+ Application may look strange on mobile devices
+ No input validations for areas such as movie date, duration, comments, reviews, etc


___



### Links


Link to hosted application: ``` https://sp-movies.netlify.app ```


>### **Important notes**
> **Going to this link is rather buggy. Some errors occur with multer image upload, along with other bugs such as removing a movie from list of favourites, inconsistency in fetching movie reviews, and possibly more undiscovered. I did not put time to fix these as the backend which is hosted with Heroku and using free products are going away in a few months. The loading of certain pages and elements and data fetching is not consistent as well. This slow data fetching may not allow certain parts of pages to  load properly.**


### Screenshots
![Completions](completion_screenshots/Comments.png)
![Completions](completion_screenshots/Homepage.png)
![Completions](completion_screenshots/InteractiveLogin.png)
![Completions](completion_screenshots/InteractiveSignup.png)
![Completions](completion_screenshots/MoviePage.png)
![Completions](completion_screenshots/MoviePage2.png)
![Completions](completion_screenshots/Search.png)
![Completions](completion_screenshots/Review1.png)
![Completions](completion_screenshots/Review2.png)
![Completions](completion_screenshots/Profile1.png)
![Completions](completion_screenshots/Profile2.png)
![Completions](completion_screenshots/Profile3.png)
![Completions](completion_screenshots/HomePageScoring.png)
![Completions](completion_screenshots/Profile4.png)
![Completions](completion_screenshots/Query.png)
![Completions](completion_screenshots/GuestMode.png)
![Completions](completion_screenshots/EditMovie.png)
![Completions](completion_screenshots/CreateMovie.png)
![Completions](completion_screenshots/AdministratorDashboard.png)
![Completions](completion_screenshots/AddGenre.png)
![Completions](completion_screenshots/EditGenre.png)
![Completions](completion_screenshots/EditRole.png)

___




