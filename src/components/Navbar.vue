<template>
    <nav class="bg-zinc-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button id="mobileMenuButton" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400" type="button" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <span id="closed" class="block h-6 w-6 m-auto icon">
            <i class="fa-solid fa-bars"></i>
            </span>
            <span id="open" class="h-6 w-6 m-auto hidden">
            <i class="fa-solid fa-xmark"></i>
            </span>
        </button>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
            <a href="/">
            <img class="block h-8 w-auto m-auto lg:hidden" :src="AlgoFull" alt="Algo">
            <img class="hidden h-8 w-auto m-auto lg:block" :src="AlgoFull" alt="Algo">
            </a>
        </div>
        <div class="hidden m-auto sm:ml-6 sm:block">
            <div class="flex space-x-4">
            <a href="/" class="text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white">Home</a>
            <a href="/beta" class="text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white">Beta Release Info</a>
            <a href="/solve" class="text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white">Solve</a>
            </div>
        </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <div class="relative ml-4">
            <span id="search" class="fa-stack group">
            <i class="fa-solid fa-circle fa-stack-2x text-gray-700 group-hover:text-blue-600"></i>
            <i class="fa-solid fa-search fa-stack-1x fa-inverse group-hover:text-white"></i>
            </span>
        </div>
        <div class="relative ml-2">
            <div>
            <Loader id="profile-menu-loader" size="8" />
            <a href="/login" class="btn-register-login text-gray-300 rounded-md px-3 py-2 text-sm font-medium nav-not-logged-in hidden hover:bg-gray-700 hover:text-white sm:block">Register - Log In</a>
            <button id="user-menu-button" type="button" class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" aria-expanded="false" aria-haspopup="true">
                <span class="sr-only">Open user menu</span>
                <span id="noPhoto" class="icon hidden">
                <i style="background: transparent; color: white !important;" class="fa-solid fa-user-circle h-8 w-8 rounded-full"></i>
                </span>
                <span id="hasPhoto" class="hidden">
                <img id="profile-image" referrerpolicy="no-referrer" alt="Profile Image" class="h-8 w-8 rounded-full">
                </span>
            </button>
            </div>
            <div id="profileMenu" class="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 text-white focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" style="max-width: 175px !important; width: 175px !important; background-color: #2e3033;">
            <div class="no-pointer-events px-4 mt-2">
                <span id="profile-loader" class="bulma-loader-mixin"></span>
                <p id="profile-name" style="display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none;"></p>
            </div>
            <div class="no-pointer-events px-4 mb-3">
                <p id="profile-email" style="font-size: 0.5rem; overflow: hidden; display: block; text-overflow: ellipsis; white-space: nowrap; pointer-events: none;"></p>
            </div>
            <a href="/profile" class="block px-4 py-2 text-sm text-white m-auto hover:bg-gray-600 hover:text-white">
                <span class="icon is-small mr-1">
                <i style="position: relative; top: 2px;" class="fa-solid fa-user"></i>
                </span>
                Profile
            </a>
            <a href="/statistics" class="block px-4 py-2 text-sm text-white m-auto hover:bg-gray-600 hover:text-white">
                <span class="icon is-small mr-1">
                <i style="position: relative; top: 2px;" class="fa-solid fa-chart-line"></i>
                </span>
                Statistics
            </a>
            <a id="btn-logout" href="/" class="block px-4 py-2 text-sm text-white m-auto hover:bg-gray-600 hover:text-white">
                <span class="icon is-small mr-1">
                <i style="position: relative; top: 2px;" class="fa-solid fa-sign-out-alt"></i>
                </span>
                Log Out
            </a>
            </div>
        </div>
        </div>
    </div>
    <div id="mobile-menu" class="sm:hidden space-y-1 px-2 pb-3 pt-2 hidden">
        <a href="/" class="text-gray-300 block rounded-md px-3 py-2 text-base font-medium m-auto hover:bg-gray-700 hover:text-white">Home</a>
        <a href="/beta" class="text-gray-300 block rounded-md px-3 py-2 text-base font-medium m-auto hover:bg-gray-700 hover:text-white">Beta Release Info</a>
        <a href="/solve" class="text-gray-300 block rounded-md px-3 py-2 text-base font-medium m-auto hover:bg-gray-700 hover:text-white">Solve</a>
        <a href="/login" class="text-gray-300 rounded-md px-3 py-2 text-base font-medium m-auto nav-not-logged-in hidden btn-register-login hover:bg-gray-700 hover:text-white">Register - Log In</a>
    </div>
    </nav>

    <div class="modal hidden" id="search-modal">
    <div class="modal-background toggle-modal"></div>
    <div class="modal-card">
        <header class="modal-card-head">
        <p class="has-text-white modal-card-title">Search Problems</p>
        <button class="delete toggle-modal" aria-label="close"></button>
        </header>
        <section class="modal-card-body" style="margin-bottom: 0;">
        <div class="field has-addons has-addons-centered">
            <div class="control" style="width: 100%;">
            <input id="search-input" class="input is-medium is-fullwidth" type="text" placeholder="Search by ID, name, or division...">
            </div>
            <div class="control">
            <a id="search-in-modal" class="button is-medium is-primary">
                <span class="icon is-small">
                <i class="fas fa-search"></i>
                </span>
            </a>
            </div>
        </div>
        <div class="menu mt-4" style="overflow-y: scroll;height: 500px;">
            <ul id="algo-search-menu" class="menu-list"></ul>
        </div>
        <button id="search-help" class="button tag is-small is-info is-outlined subtitle has-text-white text-center is-6 mx-auto mt-1 mb-0">What's a USACO Problem ID?</button>
        </section>
    </div>
    </div>
</template>
<script setup>
import {onMounted} from 'vue'  
import AlgoFull from '../assets/images/algologofull.png'
import Loader from './Loader.vue'
import {auth} from "../app-config";
import {onAuthStateChanged} from "firebase/auth";
import * as problems from "../public/data/data.json";

onMounted(() => {
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
    mobileMenu.classList.toggle("hidden");
    open.classList.toggle("hidden");
    closed.classList.toggle("hidden");
});

userMenuButton.addEventListener("click", () => {
    profileMenu.classList.toggle("hidden");
});
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        localStorage.clear();
        location.href = "/";
    }).catch(() => {
        // An error happened.
    });
});

// for each element in navNotLoggedIn, add hidden class
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
        navLoggedInToggle("remove", "hidden");
        navNotLoggedInToggle("add", "hidden");
        for (let i = 0; i < loginButton.length; i++) {
            loginButton[i].classList.add('hidden');
        }
        profileLoader.classList.add('hidden');
        profileName.innerHTML = auth.currentUser.displayName;
        profileEmail.innerHTML = auth.currentUser.email;
        if (auth.currentUser.photoURL) {
            profileMenuLoader.classList.add('hidden');
            hasPhoto.classList.remove('hidden');
            noPhoto.classList.add('hidden');
            try {
                profileImage.src = auth.currentUser.photoURL;
            } catch (error) {
                profileMenuLoader.classList.add('hidden');
                hasPhoto.classList.add('hidden');
                noPhoto.classList.remove('hidden');
            }
        } else {
            profileMenuLoader.classList.add('hidden');
            hasPhoto.classList.add('hidden');
            noPhoto.classList.remove('hidden');
        }
    } else {
        navLoggedInToggle("add", "hidden");
        navNotLoggedInToggle("remove", "hidden");
        profileMenuLoader.classList.add('hidden');
        for (let i = 0; i < loginButton.length; i++) {
            loginButton[i].classList.remove('hidden');
        }
        profileLoader.classList.remove('hidden');
        profileName.innerHTML = '';
        profileEmail.innerHTML = '';
    }
});
document.querySelector('html').addEventListener('click', function (event) {
    if (!event.target.closest('#user-menu-button')) {
        profileMenu.classList.add("hidden");
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
});

</script>