$(document).ready(async () => {
    //$('#homePage').append(renderHomePage());
    $('#content').on("click", "#login", handleRenderLogin);
    $("#signUp").on("click",handleRenderSignUp);
    $('#navBar').on("click", "#wall", handleRenderWall);
    $('#navBar').on("click", "#home", handleRenderHome);

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
                <button class="btn btn-light btn-lg center-block ml-5 w-25" id="signUp">Sign Up</button>
            </div>
        </div>`
}

function handleRenderHome(event){
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#homePage').append(renderHomePage());
}

// render login page
function renderLoginPage() {
    return `<div class="loginbox">
    <img src="icon/teamupicon.png" class="avatar">
    <h1>Login Here</h1>
    <form id = "login-form"  >
        <p>Username</p>
        <input type="text" name="name" placeholder="Enter Username">
        <p>Password</p>
        <input type="password" name="pass" placeholder="Enter Password">
        <button class="btn-dark btn-xs" type="submit" >Login</button>
        <button class="btn btn-link">Don't have an account?</a>
        <div class="field">
            <div class="control">
                <p id="message"></p>
            </div>
    </div>
    </form>
</div>`
}

function handleRenderLogin(event) {
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#loginPage').append(renderLoginPage());
}
function handleRenderSignUp(event) {
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#loginPage').append(renderSignUpPage());
}

// render sign up page
function renderSignUpPage() {
    return  `   
    <div class="wrapper wrapper--w680">
    <div class="card card-1">
    <div class="card-heading"></div>
    <div class="card-body">
        <!-- <h2 class="title">Registration Info</h2> -->
        <form action="http://localhost:3000/account/create" method="POST">
            <div class="row row-space">
                <div class="col--2">
                    <div class="input-group">
                        <input class="input--style-1" type="text" placeholder="FIRST NAME" name="firstname" required>
                    </div>
                </div>
                <div class="col--2">
                    <div class="input-group">
                        <input class="input--style-1" type="text" placeholder="LAST NAME" name="lastname" required>
                    </div>
                </div>
                
            </div>
            <div class="row row-space">
                <div class="col--2">
                   <div class="input-group">
                    <input class="input--style-1" type="text" placeholder="YEAR" name="year" required>
                    </div>
            
                    
                </div>
            
                <div class="col--2">
                    <div class="input-group">
                    <input class="input--style-1" type="text" placeholder="GENDER" name="gender" required>
                    </div>
                </div>
            </div>
            <div class="input-group">
                    <input class="input--style-1" type="email" placeholder="E-Mail" name="name" required>
                </div>
            <div class="input-group">
                <input class="input--style-1" type="password" placeholder="PASSWORD" name="pass" required>
            </div>
            <!-- <div class="input-group">
                <input class="input--style-1" type="password" placeholder="REPEATE PASSWORD" name="repassword">
            </div> -->
            <div class="input-group">
                <input class="input--style-1" type="text" placeholder="SKILLSETS" name="skillsets" required>
            </div>
            <div class="input-group">
                <input class="input--style-1" type="text" placeholder="INTRODUCE YOURSELF" name="bio" required>
            </div>
            
            
            <div class="input-group">
                <input class="input--style-1" type="text" placeholder="MAJOR" name="major" required>
            </div>
        
            <div class="p-t-20">
                <button class="btn btn--radius btn--blue" type="submit">Sign Up</button>
            </div>
        </form>
    </div>
    </div>
</div>
`

}

// render wall of comments
function renderWall() {
    return `<div class="panel">
    <div class="panel-heading">
        <h3 class="panel-title" id="joke"></h3>
    </div>
    <br>
    <div class="panel-body">
        <form class="form-group tweetForm">
            <div class="field">
                <div class="control">
                    <textarea class="form-control" placeholder="Share with us what's on your mind right now?" rows="2"
                        name="body" id="postBox"></textarea>
                    <br>
                </div>
            </div>
            <button class="btn btn-secondary"
                id="postTweet">Post</button>
            <button class="btn btn-secondary"
                id="reload">Refresh</button>
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
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#wallPage').append(renderWall());
    const result = await axios({
        method: 'get',
        url: "http://api.icndb.com/jokes/random?limitTo=[nerdy]"
    })
    $('#joke').append("Do you know that: " + result.data.value.joke);
}

