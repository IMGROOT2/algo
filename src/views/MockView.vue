<template>
  <main
    class="flex items-center justify-center flex-col w-full mx-auto min-h-screen"
    v-show="!mockSetUp && !loading"
  >
    <div class="w-full mx-auto text-center transition-all">
      <h1
        class="font-extrabold text-transparent text-4xl lg:text-5xl bg-clip-text mt-10 bg-gradient-to-tr from-[#30a7d6] to-[#27c857]"
      >
        Mock Contest
      </h1>
      <h1
        class="text-2xl mt-3 mb-16 font-semibold opacity-0 text-gray-900 dark:text-white"
        id="msu-subtitle"
      >
        Let's get set up.
      </h1>
      <div
        class="flex flex-col items-center justify-center w-screen-xl mx-5 lg:mx-auto gap-3 opacity-0"
        id="msu-settings"
      >
        <div
          class="p-4 shadow-lg text-gray-900 dark:text-white bg-zinc-300 dark:bg-zinc-800 rounded-lg justify-center w-full lg:w-1/4"
        >
          <h1 class="text-2xl font-bold">Generate Problems</h1>
          <p class="text-md max-w-sm mx-auto">
            Three problems are already generated for you, but you can change them.
          </p>
          <div class="flex items-center justify-center w-screen-xl mx-auto gap-3">
            <div class="my-3"><Loader size="16" v-show="msuProblemsLoading" /></div>
            <div v-show="!msuProblemsLoading">
              <div id="diff-dropdown">
                <button
                  id="diff-trigger"
                  @click="dropdownVisible = !dropdownVisible"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 mt-3 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  <span id="diff-label">{{ currentOption }} </span>
                  <svg
                    class="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <button
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs p-3 top-[2px] relative ml-1 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  @click="refresh"
                >
                  <i class="fa-solid fa-refresh"></i>
                </button>

                <div
                  id="diff-menu"
                  class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-zinc-700 mx-auto mt-3"
                  v-show="dropdownVisible"
                >
                  <ul class="py-2 text-xs text-gray-700 dark:text-gray-200">
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item"
                        @click="setOption('Bronze')"
                        >Bronze</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item"
                        @click="setOption('Silver')"
                        >Silver</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item"
                        @click="setOption('Gold')"
                        >Gold</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item"
                        @click="setOption('Platinum')"
                        >Platinum</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="p-4 shadow-lg text-gray-900 dark:text-white rounded-lg bg-zinc-300 dark:bg-zinc-700 w-screen-xl my-3"
                id="msu-problem-one"
              >
                {{ problemOne }}
              </div>
              <div
                class="p-4 shadow-lg text-gray-900 dark:text-white rounded-lg bg-zinc-300 dark:bg-zinc-700 w-screen-xl my-3"
                id="msu-problem-two"
              >
                {{ problemTwo }}
              </div>
              <div
                class="p-4 shadow-lg text-gray-900 dark:text-white rounded-lg bg-zinc-300 dark:bg-zinc-700 w-screen-xl my-3"
                id="msu-problem-three"
              >
                {{ problemThree }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="p-4 shadow-lg text-gray-900 dark:text-white rounded-lg bg-zinc-300 dark:bg-zinc-800 w-screen-xl w-full lg:w-1/4"
        >
          <h1 class="text-2xl font-bold">Select Duration</h1>
          <p class="text-md max-w-sm mx-auto">
            Choose the duration for the mock contest. We recommend the standard four hours.
          </p>
          <button
            class="hover:bg-blue-500 dark:text-white text-gray-900 border-2 rounded-lg px-4 py-2 mt-3 mx-2"
            @click="toggleDuration(3)"
            id="msu-hours-three"
          >
            3 Hours
          </button>
          <button
            class="hover:bg-emerald-500 dark:text-white text-gray-900 border-2 rounded-lg px-4 py-2 mt-3 mx-2"
            @click="toggleDuration(4)"
            id="msu-hours-four"
          >
            4 Hours
          </button>
          <button
            class="hover:bg-violet-500 dark:text-white text-gray-900 border-2 rounded-lg px-4 py-2 mt-3 mx-2"
            @click="toggleDuration(5)"
            id="msu-hours-five"
          >
            5 Hours
          </button>
        </div>
        <div
          class="p-4 shadow-lg text-gray-900 dark:text-white rounded-lg bg-zinc-300 dark:bg-zinc-800 w-screen-xl w-full lg:w-1/4"
        >
          <h1 class="text-2xl font-bold">Ready?</h1>
          <p class="text-md max-w-sm mx-auto">You cannot stop the countdown once you start.</p>
          <button
            class="transition-all duration-500 bg-gradient-to-tl from-[#3064d6] via-[#70eed9] to-[#1aa23e] bg-size-200 bg-pos-0 hover:bg-pos-100 dark:text-white text-gray-900 border-2 rounded-lg text-lg px-8 py-2 mt-3 mx-2"
            @click="setupMock"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  </main>
  <main v-show="mockSetUp && !loading">
    <div
      tabindex="-1"
      class="fixed right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 max-h-full mx-auto h-screen flex items-center justify-center bg-zinc-900/70"
      v-show="endModal"
    >
      <div class="relative w-full max-w-2xl max-h-full mx-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-zinc-800">
          <!-- Modal header -->
          <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl text-gray-900 dark:text-white">
              <span class="mr-2"><i class="fa-solid fa-clock"></i></span>Time's up!
            </h3>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <h1 class="text-gray-900 dark:text-white font-semibold text-xl">
              Submit your results, and calculate your score!
            </h1>
            <p class="text-gray-700 dark:text-gray-400">
              For each problem, enter the number of correct cases out of total cases as a decimal.
              For example, if you got 7 out of 10 cases correct, write <code>0.7</code>.
            </p>
            <span class="text-gray-700 dark:text-gray-400"
              >If you did not solve a problem,
              <span class="font-bold">leave the input blank.</span></span
            >
            <div>
              <input
                id="endModal-one"
                type="number"
                class="inline-block p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Problem 1"
              />
              <a :href="endModalSubmissionOne" target="_blank"
                ><button
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline"
                >
                  Grade Problem 1
                </button></a
              >
            </div>
            <div>
              <input
                id="endModal-two"
                type="number"
                class="inline-block p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Problem 2"
              />
              <a :href="endModalSubmissionTwo" target="_blank"
                ><button
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline"
                >
                  Grade Problem 2
                </button></a
              >
            </div>
            <div>
              <input
                id="endModal-three"
                type="number"
                class="inline-block p-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Problem 3"
              />
              <a :href="endModalSubmissionThree" target="_blank"
                ><button
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline"
                >
                  Grade Problem 3
                </button></a
              >
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              type="button"
              @click="submitResults"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit Results
            </button>
          </div>
        </div>
      </div>
    </div>

    <nav class="bg-zinc-300 border-gray-200 dark:bg-zinc-900 w-full">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div class="flex items-center">
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white w-32"
            id="mock-countdown"
          ></span>
          <button
            class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            @click="endNow"
          >
            End Now
          </button>
        </div>
        <button
          @click="mobilenav = !mobilenav"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 border-gray-400 border-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <i class="fa-solid fa-file-code w-6 h-6"></i>
        </button>
        <div class="w-full md:block md:w-auto" v-show="mobilenav || desktop">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:border-gray-700"
          >
            <li>
              <a
                id="mock-nav-one"
                @click="toggleProblemViewer('one')"
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-800 rounded md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white"
                >Problem 1</a
              >
            </li>
            <li>
              <a
                id="mock-nav-two"
                @click="toggleProblemViewer('two')"
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-800 rounded md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white"
                >Problem 2</a
              >
            </li>
            <li>
              <a
                id="mock-nav-three"
                @click="toggleProblemViewer('three')"
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-800 rounded md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white"
                >Problem 3</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="mx-auto justify-center flex mt-10">
      <Loader size="16" v-show="problemToggleloading" />
    </div>
    <div class="mx-auto w-screen lg:w-fit" id="problem" v-show="!problemToggleloading">
      <div class="py-4">
        <div class="mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1
              class="text-2xl lg:text-3xl font-bold dark:text-white text-gray-700"
              id="problem-title"
            ></h1>
            <p class="text-gray-400 text-sm lg:text-lg" id="problem-subtitle"></p>
          </div>
          <div class="text-right">
            <span id="problem-id" class="text-white rounded-md px-2 py-1 text-sm"></span>
            <p class="dark:text-white text-sm lg:text-lg mt-3">
              View on <a href="#" id="problem-link" class="page-link">usaco.org</a>
            </p>
          </div>
        </div>
      </div>
      <div class="dark:bg-zinc-800 bg-zinc-300 p-5 rounded-lg mx-3">
        <div class="p-4 mx-auto lg:p-8">
          <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <p class="mb-4" id="problem-text"></p>
          </div>
        </div>
      </div>
    </div>
  </main>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
    crossorigin="anonymous"
  />
</template>
<script setup>
import * as problems from '../public/data/data.json'
import { onMounted, ref } from 'vue'
import createToast from '../toast'
import Loader from '../components/Loader.vue'
import 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js'
import 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../app-config'
import router from '../Router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

let loading = ref(true)
let mockSetUp = ref(false)
let msuProblemsLoading = ref(true)
let mobilenav = ref(false)
let problemToggleloading = ref(true)
let toggleDurationPass
let generateMockProblemsPass
let submitResultsPass
let dropdownVisible = ref(false)
let currentOption
let setupMockPass
let mock
let msu
let problem
let submit
let endModal = ref(false)
let problemOne = ref('')
let problemTwo = ref('')
let problemThree = ref('')
let timerSet = false
let desktop = ref(false)

let endModalSubmissionThree = ref('')
let endModalSubmissionTwo = ref('')
let endModalSubmissionOne = ref('')

if (window.innerWidth >= 768) {
  desktop.value = true
}

if (localStorage.getItem('mock-set-up') == null) {
  localStorage.setItem('mock-set-up', false)
} else {
  mockSetUp.value = localStorage.getItem('mock-set-up') === 'true'
  loading.value = false
}

if (localStorage.getItem('mock-difficulty') == null) {
  currentOption = ref('Bronze')
  localStorage.setItem('mock-difficulty', 'Bronze')
} else {
  currentOption = ref(localStorage.getItem('mock-difficulty'))
}

function submitResults() {
  submitResultsPass()
}

function endNow() {
  localStorage.setItem('mock-duration', 0)
}

function toggleDuration(hours) {
  toggleDurationPass(hours)
}

function refresh() {
  msuProblemsLoading.value = true
  generateMockProblemsPass()
}

function setOption(option) {
  currentOption.value = option
  dropdownVisible.value = false
  msuProblemsLoading.value = true
  localStorage.setItem('mock-difficulty', option)
  generateMockProblemsPass()
}

function setupMock() {
  setupMockPass()
}

function toggleProblemViewer(probToToggle) {
  problemToggleloading.value = true
  if (probToToggle === 'one') {
    mock.navOne.classList.add('text-blue-700', 'dark:text-blue-500')
    mock.navOne.classList.remove('dark:text-white', 'text-gray-800')
    mock.navTwo.classList.remove('text-blue-700', 'dark:text-blue-500')
    mock.navTwo.classList.add('dark:text-white', 'text-gray-800')
    mock.navThree.classList.remove('text-blue-700', 'dark:text-blue-500')
    mock.navThree.classList.add('dark:text-white', 'text-gray-800')
    let problemData = getData(localStorage.getItem('mock-problems').split(',')[0])
    problem.title.innerText = problemData.title
    problem.subtitle.innerText = problemData.subtitle
    problem.text.innerHTML = problemData.problem
    problem.link.href = problemData.url
    problem.id.innerText = problemData.id
    if (problemData.division === 'platinum') {
      problem.id.classList.remove('is-bronze', 'is-silver', 'is-gold')
      problem.id.classList.add('is-platinum')
    }
    if (problemData.division === 'gold') {
      problem.id.classList.remove('is-bronze', 'is-silver', 'is-platinum')
      problem.id.classList.add('is-gold')
    }
    if (problemData.division === 'silver') {
      problem.id.classList.remove('is-bronze', 'is-gold', 'is-platinum')
      problem.id.classList.add('is-silver')
    }
    if (problemData.division === 'bronze') {
      problem.id.classList.remove('is-silver', 'is-gold', 'is-platinum')
      problem.id.classList.add('is-bronze')
    }
  }
  if (probToToggle === 'two') {
    mock.navOne.classList.remove('text-blue-700', 'dark:text-blue-500')
    mock.navOne.classList.add('dark:text-white', 'text-gray-800')
    mock.navTwo.classList.add('text-blue-700', 'dark:text-blue-500')
    mock.navTwo.classList.remove('dark:text-white', 'text-gray-800')
    mock.navThree.classList.remove('text-blue-700', 'dark:text-blue-500')
    mock.navThree.classList.add('dark:text-white', 'text-gray-800')
    let problemData = getData(localStorage.getItem('mock-problems').split(',')[1])
    problem.title.innerText = problemData.title
    problem.subtitle.innerText = problemData.subtitle
    problem.text.innerHTML = problemData.problem
    problem.link.href = problemData.url
    problem.id.innerText = problemData.id
    if (problemData.division === 'platinum') {
      problem.id.classList.remove('is-bronze', 'is-silver', 'is-gold')
      problem.id.classList.add('is-platinum')
    }
    if (problemData.division === 'gold') {
      problem.id.classList.remove('is-bronze', 'is-silver', 'is-platinum')
      problem.id.classList.add('is-gold')
    }
    if (problemData.division === 'silver') {
      problem.id.classList.remove('is-bronze', 'is-gold', 'is-platinum')
      problem.id.classList.add('is-silver')
    }
    if (problemData.division === 'bronze') {
      problem.id.classList.remove('is-silver', 'is-gold', 'is-platinum')
      problem.id.classList.add('is-bronze')
    }
  }
  if (probToToggle === 'three') {
    mock.navOne.classList.remove('text-blue-700', 'dark:text-blue-500')
    mock.navOne.classList.add('dark:text-white', 'text-gray-800')
    mock.navTwo.classList.remove('text-blue-700', 'dark:text-blue-500')
    mock.navTwo.classList.add('dark:text-white', 'text-gray-800')
    mock.navThree.classList.add('text-blue-700', 'dark:text-blue-500')
    mock.navThree.classList.remove('dark:text-white', 'text-gray-800')
    let problemData = getData(localStorage.getItem('mock-problems').split(',')[2])
    problem.title.innerText = problemData.title
    problem.subtitle.innerText = problemData.subtitle
    problem.text.innerHTML = problemData.problem
    problem.link.href = problemData.url
    problem.id.innerText = problemData.id
    if (problemData.division === 'platinum') {
      problem.id.classList.remove('is-bronze', 'is-silver', 'is-gold')
      problem.id.classList.add('is-platinum')
    }
    if (problemData.division === 'gold') {
      problem.id.classList.remove('is-bronze', 'is-silver', 'is-platinum')
      problem.id.classList.add('is-gold')
    }
    if (problemData.division === 'silver') {
      problem.id.classList.remove('is-bronze', 'is-gold', 'is-platinum')
      problem.id.classList.add('is-silver')
    }
    if (problemData.division === 'bronze') {
      problem.id.classList.remove('is-silver', 'is-gold', 'is-platinum')
      problem.id.classList.add('is-bronze')
    }
  }
  window.renderMathInElement(document.getElementById('problem-text'), {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
      { left: '\\(', right: '\\)', display: false },
      { left: '\\[', right: '\\]', display: true }
    ]
  })
  problemToggleloading.value = false
}

function setTimer(mock) {
  let timer = setInterval(() => {
    let seconds = parseInt(localStorage.getItem('mock-duration'))
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds % 3600) / 60)
    let secondsLeft = seconds % 60
    if (secondsLeft < 10) {
      secondsLeft = '0' + secondsLeft
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds === 0) {
      clearInterval(timer)
      mock.countdown.innerText = '00:00:00'
      createToast('Time is up!', 'fa-clock')
      triggerEnd()
    } else {
      mock.countdown.innerText = hours + ':' + minutes + ':' + secondsLeft
      localStorage.setItem('mock-duration', seconds - 1)
    }
  }, 1000)
  timerSet = true
}

function triggerEnd() {
  endModalSubmissionOne.value = getData(localStorage.getItem('mock-problems').split(',')[0]).url
  endModalSubmissionTwo.value = getData(localStorage.getItem('mock-problems').split(',')[1]).url
  endModalSubmissionThree.value = getData(localStorage.getItem('mock-problems').split(',')[2]).url
  endModal.value = true
}

onMounted(() => {
  const problemPass = {
    title: document.getElementById('problem-title'),
    subtitle: document.getElementById('problem-subtitle'),
    text: document.getElementById('problem-text'),
    link: document.getElementById('problem-link'),
    id: document.getElementById('problem-id')
  }

  const msuPass = {
    subtitle: document.getElementById('msu-subtitle'),
    settings: document.getElementById('msu-settings'),
    hoursThree: document.getElementById('msu-hours-three'),
    hoursFour: document.getElementById('msu-hours-four'),
    hoursFive: document.getElementById('msu-hours-five'),
    one: document.getElementById('msu-problem-one'),
    two: document.getElementById('msu-problem-two'),
    three: document.getElementById('msu-problem-three')
  }
  const mockPass = {
    countdown: document.getElementById('mock-countdown'),
    navOne: document.getElementById('mock-nav-one'),
    navTwo: document.getElementById('mock-nav-two'),
    navThree: document.getElementById('mock-nav-three')
  }
  const submitPass = {
    one: document.getElementById('endModal-one'),
    two: document.getElementById('endModal-two'),
    three: document.getElementById('endModal-three')
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      mock = mockPass
      msu = msuPass
      problem = problemPass
      submit = submitPass

      if (mockSetUp.value === false && localStorage.getItem('mock-set-up') === 'false') {
        timerSet = false
        if (localStorage.getItem('mock-duration') == null) {
          msu.hoursThree.classList.remove('bg-blue-500')
          msu.hoursFour.classList.add('bg-emerald-500')
          msu.hoursFive.classList.remove('bg-violet-500')
          localStorage.setItem('mock-duration', 14400)
        } else {
          let storagehours = parseInt(parseInt(localStorage.getItem('mock-duration')) / 3600)

          if (storagehours === 3) {
            msu.hoursThree.classList.add('bg-blue-500')
            msu.hoursFour.classList.remove('bg-emerald-500')
            msu.hoursFive.classList.remove('bg-violet-500')
            localStorage.setItem('mock-duration', 10800)
          }
          if (storagehours === 4) {
            msu.hoursThree.classList.remove('bg-blue-500')
            msu.hoursFour.classList.add('bg-emerald-500')
            msu.hoursFive.classList.remove('bg-violet-500')
            localStorage.setItem('mock-duration', 14400)
          }
          if (storagehours === 5) {
            msu.hoursThree.classList.remove('bg-blue-500')
            msu.hoursFour.classList.remove('bg-emerald-500')
            msu.hoursFive.classList.add('bg-violet-500')
            localStorage.setItem('mock-duration', 18000)
          }
        }
        localStorage.setItem('mock-problems', '')
        loading.value = false
        setTimeout(() => {
          msu.subtitle.classList.remove('opacity-0')
          msu.subtitle.classList.add('animate-fade-in')
        }, 500)
        setTimeout(() => {
          msu.settings.classList.remove('opacity-0')
          msu.settings.classList.add('animate-fade-in')
        }, 1500)
        generateMockProblems(db, user).then(() => {
          let titles = getTitles()
          problemOne.value = titles[0]
          problemTwo.value = titles[1]
          problemThree.value = titles[2]
          msuProblemsLoading.value = false
        })
      } else {
        if (mockSetUp.value === true && localStorage.getItem('mock-set-up') === 'true') {
          if (!timerSet) {
            setTimer(mock)
          }
          toggleProblemViewer('one')
        }
      }
      submitResultsPass = async function () {
        let one = submit.one.value.trim()
        let two = submit.two.value.trim()
        let three = submit.three.value.trim()

        // if one, two, or three are less than 0 or greater than 1, create a toast
        if (
          parseFloat(one) < 0 ||
          parseFloat(one) > 1 ||
          parseFloat(two) < 0 ||
          parseFloat(two) > 1 ||
          parseFloat(three) < 0 ||
          parseFloat(three) > 1
        ) {
          createToast(
            'One or more of your results are not correct. Make sure your decimals are between 0 and 1.',
            'fa-exclamation-triangle'
          )
        } else {
          let score = one * 333 + two * 333 + three * 333
          score = Math.round(score * 10) / 10
          // retrive user doc
          await retrieveUserDoc(db, user)
            .then((adoc) => {
              const data = adoc.data()
              const problemsSeen = data['problemsSeen']
              const problemsSolved = data['problemsSolved']
              const problemsSkipped = data['problemsSkipped']
              const problemsUnsolved = data['problemsUnsolved']

              for (let i = 0; i < 3; i++) {
                let status
                if (i === 0) {
                  if (one === '1') {
                    status = 'solved'
                  } else if (one === '') {
                    status = 'unsolved'
                  } else {
                    status = 'skipped'
                  }
                }
                if (i === 1) {
                  if (two === '1') {
                    status = 'solved'
                  } else if (two === '') {
                    status = 'unsolved'
                  } else {
                    status = 'skipped'
                  }
                }
                if (i === 2) {
                  if (three === '1') {
                    status = 'solved'
                  } else if (three === '') {
                    status = 'unsolved'
                  } else {
                    status = 'skipped'
                  }
                }
                if (!problemsSeen.includes(localStorage.getItem('mock-problems').split(',')[i])) {
                  problemsSeen.push(localStorage.getItem('mock-problems').split(',')[i])
                }
                if (status === 'solved') {
                  if (
                    !problemsSolved.includes(localStorage.getItem('mock-problems').split(',')[i])
                  ) {
                    problemsSolved.push(localStorage.getItem('mock-problems').split(',')[i])
                  }
                  if (
                    problemsSkipped.includes(localStorage.getItem('mock-problems').split(',')[i])
                  ) {
                    const index = problemsSkipped.indexOf(
                      localStorage.getItem('mock-problems').split(',')[i]
                    )
                    if (index > -1) {
                      problemsSkipped.splice(index, 1)
                    }
                  }
                  if (
                    problemsUnsolved.includes(localStorage.getItem('mock-problems').split(',')[i])
                  ) {
                    const index = problemsUnsolved.indexOf(
                      localStorage.getItem('mock-problems').split(',')[i]
                    )
                    if (index > -1) {
                      problemsUnsolved.splice(index, 1)
                    }
                  }
                }
                if (status === 'skipped') {
                  if (
                    !problemsSkipped.includes(localStorage.getItem('mock-problems').split(',')[i])
                  ) {
                    problemsSkipped.push(localStorage.getItem('mock-problems').split(',')[i])
                  }
                  if (
                    problemsSolved.includes(localStorage.getItem('mock-problems').split(',')[i])
                  ) {
                    const index = problemsSolved.indexOf(
                      localStorage.getItem('mock-problems').split(',')[i]
                    )
                    if (index > -1) {
                      problemsSolved.splice(index, 1)
                    }
                  }
                  if (
                    problemsUnsolved.includes(localStorage.getItem('mock-problems').split(',')[i])
                  ) {
                    const index = problemsUnsolved.indexOf(
                      localStorage.getItem('mock-problems').split(',')[i]
                    )
                    if (index > -1) {
                      problemsUnsolved.splice(index, 1)
                    }
                  }
                }
                if (status === 'unsolved') {
                  if (
                    !problemsUnsolved.includes(localStorage.getItem('mock-problems').split(',')[i])
                  ) {
                    problemsUnsolved.push(localStorage.getItem('mock-problems').split(',')[i])
                  }
                  if (
                    problemsSkipped.includes(localStorage.getItem('mock-problems').split(',')[i])
                  ) {
                    const index = problemsSkipped.indexOf(
                      localStorage.getItem('mock-problems').split(',')[i]
                    )
                    if (index > -1) {
                      problemsSkipped.splice(index, 1)
                    }
                  }
                  if (
                    problemsSolved.includes(localStorage.getItem('mock-problems').split(',')[i])
                  ) {
                    const index = problemsSolved.indexOf(
                      localStorage.getItem('mock-problems').split(',')[i]
                    )
                    if (index > -1) {
                      problemsSolved.splice(index, 1)
                    }
                  }
                }
                // update the document with the new arrays
                updateDoc(doc(db, 'user_data', user.uid), {
                  problemsSeen: problemsSeen,
                  problemsSolved: problemsSolved,
                  problemsSkipped: problemsSkipped,
                  problemsUnsolved: problemsUnsolved
                }).then(() => {
                  console.log('Updated user document.')
                })
              }
            })
            .then(() => {
              mockSetUp.value = false
              localStorage.setItem('mock-set-up', false)
              submit.one.value = ''
              submit.two.value = ''
              submit.three.value = ''
              localStorage.removeItem('mock-duration')
              localStorage.removeItem('mock-problems')
              createToast(
                'Your statistics are updated! You scored ' + score + ' on the mock contest.',
                'fa-check'
              )
              router.push('/statistics')
            })
        }
      }

      setupMockPass = function () {
        setTimer(mock)
        console.log('setting mocksetup to true')
        mockSetUp.value = true
        localStorage.setItem('mock-set-up', true)
        loading.value = false
        toggleProblemViewer('one')
      }
      toggleDurationPass = function (hours) {
        if (hours === 3) {
          msu.hoursThree.classList.add('bg-blue-500')
          msu.hoursFour.classList.remove('bg-emerald-500')
          msu.hoursFive.classList.remove('bg-violet-500')
          localStorage.setItem('mock-duration', 10800)
        }
        if (hours === 4) {
          msu.hoursThree.classList.remove('bg-blue-500')
          msu.hoursFour.classList.add('bg-emerald-500')
          msu.hoursFive.classList.remove('bg-violet-500')
          localStorage.setItem('mock-duration', 14400)
        }
        if (hours === 5) {
          msu.hoursThree.classList.remove('bg-blue-500')
          msu.hoursFour.classList.remove('bg-emerald-500')
          msu.hoursFive.classList.add('bg-violet-500')
          localStorage.setItem('mock-duration', 18000)
        }
      }
      generateMockProblemsPass = function () {
        generateMockProblems(db, user).then(() => {
          let titles = getTitles()
          problemOne.value = titles[0]
          problemTwo.value = titles[1]
          problemThree.value = titles[2]
          msuProblemsLoading.value = false
        })
      }
    } else {
      router.push('/login')
    }
  })

  async function generateMockProblems(db, user) {
    let array = []
    for (let i = 1; i <= 3; i++) {
      await retrieveUserDoc(db, user).then((adoc) => {
        // console.log("Retrieved user document.");
        const fsdata = adoc.data()
        const problemsSeen = fsdata['problemsSeen']
        let possibleProblem =
          problems[localStorage.getItem('mock-difficulty').toLowerCase()][
            Math.floor(
              Math.random() * problems[localStorage.getItem('mock-difficulty').toLowerCase()].length
            )
          ]
        let id = possibleProblem.id
        let number = possibleProblem.number
        while (problemsSeen.includes(id) || array.includes(id) || number != i) {
          console.log(id + ' is already seen. Generating new problem...')
          possibleProblem =
            problems[localStorage.getItem('mock-difficulty').toLowerCase()][
              Math.floor(
                Math.random() *
                  problems[localStorage.getItem('mock-difficulty').toLowerCase()].length
              )
            ]
          id = possibleProblem.id
          number = possibleProblem.number
        }
        console.log(number)
        array = array.concat(id)
      })
    }
    localStorage.setItem('mock-problems', array)
  }
  async function retrieveUserDoc(db, user) {
    return await getDoc(doc(db, 'user_data', user.uid))
  }
})

function getTitles() {
  let titles = []
  let idArray = localStorage.getItem('mock-problems').split(',')
  idArray.forEach((id) => {
    problems[localStorage.getItem('mock-difficulty').toLowerCase()].forEach((p) => {
      if (p.id === parseInt(id)) {
        titles.push(p.title)
      }
    })
  })
  return titles
}
function getData(id) {
  let data = {}
  problems[localStorage.getItem('mock-difficulty').toLowerCase()].forEach((p) => {
    if (p.id === parseInt(id)) {
      data = p
    }
  })
  return data
}
</script>
<style>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-in;
}
</style>
