<template>
  <nav class="bg-zinc-800">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-between"
    >
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <button
          id="mobileMenuButton"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-400"
          type="button"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
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
          <router-link to="/">
            <img class="block h-8 w-auto m-auto lg:hidden" :src="AlgoFull" alt="Algo" />
            <img class="hidden h-8 w-auto m-auto lg:block" :src="AlgoFull" alt="Algo" />
          </router-link>
        </div>
        <div class="hidden m-auto sm:ml-6 sm:block">
          <div class="flex space-x-4">
            <router-link
              to="/"
              class="text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white"
              >Home</router-link
            >
            <!-- <a href="/beta" class="text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white">Beta Release Info</a> -->
            <router-link
              to="/solve"
              class="text-gray-300 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white"
              >Solve</router-link
            >
          </div>
        </div>
      </div>
      <div
        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
      >
        <div class="relative ml-4">
          <span id="search" class="fa-stack group">
            <i class="fa-solid fa-circle fa-stack-2x text-gray-700 group-hover:text-blue-600"></i>
            <i class="fa-solid fa-search fa-stack-1x fa-inverse group-hover:text-white"></i>
          </span>
        </div>
        <div class="relative ml-2">
          <div>
            <Loader id="profile-menu-loader" size="6" />
            <router-link
              to="/login"
              id="nav-btn-register-login"
              class="btn-register-login text-gray-300 rounded-md px-3 py-2 text-sm font-medium nav-not-logged-in hidden hover:bg-gray-700 hover:text-white"
              >Register - Log In</router-link
            >
            <button
              id="user-menu-button"
              type="button"
              class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="sr-only">Open user menu</span>
              <span id="noPhoto" class="icon hidden">
                <i
                  style="background: transparent; color: white !important"
                  class="fa-solid fa-user-circle h-8 w-8 rounded-full"
                ></i>
              </span>
              <span id="hasPhoto" class="hidden">
                <img
                  id="profile-image"
                  referrerpolicy="no-referrer"
                  alt="Profile Image"
                  class="h-8 w-8 rounded-full"
                />
              </span>
            </button>
          </div>
          <div
            id="profileMenu"
            class="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 text-white focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1"
            style="max-width: 175px !important; width: 175px !important; background-color: #2e3033"
          >
            <div class="no-pointer-events px-4 mt-2">
              <span id="profile-loader" class="bulma-loader-mixin"></span>
              <p
                id="profile-name"
                style="
                  display: block;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  pointer-events: none;
                "
              ></p>
            </div>
            <div class="no-pointer-events px-4 mb-3">
              <p
                id="profile-email"
                style="
                  font-size: 0.5rem;
                  overflow: hidden;
                  display: block;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  pointer-events: none;
                "
              ></p>
            </div>
            <router-link
              to="/profile"
              class="block px-4 py-2 text-sm text-white m-auto hover:bg-gray-600 hover:text-white"
            >
              <span class="icon is-small mr-1">
                <i style="position: relative; top: 2px" class="fa-solid fa-user"></i>
              </span>
              Profile
            </router-link>
            <router-link
              to="/statistics"
              class="block px-4 py-2 text-sm text-white m-auto hover:bg-gray-600 hover:text-white"
            >
              <span class="icon is-small mr-1">
                <i style="position: relative; top: 2px" class="fa-solid fa-chart-line"></i>
              </span>
              Statistics
            </router-link>
            <a
              id="btn-logout"
              href="/"
              class="block px-4 py-2 text-sm text-white m-auto hover:bg-gray-600 hover:text-white"
            >
              <span class="icon is-small mr-1">
                <i style="position: relative; top: 2px" class="fa-solid fa-sign-out-alt"></i>
              </span>
              Log Out
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="mobile-menu" class="sm:hidden space-y-1 px-2 pb-3 pt-2 hidden">
      <router-link
        to="/"
        class="text-gray-300 block rounded-md px-3 py-2 text-base font-medium m-auto hover:bg-gray-700 hover:text-white"
        >Home</router-link
      >
      <!-- <a href="/beta" class="text-gray-300 block rounded-md px-3 py-2 text-base font-medium m-auto hover:bg-gray-700 hover:text-white">Beta Release Info</a> -->
      <router-link
        to="/solve"
        class="text-gray-300 block rounded-md px-3 py-2 text-base font-medium m-auto hover:bg-gray-700 hover:text-white"
        >Solve</router-link
      >
      <router-link
        to="/login"
        class="text-gray-300 block rounded-md px-3 py-2 text-base font-medium m-auto nav-not-logged-in hidden btn-register-login hover:bg-gray-700 hover:text-white"
        >Register - Log In</router-link
      >
    </div>
  </nav>

  <div
    id="search-modal"
    tabindex="-1"
    class="hidden fixed right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 max-h-full h-screen place-items-center bg-zinc-900/70"
  >
    <div class="relative w-full max-w-2xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-zinc-800">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl text-gray-900 dark:text-white">Search Problems</h3>
          <button
            type="button"
            class="toggle-modal text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="defaultModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i class="fas fa-search w-4 h-4 text-gray-500 dark:text-gray-400"></i>
              </div>
              <input
                type="search"
                id="search-input"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search by ID, name, or division..."
                required
              />
            </div>
          </form>

          <div class="menu mt-4 overflow-y-scroll h-[calc(60vh-5rem)]">
            <ul id="algo-search-menu" class="menu-list"></ul>
          </div>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            id="search-help"
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            What is a USACO Problem ID?
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import AlgoFull from '../assets/images/algologofull.png'
import Loader from './Loader.vue'
import createToast from '../toast'
import { auth } from '../app-config'
import { onAuthStateChanged } from 'firebase/auth'
import * as problems from '../public/data/data.json'

onMounted(() => {
  const loginButton = document.getElementsByClassName('btn-register-login')
  const profileLoader = document.getElementById('profile-loader')
  const profileName = document.getElementById('profile-name')
  const profileEmail = document.getElementById('profile-email')
  const logoutButton = document.getElementById('btn-logout')
  const profileImage = document.getElementById('profile-image')
  const noPhoto = document.getElementById('noPhoto')
  const hasPhoto = document.getElementById('hasPhoto')
  const navNotLoggedIn = document.getElementsByClassName('nav-not-logged-in')
  const navLoggedIn = document.getElementsByClassName('nav-logged-in')
  const profileMenuLoader = document.getElementById('profile-menu-loader')
  const userMenuButton = document.getElementById('user-menu-button')
  const profileMenu = document.getElementById('profileMenu')
  const mobileMenu = document.getElementById('mobile-menu')
  const mobileMenuButton = document.getElementById('mobileMenuButton')
  const closed = document.getElementById('closed')
  const open = document.getElementById('open')
  const searchInNavbar = document.getElementById('search')
  const searchModal = document.getElementById('search-modal')
  // const searchInModal = document.getElementById("search-in-modal");
  const toggleModal = document.getElementsByClassName('toggle-modal')
  const searchInput = document.getElementById('search-input')
  const searchHelp = document.getElementById('search-help')
  const algoSearchMenu = document.getElementById('algo-search-menu')
  const navBtnRegisterLogin = document.getElementById('nav-btn-register-login')

  let searchProblemInfo = []
  const divisions = ['bronze', 'silver', 'gold', 'platinum']

  function toggleSearchModal() {
    searchModal.classList.toggle('hidden')
    searchModal.classList.toggle('grid')
  }

  searchInNavbar.addEventListener('click', toggleSearchModal)

  function prepareSearch() {
    divisions.forEach((division) => {
      problems[division].forEach((problem) => {
        let toPush = problem.id + ' ' + problem.title.substring(11).toLowerCase() + ' ' + division
        searchProblemInfo.push(toPush)

        const li = document.createElement('li')
        const a = document.createElement('a')
        const span = document.createElement('span')
        span.classList.add('rounded-sm', 'text-white', 'text-sm', 'ml-2', 'px-1')
        span.innerText = problem.id
        if (problem.division === 'bronze') {
          span.classList.add('is-bronze')
        }
        if (problem.division === 'silver') {
          span.classList.add('is-silver')
        }
        if (problem.division === 'gold') {
          span.classList.add('is-gold')
        }
        if (problem.division === 'platinum') {
          span.classList.add('is-platinum')
        }
        a.classList.add('text-white')
        a.href = '/problem/' + problem.id
        a.innerText += problem.title.substring(11)
        a.appendChild(span)
        li.appendChild(a)
        li.classList.add('mt-3')
        algoSearchMenu.appendChild(li)
      })
    })
  }

  searchHelp.addEventListener('click', () => {
    createToast(
      'The USACO Problem ID is the 3 or 4 digit number that appears at the end of the usaco.org problem URL. Enter the ID into Search to view the problem page on Algo, with a better UI interface.',
      'fa-info'
    )
  })

  for (let i = 0; i < toggleModal.length; i++) {
    toggleModal[i].addEventListener('click', toggleSearchModal)
  }

  function search() {
    let value = searchInput.value.toLowerCase()
    let filtered = searchProblemInfo.filter((problem) => {
      if (problem.includes(value)) {
        console.log('found that ' + value + 'is in ' + problem)
      } else {
        console.log('found that ' + value + 'is not in ' + problem)
      }
      return problem.includes(value)
    })
    console.log(filtered)
    // clear the menu, then add the filtered items
    algoSearchMenu.innerHTML = ''
    filtered.forEach((problem) => {
      let id = problem.split(' ')[0]
      let info = getInfo(id)
      const li = document.createElement('li')
      const a = document.createElement('a')
      const span = document.createElement('span')
      span.classList.add('rounded-sm', 'text-white', 'text-sm', 'ml-2', 'px-1')
      span.innerText = id
      if (info.division === 'bronze') {
        span.classList.add('is-bronze')
      }
      if (info.division === 'silver') {
        span.classList.add('is-silver')
      }
      if (info.division === 'gold') {
        span.classList.add('is-gold')
      }
      if (info.division === 'platinum') {
        span.classList.add('is-platinum')
      }
      a.classList.add('text-white')
      a.href = '/problem/' + id
      a.innerText += info.title.substring(11)
      a.appendChild(span)
      li.appendChild(a)
      li.classList.add('mt-3')
      algoSearchMenu.appendChild(li)
    })
  }

  // searchInModal.addEventListener("click", () => {
  //     search();
  // });
  searchInput.addEventListener('input', function () {
    search()
  })

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden')
    open.classList.toggle('hidden')
    closed.classList.toggle('hidden')
  })

  userMenuButton.addEventListener('click', () => {
    profileMenu.classList.toggle('hidden')
  })
  logoutButton.addEventListener('click', () => {
    auth
      .signOut()
      .then(() => {
        localStorage.clear()
        location.href = '/'
      })
      .catch(() => {
        // An error happened.
      })
  })

  // for each element in navNotLoggedIn, add hidden class
  function navNotLoggedInToggle(addorremove, theclass) {
    for (let i = 0; i < navNotLoggedIn.length; i++) {
      if (addorremove === 'add') {
        navNotLoggedIn[i].classList.add(theclass)
      } else if (addorremove === 'remove') {
        navNotLoggedIn[i].classList.remove(theclass)
      }
    }
  }

  function navLoggedInToggle(addorremove, theclass) {
    for (let i = 0; i < navLoggedIn.length; i++) {
      if (addorremove === 'add') {
        navLoggedIn[i].classList.add(theclass)
      } else if (addorremove === 'remove') {
        navLoggedIn[i].classList.remove(theclass)
      }
    }
  }

  onAuthStateChanged(auth, (user) => {
    profileMenuLoader.classList.remove('hidden')
    prepareSearch()
    if (user) {
      navLoggedInToggle('remove', 'hidden')
      navNotLoggedInToggle('add', 'hidden')
      navBtnRegisterLogin.classList.remove('lg:block')
      navBtnRegisterLogin.classList.add('lg:hidden')
      profileLoader.classList.add('hidden')

      for (let i = 0; i < loginButton.length; i++) {
        loginButton[i].classList.add('hidden')
      }
      profileName.innerHTML = auth.currentUser.displayName
      profileEmail.innerHTML = auth.currentUser.email
      if (auth.currentUser.photoURL) {
        profileMenuLoader.classList.add('hidden')
        hasPhoto.classList.remove('hidden')
        noPhoto.classList.add('hidden')
        try {
          profileImage.src = auth.currentUser.photoURL
        } catch (error) {
          profileMenuLoader.classList.add('hidden')
          hasPhoto.classList.add('hidden')
          noPhoto.classList.remove('hidden')
        }
      } else {
        profileMenuLoader.classList.add('hidden')
        hasPhoto.classList.add('hidden')
        noPhoto.classList.remove('hidden')
      }
    } else {
      navBtnRegisterLogin.classList.add('lg:block')
      navBtnRegisterLogin.classList.remove('lg:hidden')
      navLoggedInToggle('add', 'hidden')
      navNotLoggedInToggle('remove', 'hidden')
      profileMenuLoader.classList.add('hidden')
      document.getElementById('nav-btn-register-login').classList.add('hidden', 'sm:block')
      profileLoader.classList.remove('hidden')
      profileName.innerHTML = ''
      profileEmail.innerHTML = ''
    }
  })
  document.querySelector('html').addEventListener('click', function (event) {
    if (!event.target.closest('#user-menu-button')) {
      profileMenu.classList.add('hidden')
    }
  })
  function getInfo(id) {
    let generated = {}
    let found = false
    divisions.every((division) => {
      problems[division].every((p) => {
        if (p.id === parseInt(id)) {
          generated = p
          found = true
          return false
        }
        return true
      })
      return !found
    })
    return generated
  }
})
</script>
