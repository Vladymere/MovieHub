// Existing Remember Me functionality
const emailInput = document.querySelector('input[type="text"]');
const rememberMeCheckbox = document.getElementById('rememberMe');

// Check if the user has previously selected "Remember Me"
window.onload = function() {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  const rememberMeChecked = localStorage.getItem('rememberMeChecked');

  if (rememberedEmail) {
    emailInput.value = rememberedEmail; // Pre-fill the email field
  }

  if (rememberMeChecked === 'true') {
    rememberMeCheckbox.checked = true; // Restore "Remember Me" checkbox state
  }
};

// Function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Function to handle form submission (Login form)
function validateForm(event) {
  event.preventDefault(); // Prevent form from submitting

  // Get email and password input values
  const email = emailInput.value;
  const password = document.querySelector('input[type="password"]').value;

  // Check if email or password is empty
  if (email === "" || password === "") {
    alert("Please fill in both the email and password fields.");
    return;
  }

  // Validate email format
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Save email if "Remember Me" is checked
  if (rememberMeCheckbox.checked) {
    localStorage.setItem('rememberedEmail', email); // Save email to localStorage
    localStorage.setItem('rememberMeChecked', 'true'); // Save checkbox state
  } else {
    // Clear email and checkbox state from localStorage if "Remember Me" is unchecked
    localStorage.removeItem('rememberedEmail');
    localStorage.setItem('rememberMeChecked', 'false');
  }

  // If both fields are valid, redirect or show success (simulated)
  alert("Login successful!");

  // Redirect to dashboard (simulated)
  window.location.href = "Dashboard.html";
}

// Attach the form validation to the submit button (Login form)
document.querySelector('#loginForm').addEventListener('submit', validateForm);

// -------------------------------------------------------------
// Forgot Password functionality
// -------------------------------------------------------------

// Get forgot password form elements
const loginForm = document.getElementById('loginForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const backToLoginLink = document.getElementById('backToLogin');
const resetEmailInput = document.getElementById('resetEmail');

// Show Forgot Password form when "Forgot Password" link is clicked
forgotPasswordLink.addEventListener('click', function(event) {
  event.preventDefault();
  loginForm.classList.add('hidden'); // Hide login form
  forgotPasswordForm.classList.remove('hidden'); // Show forgot password form
});

// Show Login form when "Back to Login" link is clicked
backToLoginLink.addEventListener('click', function(event) {
  event.preventDefault();
  forgotPasswordForm.classList.add('hidden'); // Hide forgot password form
  loginForm.classList.remove('hidden'); // Show login form
});

// Handle Forgot Password form submission
forgotPasswordForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  const resetEmail = resetEmailInput.value;

  // Validate email format
  if (!validateEmail(resetEmail)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate sending a password reset link
  alert(`A password reset link has been sent to ${resetEmail}`);
  
  // Redirect back to login form after sending reset link
  forgotPasswordForm.classList.add('hidden');
  loginForm.classList.remove('hidden');
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}



// Google Sign-In
function handleGoogleSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const idToken = googleUser.getAuthResponse().id_token;

  // You can use the profile info for your application
  console.log("User signed in:");
  console.log("ID: " + profile.getId());
  console.log("Name: " + profile.getName());
  console.log("Email: " + profile.getEmail());

  // Redirect or handle sign-in in your application
  alert("Google Sign-In successful: " + profile.getEmail());
}

// Initialize Google Sign-In
function initGoogleSignIn() {
  gapi.load('auth2', function () {
    console.log('gapi loaded');
    gapi.auth2.init({
      client_id: '685242840784-439lknl1ju5coo6r69ke1nbc7ai47du6.apps.googleusercontent.com'
    }).then(function (auth2) {
      console.log('auth2 initialized');
      document.getElementById('google').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission
        auth2.signIn().then(handleGoogleSignIn);
      });
    }).catch(function (error) {
      console.error('Error initializing Google Auth: ', error);
    });
  });
}



// Load the Google API
(function() {
  const googleScript = document.createElement('script');
  googleScript.src = 'https://apis.google.com/js/platform.js';
  document.head.appendChild(googleScript);
  googleScript.onload = initGoogleSignIn;
})();




// Initialize Facebook SDK
window.fbAsyncInit = function() {
  FB.init({
    appId: '806554084802757',
    cookie: true,
    xfbml: true,
    version: 'v10.0'
  });
  
  // Check login status and handle it accordingly
  document.getElementById('facebook').addEventListener('click', function () {
    FB.login(function(response) {
      if (response.status === 'connected') {
        FB.api('/me', {fields: 'name,email'}, function(response) {
          console.log("Facebook login successful");
          console.log("User Name: " + response.name);
          console.log("User Email: " + response.email);
          alert("Facebook Sign-In successful: " + response.email);
        });
      } else {
        alert("User did not authorize Facebook login.");
      }
    }, {scope: 'email'});
  });
};

// Load the Facebook SDK
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


