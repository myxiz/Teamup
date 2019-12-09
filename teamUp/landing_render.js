$(document).ready(async () => {
    $('#homePage').append(renderHomePage());
    $('#content').on("click", "#login", handleRenderLogin);
    $("#signup").on("click",handleRenderSignUp);
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

function handleRenderHome(event){
    event.preventDefault();
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
        <button class="btn btn-link" id="noAccount">Don't have an account?</a>
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
}

// render sign up page
function renderSignUpPage() {
    return  `
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
                <select id="inputState" class="form-control" name="gender">
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
    </form>`
}

function handleRenderSignUp(event) {
    event.preventDefault();
    $('#loginPage').empty();
    $('#wallPage').empty();
    $('#homePage').empty();
    $('#loginPage').append(renderSignUpPage());
    const $form = $('#signupForm');
    let $submit = $('#signupButton')
    // const $message = $('#message');


}


async function handleSignup(event){
    event.preventDefault();
    let form = event.currentTarget.closest("#signupForm");

    let data = $(form).serializeArray().reduce((acc, x)=> {
        acc[x.name] = x.value;
        return acc;
    }, {});
    
    // console.log(formData);
      
    $.ajax({
        url: 'http://localhost:3000/account/create',
        type: 'POST',
        data,
        // xhrFields: {
        //     withCredentials: true,
        // },
      }).then((res) => {
       alert(res.msg);
      }).catch((res) => {
        alert(JSON.stringify(res.status))
      });

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
    event.preventDefault();
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


