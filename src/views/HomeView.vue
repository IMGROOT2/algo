<template>
  <main>
    <div
      class="home-adjust w-full text-center flex items-center justify-center flex-col h-screen bg-cover bg-no-repeat bg-bottom"
    >
      <Banner />
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div
          class="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 dark:text-white text-gray-700 dark:bg-slate-800 bg-zinc-200 m-1 hover:ring-emerald-500 ring-emerald-400 transition-all hover:scale-110 duration-400"
        >
          Algo won <span class="font-bold">Second Place</span> in Boost Hacks!
          <a
            href="https://devpost.com/software/algo-sdi6bf"
            target="_blank"
            class="font-semibold text-emerald-400 hover:text-emerald-500"
            aria-label="View Algo's second place prize."
          >
            <span class="mx-1" aria-hidden="true">View the submission</span>
            <span class="icon relative" style="top: 1px">
              <i class="fa-solid fa-chevron-right"></i>
            </span>
          </a>
        </div>
      </div>

      <div class="mx-auto max-w-2xl mt-12">
        <div class="mx-auto max-w-3xl lg:max-w-none">
          <h1 class="text-6xl landing-title text-center dark:text-white text-gray-800 font-bold">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-br from-[#3072D6] to-[#27C877]"
              >Go</span
            >
            from
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-gray-700"
              >Bronze</span
            >
            <br />
            to
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-gray-700"
              >Platinum</span
            >
            with <img :src="AlgoFull" alt="Algo Logo" class="inline h-16 lg:h-20" />
          </h1>
          <div class="p-2 bg-zinc-800/50 bg-zinc-700 rounded-lg flex-col flex my-5 mx-3">
            <h1 class="text-white text-xl">
              Algo is a USACO problem randomizer that pushes your training to the next level.
            </h1>
          </div>
          <a href="/solve">
            <button
              class="dark:text-white rounded-full p-2 px-6 bg-transparent border-2 dark:border-white border-gray-800 shadow-cyan-500/50 shadow-xl dark:hover:border-white hover:border-gray-700 hover:shadow-emerald-500/50 transition-all hover:scale-110"
            >
              Start Solving
            </button>
          </a>
        </div>
      </div>
    </div>
    <HomeStatistics />
  </main>
</template>
<script setup>
import { onMounted } from 'vue'
import AlgoFull from '../assets/images/algologofull.png'
import Polygon from '../assets/images/polygon.svg'
import Banner from '../components/Banner.vue'
import HomeStatistics from '../components/HomeStatistics.vue'

onMounted(() => {
  const homeAdjust = document.querySelector('.home-adjust')
  homeAdjust.style.backgroundImage = `url(${Polygon})`
})
</script>
