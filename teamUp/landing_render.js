$(document).ready(async() => {
	$('#content').append(renderHomePage());
})

// rendering home page
function renderHomePage(){
	return `<video autoplay id="video-background" class="overlay" muted plays-inline>
            <source src="icon/background-vid.mp4" type="video/mp4">
        </video>

        <!-- logo -->
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
        </div>

        <script>
            document.getElementsByTagName('video')[0].onended = function () {
                this.load();
                this.play();
                };
        </script>`
}

// render login page
function renderLoginPage(){

}

// render sign up page
function renderSignUpPage(){

}

// render wall of comments
function renderWall(){
    
}

