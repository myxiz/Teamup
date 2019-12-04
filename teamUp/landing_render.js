$(document).ready(async () => {
    $('#homePage').append(renderHomePage());
    $('#content').on("click", "#login", handleRenderLogin);
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
    <img src="icon/avatar.png" class="avatar">
    <h1>Login Here</h1>
    <form>
        <p>Username</p>
        <input type="text" name="" placeholder="Enter Username">
        <p>Password</p>
        <input type="password" name="" placeholder="Enter Password">
        <button class="btn-dark btn-xs">Login</button>
        <button class="btn btn-link">Don't have an account?</a>
    </form>
</div>`
}

function handleRenderLogin(event) {
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#loginPage').append(renderLoginPage());
}

// render sign up page
function renderSignUpPage() {

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
    console.log(result);
    $('#joke').append("Do you know that: " + result.data.value.joke);
}

