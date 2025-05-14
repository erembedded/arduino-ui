// Replace this config with your own from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBuWzVJg_3yAGWHh6pqsJmoKVL8rU5KmeE",
  authDomain: "embeddedsiksha-auth.firebaseapp.com",
  projectId: "embeddedsiksha-auth",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function login3() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, pass)
    .then(() => {
      document.getElementById("message").textContent = "Account created. Redirecting...";
      // Wait for auth state change
      auth.onAuthStateChanged(user => {
        if (user) {
          window.location.href = "dashboard.html";
        }
      });
    })
    .catch(err => {
      document.getElementById("message").textContent = err.message;
    });
}

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      window.location.href = "dashboard.html"; // redirect after login
    })
    .catch(err => {
      document.getElementById("error").innerText = err.message;
    });
}

function logout() {
  firebase.auth().signOut()
    .then(() => {
      console.log("User signed out");
      window.location.href = "index.html"; // ✅ Redirect to login page
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
      document.getElementById("message").textContent = error.message;
    });
}


// Optional: protect dashboard.html
if (window.location.pathname.includes("dashboard.html")) {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "index.html"; // redirect if not logged in
    }
  });
}
