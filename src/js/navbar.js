import {auth} from "./app-config";
import {onAuthStateChanged} from "firebase/auth";


const loginButton = document.getElementsByClassName('btn-register-login');
const profileLoader = document.getElementById('profile-loader');
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const logoutButton = document.getElementById('btn-logout');
const profileImage = document.getElementById('profile-image');
const noPhoto = document.getElementById('noPhoto');
const hasPhoto = document.getElementById('hasPhoto');
const navNotLoggedIn = document.getElementsByClassName('nav-not-logged-in');
const navLoggedIn = document.getElementsByClassName('nav-logged-in');
const profileMenuLoader = document.getElementById("profile-menu-loader");
const userMenuButton = document.getElementById("user-menu-button");
const profileMenu = document.getElementById("profileMenu");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const closed = document.getElementById("closed");
const open = document.getElementById("open");

mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-hidden");
    open.classList.toggle("is-hidden");
    closed.classList.toggle("is-hidden");
});

userMenuButton.addEventListener("click", () => {
    profileMenu.classList.toggle("is-hidden");
});
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        localStorage.clear();
        location.href = "/";
    }).catch(() => {
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
        for (let i = 0; i < loginButton.length; i++) {
            loginButton[i].classList.add('is-hidden');
        }
        profileLoader.classList.add('is-hidden');
        profileName.innerHTML = auth.currentUser.displayName;
        profileEmail.innerHTML = auth.currentUser.email;
        if (auth.currentUser.photoURL) {
            profileMenuLoader.classList.add('is-hidden');
            hasPhoto.classList.remove('is-hidden');
            noPhoto.classList.add('is-hidden');
            try {
                profileImage.src = auth.currentUser.photoURL;
            } catch (error) {
                profileMenuLoader.classList.add('is-hidden');
                hasPhoto.classList.add('is-hidden');
                noPhoto.classList.remove('is-hidden');
            }
        } else {
            profileMenuLoader.classList.add('is-hidden');
            hasPhoto.classList.add('is-hidden');
            noPhoto.classList.remove('is-hidden');
        }
    } else {
        navLoggedInToggle("add", "is-hidden");
        navNotLoggedInToggle("remove", "is-hidden");
        profileMenuLoader.classList.add('is-hidden');
        for (let i = 0; i < loginButton.length; i++) {
            loginButton[i].classList.remove('is-hidden');
        }
        profileLoader.classList.remove('is-hidden');
        profileName.innerHTML = '';
        profileEmail.innerHTML = '';
    }
});
document.querySelector('html').addEventListener('click', function (event) {
    if (!event.target.closest('#user-menu-button')) {
        profileMenu.classList.add("is-hidden");
    }
});
