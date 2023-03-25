import { app, db, auth } from "./app-config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup, sendPasswordResetEmail, getAdditionalUserInfo } from "firebase/auth";
const google = new GoogleAuthProvider();


// get all buttons with class btn-forgot-password, and add listener to each
const forgotPasswordButtons = document.getElementsByClassName("btn-forgot-password");
for (let i = 0; i < forgotPasswordButtons.length; i++) {
    forgotPasswordButtons[i].addEventListener("click", () => {
        document.getElementById("forgot-password").classList.toggle("is-hidden");
        document.getElementById("login").classList.add("is-hidden");
        document.getElementById("signup").classList.add("is-hidden");
    });
}
document.getElementById("switchtosignup").addEventListener("click", () => {
    document.getElementById("login").classList.toggle("is-hidden");
    document.getElementById("signup").classList.toggle("is-hidden");
});
document.getElementById("switchtologin").addEventListener("click", () => {
    document.getElementById("login").classList.toggle("is-hidden");
    document.getElementById("signup").classList.toggle("is-hidden");
});
document.getElementById("switchtologinfromfp").addEventListener("click", () => {
    document.getElementById("forgot-password").classList.toggle("is-hidden");
    document.getElementById("login").classList.toggle("is-hidden");
});

// add event listener to login button
document.getElementById("button-login").addEventListener("click", login);
// add event listener to signup button
document.getElementById("button-signup").addEventListener("click", signup);
// add event listener to forgot password button
document.getElementById("button-f-sendEmail").addEventListener("click", forgotPassword);

document.getElementById("button-auth-button-login").addEventListener("click", googleAuth);
document.getElementById("button-auth-button-signup").addEventListener("click", googleAuth);

// login function
function login() {
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    // log the user in
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            location.href="/dashboard";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
}
// signup function
function signup() {
    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;
    const name = document.getElementById("name-signup").value;
    // create the user
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // set user display name
            setupFirestoreForNewUser(auth, db, user).then(r => {
                updateProfile(user, {
                    displayName: name
                }).then(r => {
                    console.log("Updated user display name");
                    location.href = "/dashboard";
                });
            });
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
}
// forgot password function
function forgotPassword() {
    const email = document.getElementById("email-f-email").value;
    // send password reset email
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Email sent.
            alert("Password reset email sent! Check your inbox as well as Spam or Junk folders. Press the Reset Password button to resend the email.");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
}

function googleAuth() {
    signInWithPopup(auth, google)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const { isNewUser } = getAdditionalUserInfo(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            if (isNewUser) {
                setupFirestoreForNewUser(auth, db, user).then(r => {
                    location.href="/dashboard";
                });
            }
            else {
                location.href="/dashboard";
            }
            // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}
async function setupFirestoreForNewUser(auth, db, user) {
    await setDoc(doc(db, "user_data", user.uid), {
        created: serverTimestamp()
    });
}