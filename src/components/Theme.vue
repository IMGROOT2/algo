<template>
  <div
    class="justify-evenly flex my-3 p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 w-[100px] mx-auto mb-5"
  >
    <button
      class="h-6 w-6 flex items-center justify-center hover:text-blue-600 text-gray-400"
      :id="props.num + 'theme-light'"
    >
      <i class="fa-solid fa-sun"></i>
    </button>
    <button
      class="h-6 w-6 flex items-center justify-center hover:text-blue-600 text-gray-400"
      :id="props.num + 'theme-dark'"
    >
      <i class="fa-solid fa-moon"></i>
    </button>
    <button
      class="h-6 w-6 flex items-center justify-center hover:text-blue-600 text-gray-400"
      :id="props.num + 'theme-system'"
    >
      <i class="fa-solid fa-desktop"></i>
    </button>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  num: String
})

onMounted(() => {
  const themeLight = document.getElementById(props.num + 'theme-light')
  const themeDark = document.getElementById(props.num + 'theme-dark')
  const themeSystem = document.getElementById(props.num + 'theme-system')

  const themeDiv = document.getElementById('theme-div')

  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'system')
    themeLight.classList.remove('text-blue-600')
    themeLight.classList.add('text-gray-400')
    themeDark.classList.remove('text-blue-600')
    themeDark.classList.add('text-gray-400')
    themeSystem.classList.remove('text-gray-400')
    themeSystem.classList.add('text-blue-600')
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      themeDiv.classList.add('dark')
    } else {
      themeDiv.classList.remove('dark')
    }
  }
  if (localStorage.getItem('theme') === 'light') {
    themeLight.classList.remove('text-gray-400')
    themeLight.classList.add('text-blue-600')
    themeDark.classList.remove('text-blue-600')
    themeDark.classList.add('text-gray-400')
    themeSystem.classList.remove('text-blue-600')
    themeSystem.classList.add('text-gray-400')
    themeDiv.classList.remove('dark')
  }
  if (localStorage.getItem('theme') === 'dark') {
    themeLight.classList.remove('text-blue-600')
    themeLight.classList.add('text-gray-400')
    themeDark.classList.remove('text-gray-400')
    themeDark.classList.add('text-blue-600')
    themeSystem.classList.remove('text-blue-600')
    themeSystem.classList.add('text-gray-400')
    themeDiv.classList.add('dark')
  }
  if (localStorage.getItem('theme') === 'system') {
    themeLight.classList.remove('text-blue-600')
    themeLight.classList.add('text-gray-400')
    themeDark.classList.remove('text-blue-600')
    themeDark.classList.add('text-gray-400')
    themeSystem.classList.remove('text-gray-400')
    themeSystem.classList.add('text-blue-600')
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      themeDiv.classList.add('dark')
    } else {
      themeDiv.classList.remove('dark')
    }
  }
  themeLight.addEventListener('click', () => {
    themeLight.classList.remove('text-gray-400')
    themeLight.classList.add('text-blue-600')
    themeDark.classList.remove('text-blue-600')
    themeDark.classList.add('text-gray-400')
    themeSystem.classList.remove('text-blue-600')
    themeSystem.classList.add('text-gray-400')
    themeDiv.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  })
  themeDark.addEventListener('click', () => {
    themeLight.classList.remove('text-blue-600')
    themeLight.classList.add('text-gray-400')
    themeDark.classList.remove('text-gray-400')
    themeDark.classList.add('text-blue-600')
    themeSystem.classList.remove('text-blue-600')
    themeSystem.classList.add('text-gray-400')
    themeDiv.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  })
  themeSystem.addEventListener('click', () => {
    themeLight.classList.remove('text-blue-600')
    themeLight.classList.add('text-gray-400')
    themeDark.classList.remove('text-blue-600')
    themeDark.classList.add('text-gray-400')
    themeSystem.classList.remove('text-gray-400')
    themeSystem.classList.add('text-blue-600')
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      themeDiv.classList.add('dark')
    } else {
      themeDiv.classList.remove('dark')
    }
    localStorage.setItem('theme', 'system')
  })
})
</script>
