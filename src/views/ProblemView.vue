<template>
  <main class="flex items-center justify-center flex-col w-full mx-auto min-h-screen">
    <Loader size="16" id="load" />
    <div class="hidden w-screen lg:w-auto" id="problem">
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
            <span
              id="problem-id"
              class="text-gray-900 dark:text-white rounded-md px-2 py-1 text-sm"
            ></span>
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
import * as problems from '../assets/data/data.json'
import { onMounted } from 'vue'
import createToast from '../toast'
import Loader from '../components/Loader.vue'
import 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js'
import 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js'

const props = defineProps({
  id: String
})

onMounted(() => {
  const problemDiv = document.getElementById('problem')
  const load = document.getElementById('load')

  const problem = {
    title: document.getElementById('problem-title'),
    subtitle: document.getElementById('problem-subtitle'),
    text: document.getElementById('problem-text'),
    link: document.getElementById('problem-link'),
    id: document.getElementById('problem-id')
  }

  let id = parseInt(props.id)
  generateProblem(id)

  function generateProblem(id) {
    try {
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
      if (!found) {
        location.href = '/404'
        console.log('oops')
      }
      try {
        problem.title.innerText = generated.title
        problem.subtitle.innerText = generated.subtitle
        problem.text.innerHTML = generated.problem
        problem.link.href = generated.url
        problem.link.classList.remove('is-hidden')
        problem.id.classList.remove('is-hidden')
        switch (generated.division) {
          case 'platinum':
            problem.id.classList.remove('is-bronze', 'is-silver', 'is-gold')
            problem.id.classList.add('is-platinum')
            break
          case 'gold':
            problem.id.classList.remove('is-bronze', 'is-silver', 'is-platinum')
            problem.id.classList.add('is-gold')
            break
          case 'silver':
            problem.id.classList.remove('is-bronze', 'is-gold', 'is-platinum')
            problem.id.classList.add('is-silver')
            break
          case 'bronze':
            problem.id.classList.remove('is-silver', 'is-gold', 'is-platinum')
            problem.id.classList.add('is-bronze')
            break
          default:
            problem.id.classList.remove('is-bronze', 'is-silver', 'is-gold', 'is-platinum')
        }
        problem.id.innerText = 'ID: ' + generated.id
        load.classList.add('hidden')
        problemDiv.classList.remove('hidden')
      } catch (err) {
        createToast(err.message, 'fa-triangle-exclamation')
        console.log('oops1')
      }
      window.renderMathInElement(document.getElementById('problem-text'), {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ]
      })
    } catch (err) {
      createToast(err.message, 'fa-triangle-exclamation')
      console.log('oops2')
    }
  }
})
</script>
