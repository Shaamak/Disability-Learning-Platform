const firebaseConfig = {
  apiKey: "AIzaSyASl6FeDS9xycXPRPESLDSMlWsQG7DjzYE",
  authDomain: "disability-learning-platform.firebaseapp.com",
  projectId: "disability-learning-platform",
  storageBucket: "disability-learning-platform.appspot.com",
  messagingSenderId: "819207974101",
  appId: "1:819207974101:web:5827cc3a2631ab85a3865c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// References to form elements
const emailInput = document.getElementById('txtEmail');
const passwordInput = document.getElementById('txtPassword');
const loginButton = document.getElementById('btnLogin');
const signupButton = document.getElementById('btnSignup');
const authStateLabel = document.getElementById('lblAuthState');

authStateLabel.style.display = "none";

// auth.onAuthStateChanged(user => {
//   // This block runs whenever the user's authentication state changes
//   if (user) {
//     authStateLabel.style.display = "none";
//   } else {
//     authStateLabel.textContent = "none";
//     authStateLabel.style.color = "red";
//     authStateLabel.style.display = "block";
//   }
// });

// Signup function
signupButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // Firebase sign-up
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      
      // Save user data to Firestore (optional)
      db.collection('users').doc(user.uid).set({
        email: user.email,
        createdAt: new Date()
      });

      // Hide authStateLabel if sign-up is successful
      authStateLabel.style.display = "none";
    })
    .catch(error => {
      authStateLabel.textContent = "Sign up unsuccessful: " + error.message;
      authStateLabel.style.color = "red";
      authStateLabel.style.display = "block"; // Ensure error is visible
    });
});

// Login function
loginButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // Firebase login
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Hide authStateLabel if login is successful
      authStateLabel.style.display = "none";
    })
    .catch(error => {
      authStateLabel.textContent = "Login unsuccessful: " + error.message;
      authStateLabel.style.color = "red";
      authStateLabel.style.display = "block"; // Ensure error is visible
    });
});
