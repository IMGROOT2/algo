<template>
  <div
    id="statsModal"
    tabindex="-1"
    class="hidden fixed right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 max-h-full mx-auto h-screen flex items-center justify-center bg-zinc-900/70"
  >
    <div class="relative w-full max-w-2xl max-h-full place-items-center place-self-center">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-zinc-800">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl text-gray-900 dark:text-white">
            Search <span id="statsTitle"></span> Problems
          </h3>
          <button
            type="button"
            class="toggleStatsModal text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                id="problemSearch"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Search by ID, name, or division..."
                @click.stop
                required
              />
            </div>
          </form>

          <div class="menu mt-4 overflow-y-scroll h-[calc(60vh-5rem)]">
            <ul id="searchMenu" class="menu-list"></ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <main class="w-full text-center flex items-center justify-center flex-col h-screen">
    <Loader id="load" size="16" />
    <div id="stats" class="m-4 hidden">
      <div class="text-center">
        <h1 class="title dark:text-white text-gray-700 text-2xl lg:text-4xl font-bold">
          Statistics for
          <span
            id="name"
            class="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent block lg:inline"
          ></span>
        </h1>
        <p class="subtitle dark:text-white text-gray-700 text-lg mb-4">
          Click on a statistic card to view the problems.
        </p>
        <div class="grid grid-cols-2 gap-6">
          <button id="solved-detail-button" class="w-full">
            <div
              id="solved-card"
              class="card bg-[#23d160] hover:scale-110 transition-all duration-300 rounded-lg shadow-lg"
            >
              <div class="card-content py-4 px-6">
                <p id="num-solved" class="title text-center text-white text-3xl font-bold"></p>
                <p class="subtitle text-center text-white text-lg font-semibold">Solved</p>
              </div>
            </div>
          </button>
          <button id="skipped-detail-button" class="w-full">
            <div
              id="skipped-card"
              class="card bg-[#ffdd57] hover:scale-110 transition-all duration-300 rounded-lg shadow-lg"
            >
              <div class="card-content py-4 px-6">
                <p id="num-skipped" class="title text-center text-white text-3xl font-bold"></p>
                <p class="subtitle text-center text-white text-lg font-semibold">Skipped</p>
              </div>
            </div>
          </button>
          <button id="unsolved-detail-button" class="w-full">
            <div
              id="unsolved-card"
              class="card bg-[#ff3860] hover:scale-110 transition-all duration-300 rounded-lg shadow-lg"
            >
              <div class="card-content py-4 px-6">
                <p id="num-unsolved" class="title text-center text-white text-3xl font-bold"></p>
                <p class="subtitle text-center text-white text-lg font-semibold">Unsolved</p>
              </div>
            </div>
          </button>
          <button id="seen-detail-button" class="w-full">
            <div
              id="seen-card"
              class="card bg-[#209cee] hover:scale-110 transition-all duration-300 rounded-lg shadow-lg"
            >
              <div class="card-content py-4 px-6">
                <p id="num-seen" class="title text-center text-white text-3xl font-bold"></p>
                <p class="subtitle text-center text-white text-lg font-semibold">Seen</p>
              </div>
            </div>
          </button>
        </div>
        <div class="w-3/4 mx-auto mt-8">
          <div>
            <canvas id="chart" class="mx-auto"></canvas>
          </div>
          <br />
          <div id="showWhenZero" class="hidden">
            <h1 class="title text-white text-3xl font-bold mb-2">No Problems Seen!</h1>
            <p class="subtitle text-white text-lg">
              Go to <a href="/solve" class="page-link">Solve</a> and solve a few problems!
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { auth, db } from '../app-config'
import { doc, getDoc } from 'firebase/firestore'
import Chart from 'chart.js/auto'
import { onAuthStateChanged } from 'firebase/auth'
import * as problems from '../public/data/data.json'
import { onMounted } from 'vue'
import Loader from '../components/Loader.vue'
import createToast from '../toast'
let pSeen = []
let pSolved = []
let pSkipped = []
let pUnsolved = []
let pSeenSearch = []
let pSolvedSearch = []
let pSkippedSearch = []
let pUnsolvedSearch = []

onMounted(() => {
  const name = document.getElementById('name')
  const numSolved = document.getElementById('num-solved')
  const numSeen = document.getElementById('num-seen')
  const numSkipped = document.getElementById('num-skipped')
  const numUnsolved = document.getElementById('num-unsolved')
  const chart = document.getElementById('chart')
  const load = document.getElementById('load')
  const stats = document.getElementById('stats')
  stats.classList.add('hidden')
  const statsModal = document.getElementById('statsModal')
  const toggleStatsModal = document.getElementsByClassName('toggleStatsModal')
  const statsTitle = document.getElementById('statsTitle')
  const problemSearch = document.getElementById('problemSearch')
  const searchMenu = document.getElementById('searchMenu')

  const detail = {
    solved: document.getElementById('solved-detail-button'),
    seen: document.getElementById('seen-detail-button'),
    skipped: document.getElementById('skipped-detail-button'),
    unsolved: document.getElementById('unsolved-detail-button')
  }

  function showStatsModal(type) {
    statsTitle.innerText = type.charAt(0).toUpperCase() + type.slice(1)
    if (type === 'solved') {
      statsTitle.style.color = '#23d160'
      searchMenu.innerHTML = ''
      pSolved.forEach((id) => {
        const info = getInfo(id)
        const li = document.createElement('li')
        const a = document.createElement('a')
        const span = document.createElement('span')
        span.classList.add('rounded-md', 'text-white', 'text-sm', 'ml-2', 'px-1')
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
        let toPush = id + ' ' + info.title.substring(11).toLowerCase() + ' ' + info.division
        pSolvedSearch.push(toPush)
        a.classList.add(
          'text-gray-700',
          'dark:text-white',
          'hover:text-gray-900',
          'dark:hover:text-gray-200'
        )
        a.href = '/problem/' + id
        a.innerText += info.title.substring(11)
        a.appendChild(span)
        li.appendChild(a)
        li.classList.add('mt-3')
        searchMenu.appendChild(li)
      })
      localStorage.setItem('ModalType', 'solved')
    }
    if (type === 'seen') {
      statsTitle.style.color = '#209cee'
      searchMenu.innerHTML = ''
      pSeen.forEach((id) => {
        const info = getInfo(id)
        const li = document.createElement('li')
        const a = document.createElement('a')
        const span = document.createElement('span')
        span.classList.add('rounded-md', 'text-white', 'text-sm', 'ml-2', 'px-1')
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
        console.log(info)
        let toPush = id + ' ' + info.title.substring(11).toLowerCase() + ' ' + info.division
        pSeenSearch.push(toPush)
        a.classList.add(
          'text-gray-700',
          'dark:text-white',
          'hover:text-gray-900',
          'dark:hover:text-gray-200'
        )
        a.href = '/problem/' + id
        a.innerText += info.title.substring(11)
        a.appendChild(span)
        li.appendChild(a)
        li.classList.add('mt-3')
        searchMenu.appendChild(li)
      })
      localStorage.setItem('ModalType', 'seen')
    }
    if (type === 'skipped') {
      statsTitle.style.color = '#ffdd57'
      searchMenu.innerHTML = ''
      pSkipped.forEach((id) => {
        const info = getInfo(id)
        const li = document.createElement('li')
        const a = document.createElement('a')
        const span = document.createElement('span')
        span.classList.add('rounded-md', 'text-white', 'text-sm', 'ml-2', 'px-1')
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
        let toPush = id + ' ' + info.title.substring(11).toLowerCase() + ' ' + info.division
        pSkippedSearch.push(toPush)
        a.classList.add(
          'text-gray-700',
          'dark:text-white',
          'hover:text-gray-900',
          'dark:hover:text-gray-200'
        )
        a.href = '/problem/' + id
        a.innerText += info.title.substring(11)
        a.appendChild(span)
        li.appendChild(a)
        li.classList.add('mt-3')
        searchMenu.appendChild(li)
      })
      localStorage.setItem('ModalType', 'skipped')
    }
    if (type === 'unsolved') {
      statsTitle.style.color = '#ff3860'
      searchMenu.innerHTML = ''
      pUnsolved.forEach((id) => {
        const info = getInfo(id)
        const li = document.createElement('li')
        const a = document.createElement('a')
        const span = document.createElement('span')
        span.classList.add('rounded-md', 'text-white', 'text-sm', 'ml-2', 'px-1')
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
        let toPush = id + ' ' + info.title.substring(11).toLowerCase() + ' ' + info.division
        pUnsolvedSearch.push(toPush)
        a.classList.add(
          'text-gray-700',
          'dark:text-white',
          'hover:text-gray-900',
          'dark:hover:text-gray-200'
        )
        a.href = '/problem/' + id
        a.innerText += info.title.substring(11)
        a.appendChild(span)
        li.appendChild(a)
        li.classList.add('mt-3')
        searchMenu.appendChild(li)
      })
      localStorage.setItem('ModalType', 'unsolved')
    }
    problemSearch.value = ''
    statsModal.classList.toggle('hidden')
  }
  try {
  for (let i = 0; i < toggleStatsModal.length; i++) {
    toggleStatsModal[i].addEventListener('click', () => {
      statsModal.classList.toggle('hidden')
    })
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      name.innerText = user.displayName
      await retrieveUserDoc(db, user).then((adoc) => {
        console.log('General info')
        console.log(adoc.data())
      })

      await retrieveUserDoc(db, user).then(async (adoc) => {
        const data = adoc.data()
        const problemsSeen = data['problemsSeen']
        const problemsSolved = data['problemsSolved']
        const problemsSkipped = data['problemsSkipped']
        const problemsUnsolved = data['problemsUnsolved']

        numSeen.innerText = problemsSeen.length
        numSolved.innerText = problemsSolved.length
        numSkipped.innerText = problemsSkipped.length
        numUnsolved.innerText = problemsUnsolved.length

        if (problemsSeen.length === 0) {
          console.log("?d");
          detail['seen'].disabled = true
        }
        if (problemsSolved.length === 0) {
          console.log("?d");
          detail['solved'].disabled = true
        }
        if (problemsSkipped.length === 0) {
          console.log("?d");
          detail['skipped'].disabled = true
        }
        if (problemsUnsolved.length === 0) {
          console.log("?d");
          detail['unsolved'].disabled = true
        }

        pSeen = problemsSeen
        pSolved = problemsSolved
        pSkipped = problemsSkipped
        pUnsolved = problemsUnsolved
        load.classList.add('hidden')
        stats.classList.remove('hidden')
        await genChart(problemsSolved.length, problemsSkipped.length, problemsUnsolved.length)
        for (const [key, value] of Object.entries(detail)) {
          value.addEventListener('click', () => {
            try {
              showStatsModal(key, user)
            }
            catch (e) {
              createToast('An error occurred while loading the statistics modal.', 'fa-triangle-exclamation')
            }
          })
        }
      })
    } else {
      location.href = '/login'
    }
  })
}
catch (e) {
  createToast('An error occurred while loading the statistics page.', 'fa-triangle-exclamation')
}
  async function retrieveUserDoc(db, user) {
    return await getDoc(doc(db, 'user_data', user.uid))
  }

  async function genChart(solved, skipped, unsolved) {
    if (solved + skipped + unsolved !== 0) {
      document.getElementById('showWhenZero').classList.add('hidden')
      new Chart(chart, {
        type: 'pie',
        data: {
          labels: ['Unsolved', 'Solved', 'Skipped'],
          datasets: [
            {
              data: [unsolved, solved, skipped],
              backgroundColor: ['hsl(348, 100%, 61%)', 'hsl(141, 71%, 48%)', 'hsl(48, 100%, 67%)'],
              hoverOffset: 3
            }
          ]
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  var label = context.label || ''
                  if (label) {
                    label += '   '
                  }
                  var value = context.parsed || 0
                  var percentage = (value / context.dataset.data.reduce((a, b) => a + b)) * 100
                  percentage = percentage.toFixed(2)
                  label = percentage + '%'
                  return label
                }
              }
            }
          }
        }
      })
    } else {
      document.getElementById('showWhenZero').classList.remove('hidden')
    }
  }
  function getInfo(id) {
    let generated = {}
    let found = false
    let divisions = ['bronze', 'silver', 'gold', 'platinum']
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
  problemSearch.addEventListener('input', (e) => {
    e.preventDefault()
    searchAndUpdate()
  })

  function searchAndUpdate() {
    let type = localStorage.getItem('ModalType')
    let value = problemSearch.value.toLowerCase()
    let array = []
    if (type === 'seen') {
      array = pSeenSearch
    }
    if (type === 'solved') {
      array = pSolvedSearch
    }
    if (type === 'skipped') {
      array = pSkippedSearch
    }
    if (type === 'unsolved') {
      array = pUnsolvedSearch
    }
    let filtered = array.filter((problem) => {
      if (problem.includes(value)) {
        console.log('found that ' + value + 'is in ' + problem)
      } else {
        console.log('found that ' + value + 'is not in ' + problem)
      }
      return problem.includes(value)
    })
    console.log(filtered)
    // clear the menu, then add the filtered items
    searchMenu.innerHTML = ''
    filtered.forEach((problem) => {
      let id = problem.split(' ')[0]
      let info = getInfo(id)
      const li = document.createElement('li')
      const a = document.createElement('a')
      const span = document.createElement('span')
      span.classList.add('rounded-md', 'text-white', 'text-sm', 'ml-2', 'px-1')
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
      a.classList.add(
        'text-gray-700',
        'dark:text-white',
        'hover:text-gray-900',
        'dark:hover:text-gray-200'
      )
      a.href = '/problem/' + id
      a.innerText += info.title.substring(11)
      a.appendChild(span)
      li.appendChild(a)
      li.classList.add('mt-3')
      searchMenu.appendChild(li)
    })
  }
})
</script>
