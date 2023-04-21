import * as bulmaToast from 'bulma-toast';
import {auth, db} from "./app-config";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    getAdditionalUserInfo,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "firebase/auth";

const google = new GoogleAuthProvider();

const {setDefaults, toast} = bulmaToast;

setDefaults({
    position: 'bottom-left'
});
onAuthStateChanged(auth, async user => {
    if (user && !user.metadata.creationTime) {
        location.href = "/";
    }
});
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
async function login() {
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    // log the user in
    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            location.href = "/solve";
            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            toast({message: errorMessage, type: 'is-danger'});
        });
}

// signup function
async function signup() {
    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;
    const name = document.getElementById("name-signup").value;
    // create the user
    await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            // set user display name
            await setupFirestoreForNewUser(auth, db, user).then(async r => {
                updateProfile(user, {
                    displayName: name
                }).then(r => {
                    console.log("Updated user display name");
                    location.href = "/solve";
                });
            });
            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            toast({message: errorMessage, type: 'is-danger'});
            // ..
        });
}

// forgot password function
async function forgotPassword() {
    const email = document.getElementById("email-f-email").value;
    // send password reset email
    await sendPasswordResetEmail(auth, email)
        .then(() => {
            // Email sent.
            toast({
                message: "Password reset email sent! Check your inbox as well as Spam or Junk folders. Press the Reset Password button to resend the email.",
                type: 'is-info'
            });
        })
        .catch((error) => {
            const errorMessage = error.message;
            toast({message: errorMessage, type: 'is-danger'});
        });
}

function googleAuth() {
    signInWithPopup(auth, google)
        .then(async (result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const {isNewUser} = getAdditionalUserInfo(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            if (isNewUser) {
                await setupFirestoreForNewUser(auth, db, user).then(r => {
                    location.href = "/solve";
                });
            } else {
                location.href = "/solve";
            }
            // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        toast({message: errorMessage, type: 'is-danger'});
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

async function setupFirestoreForNewUser(auth, db, user) {
    await setDoc(doc(db, "user_data", user.uid), {
        created: serverTimestamp(),
        problemsSeen: [],
        problemsSolved: [],
        problemsSkipped: [],
        problemsUnsolved: []
    });
}

async function retrieveUserDoc(db, user) {
    return await getDoc(doc(db, "user_data", user.uid));
}