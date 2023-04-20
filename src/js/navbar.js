import {auth} from "./app-config";
import {onAuthStateChanged} from "firebase/auth";


const loginButton = document.getElementById('btn-register-login');
const btnProfile = document.getElementById('btn-profile');
const dropProfile = document.getElementById('btn-profile-dropdown');
const profileLoader = document.getElementById('profile-loader');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const logoutButton = document.getElementById('btn-logout');
const profileImage = document.getElementById('profile-image');
const noPhoto = document.getElementById('noPhoto');
const hasPhoto = document.getElementById('hasPhoto');
const navNotLoggedIn = document.getElementsByClassName('nav-not-logged-in');
const navLoggedIn = document.getElementsByClassName('nav-logged-in');
const bars = document.getElementById("bars");
const xmark = document.getElementById("xmark");

const navbar = {
    burger: document.querySelector(".navbar-burger"),
    menu: document.getElementById("main-navbar")
};
addEventListener("DOMContentLoaded", () => {
    navbar.burger.addEventListener("click", () => {
        bars.classList.toggle("is-hidden");
        xmark.classList.toggle("is-hidden");
        navbar.menu.classList.toggle("is-active");
    });
    navbar.menu.addEventListener("click", () => {
        bars.classList.toggle("is-hidden");
        xmark.classList.toggle("is-hidden");
        navbar.menu.classList.remove("is-active");
    });
});


btnProfile.addEventListener('click', () => {
    dropProfile.classList.toggle('makedropvisible');
});
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        localStorage.clear();
        location.href = "/";
    }).catch((error) => {
        // An error happened.
    });
});

// for each element in navNotLoggedIn, add is-hidden class
function navNotLoggedInToggle(addorremove, theclass) {
    for (let i = 0; i < navNotLoggedIn.length; i++) {
        if (addorremove === "add") {
            navNotLoggedIn[i].classList.add(theclass);
        } else if (addorremove === "remove") {
            navNotLoggedIn[i].classList.remove(theclass);
        }
    }
}

function navLoggedInToggle(addorremove, theclass) {
    for (let i = 0; i < navLoggedIn.length; i++) {
        if (addorremove === "add") {
            navLoggedIn[i].classList.add(theclass);
        } else if (addorremove === "remove") {
            navLoggedIn[i].classList.remove(theclass);
        }
    }
}

onAuthStateChanged(auth, user => {
    if (user) {
        navLoggedInToggle("remove", "is-hidden");
        navNotLoggedInToggle("add", "is-hidden");
        loginButton.classList.add('is-hidden');
        btnProfile.classList.remove('is-hidden');
        profileLoader.classList.add('is-hidden');
        profileName.innerHTML = auth.currentUser.displayName;
        profileEmail.innerHTML = auth.currentUser.email;
        if (auth.currentUser.photoURL) {
            hasPhoto.classList.remove('is-hidden');
            noPhoto.classList.add('is-hidden');
            try {
                profileImage.src = auth.currentUser.photoURL;
            } catch (error) {
                hasPhoto.classList.add('is-hidden');
                noPhoto.classList.remove('is-hidden');
            }
        } else {
            hasPhoto.classList.add('is-hidden');
            noPhoto.classList.remove('is-hidden');
        }
    } else {
        navLoggedInToggle("add", "is-hidden");
        navNotLoggedInToggle("remove", "is-hidden");
        loginButton.classList.remove('is-hidden');
        btnProfile.classList.add('is-hidden');
        profileLoader.classList.remove('is-hidden');
        profileName.innerHTML = '';
        profileEmail.innerHTML = '';
    }
});