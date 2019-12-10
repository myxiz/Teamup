$(document).ready(async () => {
    $('#homePage').append(renderHomePage());
    $('#content').on("click", "#login", handleRenderLogin);
    $('#signup').on("click", handleRenderSignUp);
    $('#navBar').on("click", "#wall", handleRenderWall);
    $('#navBar').on("click", "#home", handleRenderHome);
    $('#navBar').on("click", "#groupsBtn", handleRenderGroupPage);
    $('#navBar').on("click", "#studentsBtn", handleRenderStudentPage);
    $('#content').on("click", "#noAccount", handleRenderSignUp);
    $('#content').on("click", "#signup", handleRenderSignUp);
    $('#content').on("click", "#signupButton", handleSignup);
    $('#loggedIn').on("click", "#logout", handleLogout);

})



// rendering home page
function renderHomePage() {
    return `<!-- logo -->
        <img class="word-logo" src="icon/TeamUP-word-logo_inverse-color.png">

        <!-- Tagline -->
        <div class="landing-text">
            "TEAMWORK MAKE THE DREAM WORK" - Form your dream team with TEAMUP today!
        </div>
        <br>
        <br>
        <!-- Login buttons -->
        <div class="container">
            <div class="btn-toolbar">
                <button class="btn btn-dark btn-lg center-block mr-5 w-25" id="login">Student Login</button>
                <button class="btn btn-info btn-lg center-block ml-5 w-25" id="signup">Sign Up</button>
            </div>
        </div>`
}

function handleRenderHome(event) {
    if (event) {
        event.preventDefault();
    }
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $("#video").show();
    $('#groupPage').empty();
    $('#signUpFormPage').empty();
    $('#homePage').append(renderHomePage());
    $('video')[0].onended = function () {
        this.load();
        this.play();
    };
}

// render login page
function renderLoginPage() {
    return `<div class="loginbox">
    <img src="icon/teamupicon.png" class="avatar">
    <h1>Login Here</h1>
    <br>
    <form id ="login-form">
        <p>Username</p>
        <input type="text" name="name" placeholder="Enter Username" required autofocus>
        <p>Password</p>
        <input type="password" name="pass" placeholder="Enter Password" required>

        <div class="field">
            <div class="control">
                <button class="btn-dark btn-xs" type="submit">Login</button>
                <button class="btn btn-link" id="noAccount">Don't have an account?</a>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <p id="message"></p>
            </div>
        </div>
    </form>
</div>`
}


function handleRenderLogin(event) {
    event.preventDefault();
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#groupPage').empty();
    $('#signUpFormPage').empty();
    $('#loginPage').append(renderLoginPage());

    const $form = $('#login-form');


    $form.submit(function (e) {
        e.preventDefault();
        // retrieve data from login form
        const data = $form.serializeArray().reduce((accumulator, x) => {
            accumulator[x.name] = x.value;
            return accumulator;
        }, {});
        // call login function
        logInRequest(data);
    });
}


async function logInRequest(data) {
    const $message = $('#message');
    $message.html('');
    $.ajax({
        url: 'http://localhost:3000/account/login',
        type: 'POST',
        data,
    }).then((res) => {
        $message.html(`<span class="has-text-success">Success! You are now logged in.</span>`);
        // Store the jwt token from the response to use it later on for authorization 
        localStorage.setItem('jwt', res.jwt);
        handleRenderGroupPage();
        // Call the rerenderFunction (to be written) to show GroupPage including a logoff button in navbar
        //rerender();
        /* This is just parked here. To access the stored token use this line 
        let jwt = localStorage.getItem('jwt'); 
        and put it then into an authorization bearer header*/

        // TO DO: put replace/ rerender call here (e.g. wall page with log out user button)
        // window.location.replace("http://localhost:3000/index.html")
    }).catch(() => {
        $message.html('<span class="has-text-danger">Something went wrong and you were not logged in. Check your email and password and your internet connection.</span>');
    });
}



// render sign up page
function renderSignUpPage() {
    return `
    <br>
    <form  class="form-horizontal" role="form" id="signupForm" >
        <div class="form-row">
            <div class="col form-group">
                <label>First name </label>   
                <input type="text" class="form-control" name="firstName">
            </div> <!-- form-group end.// -->
            <div class="col form-group">
                <label>Last name</label>
                    <input type="text" class="form-control" name="lastName">
            </div> <!-- form-group end.// -->
        </div>
        <div class="form-row">
            <div class = "col form-group">
            
                <label>Gender</label>
                <select id="inputGender" class="form-control" name="gender">
                <option> Choose...</option>
                <option>Female</option>
                <option>Male</option>
                </select>
            </div> <!-- form-group end.// -->

            
            <div class="col form-group">
                <label>Username</label>
                    <input type="text" class="form-control" name="name">
            </div> <!-- form-group end.// -->
        </div> <!-- form-row end.// -->

   
        
        <div class="form-row">
            <div class="form-group col-md-6">
                <label>Major</label>
                <input type="text" class="form-control" name="major">
            </div> <!-- form-group end.// -->
            <div class="form-group col-md-6">
                <label>Year</label>
                <select id="inputYear" class="form-control" name="year">
                <option> Choose...</option>
                <option>Freshman</option>
                <option>Sophomore</option>
                <option selected="">Junior</option>
                <option>Senior</option>
                </select>
            </div> <!-- form-group end.// -->
        </div> <!-- form-row.// -->

        <div class="form-group">
            <label for="bio">Description/Bio</label>
                <textarea class="form-control" rows="2" id="bio" type= "textarea" name="bio"></textarea>
            <small class="form-text text-muted">Be creative, be yourself ;)</small>
        </div>
        <div class="form-group">
        <label>Email address</label>
            <input type="email" class="form-control" name="email">
        <small class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>

        <div class="form-group">
            <label>Create password</label>
            <input class="form-control" type="password" name="pass">
        </div> <!-- form-group end.// -->  
        <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block" id="signupButton"> Sign up  </button>
        </div> <!-- form-group// -->      
        <small class="text-muted">By clicking the 'Sign Up' button, you confirm that you accept our <br> Terms of use and Privacy Policy.</small>                                          
        <div class="field">
            <div class="control">
                <p id="message"></p>
            </div>
        </div>    
    </form>`
}

function handleRenderSignUp(event) {
    event.preventDefault();
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#groupPage').empty();
    $('#signUpFormPage').append(renderSignUpPage());

}


async function handleSignup(event) {
    event.preventDefault();
    let form = event.currentTarget.closest("#signupForm");

    let data = $(form).serializeArray().reduce((acc, x) => {
        acc[x.name] = x.value;
        return acc;
    }, {});
    let $message = $('#message');
    // console.log(formData);

    $.ajax({
        url: 'http://localhost:3000/account/create',
        type: 'POST',
        data,
        // xhrFields: {
        //     withCredentials: true,
        // },
    }).then((res) => {
        logInRequest(data);
        accountDataCreate(data);
    }).catch((res) => {
        $message.html('<span class="has-text-danger">Something went wrong and you were not signed up.</span>');
    }).then();

}

async function accountDataCreate(data) {
    let $message = $('#message');
    axios
        .post(`http://localhost:3000/private/users/${data.name}`, {
            data: {
                'firstname': data.firstname,
                'lastname': data.lastname,
                'email': data.email,
                'gender': data.gender,
                'year': data.year,
                'bio': data.bio,
                'major': data.major
            }
        },
            { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } },
        )
        .then(res => console.log(res))
        .catch(err => {
            console.log(err);
            $message.html('<span class="has-text-danger">Something went wrong when store the info.</span>');
        }
        );

}

// render wall of comments
function renderWall() {
    return `<div class="panel">
    <div class="panel-heading">
        <h3 class="panel-title" id="joke"></h3>
    </div>
    <br>
    <div class="panel-body">
        <form class="form-group tweetForm" id="tweetForm">
            <div class="field">
                <div class="control">
                    <textarea class="form-control" placeholder="Share with us what's on your mind right now?" rows="2"
                        name="body" id="postBox"></textarea>
                    <br>
                </div>
            </div>
            <div class="field">
                <div class="control">
                <button class="btn-dark btn" type="submit">Post</button>
                </div>
            </div>
        </form>

        <div class="clearfix"></div>
        <hr class="margin-bottom-10">

        <br>
        <ul class="list-unstyled" id="tweetStream">
            <!-- tweets will be rendered here dynamically, see handleRenderWall -->
        </ul>
        <span class="text-info">COMP426 Exclusive</span>
    </div>
</div>`
}

function renderWallPost(post, i) {
    let timeDiff = diff_minutes(Date.now(), new Date(post.data.date));
    return `
    <li class="media" id="${i}">
        <img class="mr-3 rounded resizeImg" src="icon/avatar.png" alt="Avatar">
        <div class="media-body">
            <h5 class="mt-0 mb-1">Anonymous <small>${timeDiff}m</small></h5>
            ${post.data.text}
        </div>
    </li><br>`
}

// delete the post from backend
async function handleDeleteWallPost(event) {
    const result = await axios({
        method: 'delete',
        url: 'http://localhost:3000/public/delete/i',
    });
    return result;
}


// callback function to render Wall
async function handleRenderWall(event) {
    event.preventDefault();
    $('#loginPage').empty();
    $('#signUpFormPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#groupPage').empty();
    $('#studentPage').empty();
    $('#wallPage').append(renderWall());


    // integration to fetch joke from 3rd party API
    const result = await axios({
        method: 'get',
        url: "http://api.icndb.com/jokes/random?limitTo=[nerdy]"
    })
    $('#joke').append("Just for the giggles: " + result.data.value.joke);


    // call getWallPosts function and forward result to renderPost function
    const posts = await getWallPosts();
    console.log(posts);
    for (let i = 0; i < Object.keys(posts).length; i++) {
        //console.log(posts[i]);
        $('#tweetStream').prepend(renderWallPost(posts[i], i));
    }


    // Public: conduct post to wall
    const $form = $('#tweetForm');
    $form.submit(function (e) {
        e.preventDefault();

        const data = $form.serializeArray().reduce((accumulator, x) => {
            accumulator[x.name] = x.value;
            return accumulator;
        }, {});

        $.ajax({
            url: 'http://localhost:3000/public/wallposts',
            type: 'POST',
            data,
        }).then((res) => {
            console.log(res.post);
            $('#tweetStream').prepend(renderWallPost(res.post));
            $('#postBox').replaceWith(`<textarea class="form-control" placeholder="Share with us what's on your mind right now?" rows="2"
            name="body" id="postBox"></textarea>`);
            // TO DO: put replace/ rerender call here (e.g. wall page with updated post
            // window.location.replace("http://localhost:3000/index.html")
        }).catch(() => {
        });
    });
}


// call to get wallposts
async function getWallPosts() {
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3000/public/wallposts',
    });
    return result.data.posts;
};


// render group page
function renderGroupPage() {
    return `<div class="background"></div>
    <div class="container">
        <p class="text">Team up with someone today!</p>
        <!-- Search form -->
        <form class="form-inline ">
          <input class="form-control form-control-sm ml-3 w-50" type="text" placeholder="Search"
            aria-label="Search">
          <i class="fas fa-search ml-3" aria-hidden="true"></i>
        </form>   
        </p>
        <div class="row">
            <div class="col-sm">
                <div class="card" style="width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">Max Barth</h5>
                        <p class="card-text">I am an easy going exchange student from Germany.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Gender: <i class="fa fa-mars fa-lg"></i></li>
                        <li class="list-group-item">Year: Second Year Grad School</li>
                        <li class="list-group-item">Major: Computer Science</li>
                        <li class="list-group-item">Relevant Skills: Java, Machine Learning</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Facebook</a>
                        <a href="#" class="card-link">Email</a>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card" style="width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">Bolin Zhu</h5>
                        <p class="card-text">I am interested in utilizing data and analytics to enhance the UNC
                            experience for students.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Gender: Male</li>
                        <li class="list-group-item">Year: Junior</li>
                        <li class="list-group-item">Major: Business Analytics</li>
                        <li class="list-group-item">Relevant Skills: Python, HTML, Javascript, CSS</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Facebook</a>
                        <a href="#" class="card-link">Email</a>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card" style="width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">Josh Evans</h5>
                        <p class="card-text">Born and rasied in North Carolina! Finding teammates to solve real problems
                            for students</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Gender: Male</li>
                        <li class="list-group-item">Year: Senior</li>
                        <li class="list-group-item">Major: Economics</li>
                        <li class="list-group-item">Relevant Skills: Java, Data Structures and Algorithms</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Facebook</a>
                        <a href="#" class="card-link">Email</a>
                    </div>
                </div>
            </div>
        </div>
        <br>

        <div class="row">
            <div class="col-sm">
                <div class="card" style="width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">Ignacio Piera</h5>
                        <p class="card-text">I am from Spain! I care a lot about more grades so you can rely on me to
                            work very hard over the sem!</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Gender: Male</li>
                        <li class="list-group-item">Year: First Year Grad School</li>
                        <li class="list-group-item">Major: Applied Mathematics</li>
                        <li class="list-group-item">Relevant Skills: </li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Facebook</a>
                        <a href="#" class="card-link">Email</a>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card" style="width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">Alberto Esquivias</h5>
                        <p class="card-text">I am a fun and lovable person to work with! Let's develop something and
                            create new memories ;)!</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Gender: Male</li>
                        <li class="list-group-item">Year: Junior</li>
                        <li class="list-group-item">Major: Information System</li>
                        <li class="list-group-item">Relevant Skills: HTML5, CSS, JavaScript</li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Facebook</a>
                        <a href="#" class="card-link">Email</a>
                    </div>
                </div>
            </div>

            <div class="col-sm">
                <div class="card" style="width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">Molly Yu</h5>
                        <p class="card-text">I am from Copenhagen, looking forward to meet and work with cool people.
                        </p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Gender: Female</li>
                        <li class="list-group-item">Year: First Year Grad School</li>
                        <li class="list-group-item">Major: Information System</li>
                        <li class="list-group-item">Relevant Skills: C++ </li>
                    </ul>
                    <div class="card-body">
                        <a href="#" class="card-link">Facebook</a>
                        <a href="#" class="card-link">Email</a>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
    </div>
    `
}

// render student page
function renderStudentPage() {
    $("#studentPage").append(`<div class="background"></div>
    <div class="container">
        <p class="text">Team up with someone today!</p>
        
        <div id="myDIV" class="header">
        <h2>My To Do List</h2>
        <br>
        <form id="toDo-form">
        <input type="text" name="toDo" id="myInput" placeholder="To do...">
        <button type="button" id="addToDoButton">Add</button>
        </form>
        </div>

        <ul class="list-group list-group-flush" id="toDoList">
            
        <!-- to be inserted dynamically -->
        <!-- maybe a functino called renderToDoList()-->

            <li class="list-group-item">Proposal due October 12th <button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</button></li>
            
            <li class="list-group-item">Mockup due October 31st <button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</li>

            <li class="list-group-item">15% Video due December 10th <button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</li>

            <li class="list-group-item">15% Presentation/Expo due December 12th<button type="button" class="btn btn-primary btn-lg pull-right" id="deleteToDoButton">Delete</li>

        </ul>`)

    // async function to get all the students and render student cards individually using renderStudentCard(student)

    // getName() should return name of the logged in user
    let ownName = getName();

    // Using ownName, locate informmation for the logged in user

    //reach row puts three students
    // insert 3 into each time `<div class="row"></div>`
}

function renderOwnStudentCard(student) {
    return `<div class="col-sm" id="ownCard">
    <div class="card" style="width: 20rem;">
        <div class="card-body">
            <h5 class="card-title lead">Max Barth</h5>
            <p class="card-text">I am an easy going exchange student from Germany.</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Gender: <i class="fa fa-mars fa-lg"></i></li>
            <li class="list-group-item">Year: Second Year Grad School</li>
            <li class="list-group-item">Major: Computer Science</li>
            <li class="list-group-item">Relevant Skills: Java, Machine Learning</li>
        </ul>
        <div class="card-body">
            <button type="button" class="btn btn-primary btn-lg btn-block">Edit</button>
        </div>
    </div>
</div>`
}


function renderStudentCard(student) {
    return `<div class="col-sm">
    <div class="card" style="width: 20rem;">
        <div class="card-body">
            <h5 class="card-title">Alberto Esquivias</h5>
            <p class="card-text">I am a fun and lovable person to work with! Let's develop something and
                create new memories ;)!</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Gender: Male</li>
            <li class="list-group-item">Year: Junior</li>
            <li class="list-group-item">Major: Information System</li>
            <li class="list-group-item">Relevant Skills: HTML5, CSS, JavaScript</li>
        </ul>
        <div class="card-body">
            <a href="#" class="card-link">Facebook</a>
            <a href="#" class="card-link">Email</a>
        </div>
    </div>
</div>`
}

// function that is called once user is logged on to render new group page
function handleRenderGroupPage() {
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#signUpFormPage').empty();
    $('#studentPage').empty();
    $('#video').hide();
    $('#homeDiv').hide();
    $('#loggedIn').show();
    $('#groupsDiv').show();
    $('#studentsDiv').show();
    $('#groupPage').append(renderGroupPage());
}

// function that is called once user clicks students in navbar
function handleRenderStudentPage() {
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#signUpFormPage').empty();
    $('#groupPage').empty();
    $('#video').hide();
    $('#homeDiv').hide();
    $('#loggedIn').show();
    $('#groupsDiv').show();
    $('#studentsDiv').show();
    $('#studentPage').append(renderStudentPage());
}

// function that is called after click on logout button
function handleLogout() {
    localStorage.removeItem('jwt');
    $('#loggedIn').hide();
    $('#groupsDiv').hide();
    $('#studentsDiv').hide();
    $('#homeDiv').show();
    handleRenderHome();
}


// helper function to calc the time difference
function diff_minutes(datenow, tweetTS) {
    let diff = (datenow - tweetTS) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}
