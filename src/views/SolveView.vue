<template>
  <main class="lg:flex items-center w-full flex-1">
    <button
      id="sidebar-switcher"
      class="hidden lg:block transition-all w-8 h-8 absolute top-[13vh] left-[5vh] duration-500"
    >
      <i
        class="fa-solid fa-circle-chevron-left text-2xl cursor-pointer text-emerald-300 hover:text-emerald-400 dark:text-emerald-400 dark:hover:text-emerald-500"
      ></i>
    </button>
    <button
      id="sidebar-switcher-mobile"
      class="block lg:hidden transition-all w-8 h-8 relative mx-auto mt-2 duration-500"
    >
      <i
        class="fa-solid fa-circle-chevron-up text-2xl cursor-pointer text-emerald-300 hover:text-emerald-400 dark:text-emerald-400 dark:hover:text-emerald-500"
      ></i>
    </button>
    <div
      id="sidebar"
      class="flex flex-col items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-5 lg:w-[20vw] lg:h-screen lg:ml-8 text-center mt-5 lg:mt-20 mx-5 transition-all mb-5 duration-500"
    >
      <h1 class="text-3xl text-gray-600 dark:text-white font-bold mb-8">Options</h1>
      <div
        class="shadow-xl rounded-lg p-3 my-3 border-2 dark:border-gray-700 border-gray-200 w-11/12 transition-all"
      >
        <p class="text-gray-900 dark:text-white text-xl mb-3">Configure Problem</p>
        <div id="diff-dropdown">
          <button
            id="diff-trigger"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            <span id="diff-label">{{ optionsExists ? currentOption : 'Difficulty' }} </span>
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
          <!-- Dropdown menu -->
          <div
            id="diff-menu"
            class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-zinc-700 mx-auto mt-3"
          >
            <ul class="py-2 text-xs text-gray-700 dark:text-gray-200">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item"
                  >Bronze</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item"
                  >Silver</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item"
                  >Gold</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item"
                  >Platinum</a
                >
              </li>
            </ul>
          </div>
        </div>
        <button
          id="generate-button"
          class="mt-2 text-xs font-medium px-5 py-2.5 text-white focus:outline-none focus:ring-2 rounded-lg transition-all duration-200 bg-gradient-to-t from-[#3072D6] to-[#27C877] bg-size-200 bg-pos-0 hover:bg-pos-100 focus:ring-white"
          v-show="!problemShown && !loading"
        >
          <span>New Problem</span>
        </button>
      </div>
      <div
        id="recordstatus"
        class="shadow-xl rounded-lg p-3 my-3 border-2 dark:border-gray-700 border-gray-200 w-11/12"
        v-show="problemShown"
      >
        <p class="text-gray-900 dark:text-white text-xl mb-3">Record Status</p>
        <button
          id="green"
          class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs my-1 px-5 py-2.5 mx-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="button"
        >
          <span>Solved!</span>
        </button>
        <button
          id="yellow"
          class="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs my-1 px-5 mx-1 py-2.5 text-center inline-flex items-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          type="button"
        >
          <span>Attempted, skip.</span>
        </button>
        <button
          id="red"
          class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs my-1 px-5 py-2.5 mx-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          type="button"
        >
          <span>Unsolved, skip.</span>
        </button>
      </div>
    </div>
    <div
      class="w-full mr-8 flex items-center justify-center h-full"
      id="problem-loader"
      v-show="loading"
    >
      <Loader size="16" />
    </div>
    <div
      class="w-full mr-8 flex items-center justify-center h-full"
      id="problem-gen-dialog"
      v-show="!problemShown && !loading"
    >
      <h1 class="text-gray-700 dark:text-white text-2xl">Generate a new problem to get started!</h1>
    </div>
    <div class="w-full mr-8 flex" id="problem" v-show="!loading && problemShown">
      <div class="mx-auto">
        <div class="py-4">
          <div class="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
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
        <div class="dark:bg-zinc-800 bg-zinc-100 p-5 rounded-lg mx-3">
          <div class="p-4 lg:p-8 flex flex-1 h-screen">
            <div
              class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400 flex-1 overflow-y-auto"
            >
              <p class="mb-4" id="problem-text"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
    integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
    crossorigin="anonymous"
  />
</template>
<script setup>
import * as problems from '../public/data/data.json'
import Loader from '../components/Loader.vue'
import 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js'
import 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js'
import { auth, db } from '../app-config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { ref, onMounted } from 'vue'
import createToast from '../toast'
import router from '../router'

let loading = ref(true)
let problemShown = ref(false)
let optionsExists = ref(false)
let currentOption = ref('')

onMounted(() => {
  const options = {
    label: document.getElementById('diff-label'), // done
    trigger: document.getElementById('diff-trigger'), // done
    menu: document.getElementById('diff-menu'), // done
    items: document.getElementsByClassName('dropdown-item'), // done
    generate: document.getElementById('generate-button'), // done
    dropdown: document.getElementById('diff-dropdown'), // done
    green: document.getElementById('green'), // done
    yellow: document.getElementById('yellow'), // done
    red: document.getElementById('red'), // done
    record: document.getElementById('recordstatus'), // done
    toggleModal: document.getElementsByClassName('toggleModal'), // done
    recordModal: document.getElementById('recordModal') // done
  }

  const problem = {
    link: document.getElementById('problem-link'),
    id: document.getElementById('problem-id'),
    problem: document.getElementById('problem'),
    title: document.getElementById('problem-title'),
    subtitle: document.getElementById('problem-subtitle'),
    text: document.getElementById('problem-text'),
    loader: document.getElementById('problem-loader'),
    genDialog: document.getElementById('problem-gen-dialog')
  }

  const sidebar = {
    switcher: document.getElementById('sidebar-switcher'),
    switcherMobile: document.getElementById('sidebar-switcher-mobile'),
    sidebar: document.getElementById('sidebar')
  }

  let user
  onAuthStateChanged(auth, async (auser) => {
    user = auser
    if (user) {
      console.log(user.uid)
      await checkIfFS(db, user)
      if (localStorage.getItem('options') !== null) {
        for (let i = 0; i < options.items.length; i++) {
          if (options.items[i].innerText === localStorage.getItem('options')) {
            options.items[i].classList.add('bg-gray-100', 'dark:bg-gray-600', 'dark:text-white')
            currentOption.value = options.items[i].innerText
            optionsExists.value = true
          }
        }
      }
      try {
        if (localStorage.getItem('problem') !== null) {
          const result = await generateProblem(
            'custom-id',
            [localStorage.getItem('problem'), localStorage.getItem('options')],
            user
          )
          if (result === 'success') {
            loading.value = false
            problemShown.value = true
            createToast('Restored previous problem!', 'fa-circle-check')
          } else if (result === 'error') {
            createToast("Oops! Couldn't load previous problem.", 'fa-triangle-exclamation')
            console.error('Issue with generateProblem().')
            loading.value = false
            problemShown.value = false
          }
        } else {
          loading.value = false
          problemShown.value = false
        }
      } catch (err) {
        createToast("Oops! Couldn't load previous problem.", 'fa-triangle-exclamation')
        loading.value = false
        problemShown.value = false
      }

      options.green.addEventListener('click', async () => {
        if (optionsExists.value === false) {
          createToast(
            "Oops! You don't have a problem to record your status on yet. Generate a problem, and try again.",
            'fa-triangle-exclamation'
          )
          return
        } else {
          loading.value = true
          problemShown.value = false
          try {
            await retrieveUserDoc(db, user).then((adoc) => {
              const data = adoc.data()
              const problemsSeen = data['problemsSeen']
              const problemsSolved = data['problemsSolved']
              const problemsSkipped = data['problemsSkipped']
              const problemsUnsolved = data['problemsUnsolved']
              // if the problem is not in the problems seen array, add it
              if (!problemsSeen.includes(localStorage.getItem('problem'))) {
                problemsSeen.push(localStorage.getItem('problem'))
              }
              // if the problem is not in the problems solved array, add it
              if (!problemsSolved.includes(localStorage.getItem('problem'))) {
                problemsSolved.push(localStorage.getItem('problem'))
              }
              // if the problem is in the problems unsolved array, remove it
              if (problemsUnsolved.includes(localStorage.getItem('problem'))) {
                const index = problemsUnsolved.indexOf(localStorage.getItem('problem'))
                if (index > -1) {
                  problemsUnsolved.splice(index, 1)
                }
              }
              // if the problem is in the problems skipped array, remove it
              if (problemsSkipped.includes(localStorage.getItem('problem'))) {
                const index = problemsSkipped.indexOf(localStorage.getItem('problem'))
                if (index > -1) {
                  problemsSkipped.splice(index, 1)
                }
              }
              // update the document with the new arrays
              updateDoc(doc(db, 'user_data', user.uid), {
                problemsSeen: problemsSeen,
                problemsSolved: problemsSolved,
                problemsSkipped: problemsSkipped,
                problemsUnsolved: problemsUnsolved
              }).then(() => {
                console.log(
                  'Updated user document: Problem ID ' +
                    localStorage.getItem('problem') +
                    ' solved.'
                )
              })
            })
            const result = await generateProblem(
              'random-id',
              localStorage.getItem('options').toLowerCase(),
              user
            )
            if (result === 'error') {
              createToast(
                'Error generating problem. Please try again later.',
                'fa-triangle-exclamation'
              )
              console.error('Issue with generateProblem().')

              loading.value = false
              problemShown.value = false
            } else if (result === 'success') {
              loading.value = false
              problemShown.value = true
              createToast('New problem generated!', 'fa-circle-check')
            }
          } catch (err) {
            createToast(
              'Error generating problem. Please try again later.',
              'fa-triangle-exclamation'
            )

            loading.value = false
            problemShown.value = false
          }
        }
      })
      options.yellow.addEventListener('click', async () => {
        if (optionsExists.value === false) {
          createToast(
            "Oops! You don't have a problem to record your status on yet. Generate a problem, and try again.",
            'fa-triangle-exclamation'
          )
          return
        } else {
          loading.value = true
          problemShown.value = false
          try {
            await retrieveUserDoc(db, user).then((adoc) => {
              const data = adoc.data()
              const problemsSeen = data['problemsSeen']
              const problemsSolved = data['problemsSolved']
              const problemsSkipped = data['problemsSkipped']
              const problemsUnsolved = data['problemsUnsolved']
              // if the problem is not in the problems seen array, add it
              if (!problemsSeen.includes(localStorage.getItem('problem'))) {
                problemsSeen.push(localStorage.getItem('problem'))
              }
              // if the problem is not in the problems skipped array, add it
              if (!problemsSkipped.includes(localStorage.getItem('problem'))) {
                problemsSkipped.push(localStorage.getItem('problem'))
              }
              // if the problem is in the problems unsolved array, remove it
              if (problemsUnsolved.includes(localStorage.getItem('problem'))) {
                const index = problemsUnsolved.indexOf(localStorage.getItem('problem'))
                if (index > -1) {
                  problemsUnsolved.splice(index, 1)
                }
              }
              // if the problem is in the problems solved array, remove it
              if (problemsSolved.includes(localStorage.getItem('problem'))) {
                const index = problemsSolved.indexOf(localStorage.getItem('problem'))
                if (index > -1) {
                  problemsSolved.splice(index, 1)
                }
              }
              // update the document with the new arrays
              updateDoc(doc(db, 'user_data', user.uid), {
                problemsSeen: problemsSeen,
                problemsSolved: problemsSolved,
                problemsSkipped: problemsSkipped,
                problemsUnsolved: problemsUnsolved
              }).then(() => {
                console.log(
                  'Updated user document: Problem ID ' +
                    localStorage.getItem('problem') +
                    ' skipped.'
                )
              })
            })
            const result = await generateProblem(
              'random-id',
              localStorage.getItem('options').toLowerCase(),
              user
            )
            if (result === 'error') {
              createToast(
                'Error generating problem. Please try again later.',
                'fa-triangle-exclamation'
              )
              console.error('Issue with generateProblem().')
            } else if (result === 'success') {
              loading.value = false
              problemShown.value = true
              createToast('New problem generated!', 'fa-circle-check')
            }
          } catch (err) {
            createToast(
              'Error generating problem. Please try again later.',
              'fa-triangle-exclamation'
            )

            loading.value = false
            problemShown.value = false
          }
        }
      })
      options.red.addEventListener('click', async () => {
        if (optionsExists.value === false) {
          createToast(
            "Oops! You don't have a problem to record your status on yet. Generate a problem, and try again.",
            'fa-triangle-exclamation'
          )
          return
        } else {
          loading.value = true
          problemShown.value = false
          try {
            await retrieveUserDoc(db, user).then((adoc) => {
              const data = adoc.data()
              const problemsSeen = data['problemsSeen']
              const problemsSolved = data['problemsSolved']
              const problemsSkipped = data['problemsSkipped']
              const problemsUnsolved = data['problemsUnsolved']
              // if the problem is not in the problems seen array, add it
              if (!problemsSeen.includes(localStorage.getItem('problem'))) {
                problemsSeen.push(localStorage.getItem('problem'))
              }
              // if the problem is not in the problems unsolved array, add it
              if (!problemsUnsolved.includes(localStorage.getItem('problem'))) {
                problemsUnsolved.push(localStorage.getItem('problem'))
              }
              // if the problem is in the problems solved array, remove it
              if (problemsSolved.includes(localStorage.getItem('problem'))) {
                const index = problemsSolved.indexOf(localStorage.getItem('problem'))
                if (index > -1) {
                  problemsSolved.splice(index, 1)
                }
              }
              // if the problem is in the problems skipped array, remove it
              if (problemsSkipped.includes(localStorage.getItem('problem'))) {
                const index = problemsSkipped.indexOf(localStorage.getItem('problem'))
                if (index > -1) {
                  problemsSkipped.splice(index, 1)
                }
              }
              // update the document with the new arrays
              updateDoc(doc(db, 'user_data', user.uid), {
                problemsSeen: problemsSeen,
                problemsSolved: problemsSolved,
                problemsSkipped: problemsSkipped,
                problemsUnsolved: problemsUnsolved
              }).then(() => {
                console.log(
                  'Updated user document: Problem ID ' +
                    localStorage.getItem('problem') +
                    ' unsolved.'
                )
              })
            })
            const result = await generateProblem(
              'random-id',
              localStorage.getItem('options').toLowerCase(),
              user
            )
            if (result === 'error') {
              createToast(
                'Error generating problem. Please try again later.',
                'fa-triangle-exclamation'
              )
              console.error('Issue with generateProblem().')
            } else if (result === 'success') {
              loading.value = false
              problemShown.value = true
              createToast('New problem generated!', 'fa-circle-check')
            }
          } catch (err) {
            createToast(
              'Error generating problem. Please try again later.',
              'fa-triangle-exclamation'
            )

            loading.value = false
            problemShown.value = false
          }
        }
      })
    } else {
      // use router push to login
      router.push('/login')
    }
  })
  for (let i = 0; i < options.items.length; i++) {
    options.items[i].addEventListener('click', () => {
      options.menu.classList.toggle('hidden')
      options.label.innerText = options.items[i].innerText
      let previous = localStorage.getItem('options')
      localStorage.setItem('options', options.items[i].innerText)
      optionsExists.value = true
      currentOption.value = options.items[i].innerText
      for (let j = 0; j < options.items.length; j++) {
        options.items[j].classList.remove('bg-gray-100', 'dark:bg-gray-600', 'dark:text-white')
      }
      options.items[i].classList.add('bg-gray-100', 'dark:bg-gray-600', 'dark:text-white')
      if (previous !== localStorage.getItem('options')) {
        loading.value = true
        problemShown.value = false
        generateProblem('random-id', localStorage.getItem('options').toLowerCase(), user).then(
          (result) => {
            if (result === 'error') {
              createToast(
                'Error generating problem. Please try again later.',
                'fa-triangle-exclamation'
              )
              console.error('Issue with generateProblem().')

              loading.value = false
              problemShown.value = false
            } else if (result === 'success') {
              loading.value = false
              problemShown.value = true
              createToast('New problem generated!', 'fa-circle-check')
            }
          }
        )
      }
    })
  }
  options.generate.addEventListener('click', async () => {
    loading.value = true
    problemShown.value = false
    try {
      if (localStorage.getItem('options') === null) {
        createToast(
          "Oops! You haven't selected a difficulty. Select a difficulty and try again.",
          'fa-triangle-exclamation'
        )
        loading.value = false
        problemShown.value = false
      } else {
        const result = await generateProblem(
          'random-id',
          localStorage.getItem('options').toLowerCase(),
          user
        )
        if (result === 'error') {
          createToast(
            'Error generating problem. Please try again later.',
            'fa-triangle-exclamation'
          )
          console.error('Issue with generateProblem().')

          loading.value = false
          problemShown.value = false
        } else if (result === 'success') {
          loading.value = false
          problemShown.value = true
          createToast('New problem generated!', 'fa-circle-check')
        }
      }
    } catch (err) {
      createToast('Error generating problem. Please try again later.', 'fa-triangle-exclamation')
      loading.value = false
      problemShown.value = false
    }
  })

  async function generateProblem(idType, data, user) {
    return new Promise(async (resolve) => { // eslint-disable-line no-async-promise-executor
      try {
        let id = -1
        let div = ''
        if (idType === 'random-id') {
          div = data.toLowerCase()
          // console.log("Generating random problem...");
          await retrieveUserDoc(db, user).then((adoc) => {
            // console.log("Retrieved user document.");
            const fsdata = adoc.data()
            const problemsSeen = fsdata['problemsSeen']
            // console.log("Retrieved user document.2");
            id = problems[data][Math.floor(Math.random() * problems[data].length)].id
            while (problemsSeen.includes(id)) {
              console.log(id + ' is already seen. Generating new problem...')
              id = problems[data][Math.floor(Math.random() * problems[data].length)].id
            }
          })
        } else if (idType === 'custom-id') {
          // set id to data[0] in int form
          id = parseInt(data[0])
          div = data[1].toLowerCase()
        }
        let generated = {}
        // console.log("id: " + id + ", div: " + div);
        problems[div].every((p) => {
          if (p.id === id) {
            generated = p
            return false
          }
          return true
        })
        if (Object.prototype.hasOwnProperty.call(generated, 'id')) {
          console.log('Found problem with id ' + id + '.')
          try {
            problem.title.innerText = generated.title
            problem.subtitle.innerText = generated.subtitle
            problem.text.innerHTML = generated.problem
            problem.link.href = generated.url
            switch (generated.division) {
              case 'platinum':
                problem.id.classList.remove('is-bronze', 'is-silver', 'is-gold', 'is-primary')
                problem.id.classList.add('is-platinum')
                break
              case 'gold':
                problem.id.classList.remove('is-bronze', 'is-silver', 'is-platinum', 'is-primary')
                problem.id.classList.add('is-gold')
                break
              case 'silver':
                problem.id.classList.remove('is-bronze', 'is-gold', 'is-platinum', 'is-primary')
                problem.id.classList.add('is-silver')
                break
              case 'bronze':
                problem.id.classList.remove('is-silver', 'is-gold', 'is-platinum', 'is-primary')
                problem.id.classList.add('is-bronze')
                break
              default:
                problem.id.classList.remove('is-bronze', 'is-silver', 'is-gold', 'is-platinum')
                problem.id.classList.add('is-primary')
            }
            problem.id.innerText = 'ID: ' + generated.id
          } catch (err) {
            createToast(err.message, 'fa-triangle-exclamation')
            console.log('oops1')
            resolve('error')
          }
          window.renderMathInElement(document.getElementById('problem-text'), {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\(', right: '\\)', display: false },
              { left: '\\[', right: '\\]', display: true }
            ]
          })
          localStorage.setItem('problem', id)
          resolve('success')
        }
      } catch (err) {
        createToast(err.message, 'fa-triangle-exclamation')
        console.log('oops2')
        resolve('error')
      }
    })
  }

  options.trigger.addEventListener('click', () => {
    options.menu.classList.toggle('hidden')
  })

  async function retrieveUserDoc(db, user) {
    return await getDoc(doc(db, 'user_data', user.uid))
  }

  for (let i = 0; i < options.toggleModal.length; i++) {
    options.toggleModal[i].addEventListener('click', () => {
      options.recordModal.classList.toggle('is-active')
    })
  }

  sidebar.switcher.addEventListener('click', () => {
    sidebar.sidebar.classList.add('transition-all')
    sidebar.sidebar.classList.toggle('relative')
    sidebar.sidebar.classList.toggle('-z-10')
    sidebar.switcher.classList.toggle('rotate-180')
    sidebar.sidebar.classList.toggle('w-10')
    sidebar.sidebar.classList.toggle('lg:w-[20vw]')
    if (sidebar.sidebar.classList.contains('-translate-x-full')) {
      sidebar.sidebar.classList.remove('-translate-x-full')
      sidebar.sidebar.classList.add('translate-x-full')
    } else {
      sidebar.sidebar.classList.add('-translate-x-full')
      sidebar.sidebar.classList.remove('-translate-x-full')
    }
  })
  sidebar.switcherMobile.addEventListener('click', () => {
    sidebar.sidebar.classList.add('transition-all')
    sidebar.sidebar.classList.toggle('relative')
    sidebar.sidebar.classList.toggle('-z-10')
    sidebar.switcherMobile.classList.toggle('rotate-180')
    sidebar.sidebar.classList.toggle('h-0')
    sidebar.sidebar.classList.toggle('p-5')
    sidebar.sidebar.classList.toggle('mt-5')
    if (sidebar.sidebar.classList.contains('-translate-y-full')) {
      sidebar.sidebar.classList.remove('-translate-y-full')
      sidebar.sidebar.classList.add('translate-y-full')
    } else {
      sidebar.sidebar.classList.add('-translate-y-full')
      sidebar.sidebar.classList.remove('-translate-y-full')
    }
  })

  async function checkIfFS(db, user) {
    await retrieveUserDoc(db, user).then((adoc) => {
      const fsdata = adoc.data()
      if (!Object.prototype.hasOwnProperty.call(fsdata, 'problemsSeen')) {
        updateDoc(doc(db, 'user_data', user.uid), {
          problemsSeen: [],
          problemsSolved: [],
          problemsSkipped: [],
          problemsUnsolved: []
        })
      }
    })
  }
})
</script>
<style scoped>
::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
