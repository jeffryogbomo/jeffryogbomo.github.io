// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG51D4xiyKPF07LIs69nHeoEJmCbL-oQA",
  authDomain: "official-pfe.firebaseapp.com",
  projectId: "official-pfe",
  storageBucket: "official-pfe.appspot.com",
  messagingSenderId: "470366394426",
  appId: "1:470366394426:web:c08eed4f0629ec09603d03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Auth
const provider = new GoogleAuthProvider(); // Google Auth provider

// Email/Password registration
const submit = document.getElementById('submit');
submit.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form from submitting

  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!passwordPattern.test(password)) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = "Error: Password must be at least 8 characters long and contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9), and one special character.";
    messageElement.style.color = "red";
    return; // Stop execution if the password doesn't meet the requirements
  }
  const messageElement = document.getElementById('message'); // Element to display error messages

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully, redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Handle registration errors
      const errorMessage = error.message;
      messageElement.textContent = "Error: " + errorMessage;
      messageElement.style.color = "red"; // Display error message in red
    });
});

// Google sign-up/login
const googleRegisterButton = document.getElementById('google-register');
googleRegisterButton.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default action

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;

      // Redirect to dashboard after successful Google login
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      // Handle Google sign-up/login errors
      const errorMessage = error.message;
      const messageElement = document.getElementById('message');
      messageElement.textContent = "Error: " + errorMessage;
      messageElement.style.color = "red"; // Display error message in red
    });
});
// Register with Microsoft
document.getElementById("microsoft-register").addEventListener("click", () => {
  const provider = new firebase.auth.OAuthProvider('microsoft.com');

  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      console.log('User signed in: ', user);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error('Error during sign-in: ', error);
    });
});
// Password visibility toggle
document.getElementById('eye-icon').addEventListener('click', function () {
  const passwordInput = document.getElementById('password');
  const icon = document.getElementById('eye-icon');
  
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
  } else {
      passwordInput.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
  }
});
