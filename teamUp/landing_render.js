$(document).ready(async () => {
    $('#homePage').append(renderHomePage());
    $('#content').on("click", "#login", handleRenderLogin);
    $("#signup").on("click", handleRenderSignUp);
    $('#navBar').on("click", "#wall", handleRenderWall);
    $('#navBar').on("click", "#home", handleRenderHome);
    $('#content').on("click", "#noAccount", handleRenderSignUp);
    $('#content').on("click", "#signupButton", handleSignup);

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
    event.preventDefault();
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $("#video").show();
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


async function logInRequest(data){
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
            // let jwt = localStorage.getItem('jwt'); 
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
    <form class="form-horizontal" role="form" id="signupForm">
    <div class="form-row">
        <div class="col form-group">
            <label>First name </label>   
              <input type="text" class="form-control" name="firstName">
        </div> <!-- form-group end.// -->
        <div class="col form-group">
            <label>Last name</label>
              <input type="text" class="form-control" name="lastName">
        </div> <!-- form-group end.// -->

        <div class="col form-group">
                <label>Username</label>
                <input type="usernmae" class="form-control" name="userName">
            </div> <!-- form-group end.// -->
    </div> <!-- form-row end.// -->

    <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control" name="email">
            <small class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        
    <div class="form-group">
            <label class="col-sm-3 control-label">
                <input class="form-control" type="radio" name="gender" value="Male">
                <span class="form-check-label"> Male </span>
            </label>
            <label class="col-sm-3 control-label">
                <input class="form-control" type="radio" name="gender" value="Female">
                <span class="form-check-label"> Female</span>
            </label>
        </div><!-- form-group end.// -->
    <div class="form-row">
        <div class="form-group col-md-6">
          <label>Major</label>
          <input type="text" class="form-control" name="major">
        </div> <!-- form-group end.// -->
        <div class="form-group col-md-6">
          <label>Year</label>
          <select id="inputState" class="form-control" name="year">
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
        <textarea class="form-control" rows="2" id="bio" name="bio"></textarea>
        <small class="form-text text-muted">Be creative, be yourself ;)</small>

      </div>

    <div class="form-group">
        <label>Create password</label>
        <input class="form-control" type="password2" name="password">
    </div> <!-- form-group end.// -->  
    <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block" id="signupButton"> Sign up  </button>
    </div> <!-- form-group// -->      
    <small class="text-muted">By clicking the 'Sign Up' button, you confirm that you accept our <br> Terms of use and Privacy Policy.</small>                                          
</form>`
}

function handleRenderSignUp(event) {
    event.preventDefault();
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#loginPage').append(renderSignUpPage());
}

// Please help me postformData onto our server
async function handleSignup(event) {
    event.preventDefault();
    let form = event.currentTarget.closest("#signupForm");

    let formData = $(form).serializeArray().reduce((acc, x) => {
        acc[x.name] = x.value;
        return acc;
    }, {});

    console.log(formData);

    const result = await axios({
        method: 'post',
        url: "http://localhost:3000/account/create",
        data: {
            "name": "bolinZ",
            "pass": "123456"
        }
    })



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
                <button class="btn-dark btn-xs" type="submit">Post</button>
                </div>
            </div>
        </form>

        <div class="clearfix"></div>
        <hr class="margin-bottom-10">

        <ul class="list-group list-group-dividered list-group-full" id="tweetStream">

        </ul>
        <span class="text-info">COMP426 Exclusive</span>
    </div>
</div>`
}

async function handleRenderWall(event) {
    event.preventDefault();
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#wallPage').append(renderWall());

    // 3rd party integration - fetch joke from API
    const result = await axios({
        method: 'get',
        url: "http://api.icndb.com/jokes/random?limitTo=[nerdy]"
    })
    $('#joke').append("Do you know that: " + result.data.value.joke);


    // TO DO: read tweets to render them on the wall

    // Public post to wall
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
            // TO DO: put replace/ rerender call here (e.g. wall page with log out user button)
            // window.location.replace("http://localhost:3000/index.html")
        }).catch(() => {
        });
    });
}





// render group page
function renderGroupPage() {
    return `<div class="background"></div>
    <div class="container">
        <p class="text">Team up with someone today!</p>
        <div class="row">
            <div class="col-sm">
                <div class="card" style="width: 20rem;">
                    <div class="card-body">
                        <h5 class="card-title">Max Barth</h5>
                        <p class="card-text">I am an easy going exchange student from Germany.</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Gender: Male</li>
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

function handleRenderGroupPage() {
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $("#video").hide();
    $('#groupPage').append(renderGroupPage());
    
    
}

