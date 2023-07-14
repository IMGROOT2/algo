import {auth} from "./app-config";
import {onAuthStateChanged} from "firebase/auth";
import * as problems from "../data/data.json";
import * as bulmaToast from 'bulma-toast';

const {setDefaults, toast} = bulmaToast;

setDefaults({
    position: 'bottom-left'
});


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
const searchInNavbar = document.getElementById("search");
const searchModal = document.getElementById("search-modal");
const searchInModal = document.getElementById("search-in-modal");
const toggleModal = document.getElementsByClassName("toggle-modal");
const searchInput = document.getElementById("search-input");
const searchHelp = document.getElementById("search-help");
const algoSearchMenu = document.getElementById("algo-search-menu");

let searchProblemInfo = [];
const divisions = ["bronze", "silver", "gold", "platinum"];

searchInNavbar.addEventListener("click", () => {
    searchModal.classList.toggle("is-active");
});

function prepareSearch() {
    divisions.forEach(division => {
        problems[division].forEach(problem => {
            let toPush = problem.id + " " + problem.title.substring(11).toLowerCase() + " " + division;
            searchProblemInfo.push(toPush);

            const li = document.createElement("li");
            const a = document.createElement("a");
            const span = document.createElement("span");
            span.classList.add("tag", "has-text-white", "is-6", "ml-2");
            span.innerText = problem.id;
            if(problem.division === "bronze") {
                span.classList.add("is-bronze");
            }
            if(problem.division === "silver") {
                span.classList.add("is-silver");
            }
            if(problem.division === "gold") {
                span.classList.add("is-gold");
            }
            if(problem.division === "platinum") {
                span.classList.add("is-platinum");
            }
            a.classList.add("has-text-white");
            a.href = "/problem/" + problem.id;
            a.innerText += problem.title.substring(11);
            a.appendChild(span);
            li.appendChild(a);
            algoSearchMenu.appendChild(li);
        });
    });
}

searchHelp.addEventListener("click", () => {
    toast({
        message: "The USACO Problem ID is the 3 or 4 digit number that appears at the end of the usaco.org problem URL. \n Enter the ID into Search to view the problem page on Algo, with a better UI interface.",
        type: "is-info",
        dismissible: true,
        duration: 10000,
    });
});

for (let i = 0; i < toggleModal.length; i++) {
    toggleModal[i].addEventListener("click", () => {
        searchModal.classList.toggle("is-active");
    });
}

function search() {
    let value = searchInput.value.toLowerCase();
    let filtered = searchProblemInfo.filter(problem => {
        if(problem.includes(value)) {
            console.log("found that " + value + "is in " + problem);
        }
        else {
            console.log("found that " + value + "is not in " + problem);
        }
        return problem.includes(value);
    });
    console.log(filtered);
    // clear the menu, then add the filtered items
    algoSearchMenu.innerHTML = "";
    filtered.forEach(problem => {
        let id = problem.split(" ")[0];
        let info = getInfo(id);
        const li = document.createElement("li");
        const a = document.createElement("a");
        const span = document.createElement("span");
        span.classList.add("tag", "has-text-white", "is-6", "ml-2");
        span.innerText = id;
        if(info.division === "bronze") {
            span.classList.add("is-bronze");
        }
        if(info.division === "silver") {
            span.classList.add("is-silver");
        }
        if(info.division === "gold") {
            span.classList.add("is-gold");
        }
        if(info.division === "platinum") {
            span.classList.add("is-platinum");
        }
        a.classList.add("has-text-white");
        a.href = "/problem/" + id;
        a.innerText += info.title.substring(11);
        a.appendChild(span);
        li.appendChild(a);
        algoSearchMenu.appendChild(li);
    });
}

searchInModal.addEventListener("click", () => {
    search();
});
searchInput.addEventListener("input", function () {
    search();
});

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
    prepareSearch();
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
function getInfo(id) {
    let generated = {};
    let found = false;
    divisions.every(division => {
        problems[division].every(p => {
            if (p.id === parseInt(id)) {
                generated = p;
                found = true;
                return false;
            }
            return true;
        });
        return !found;
    });
    return generated;
}