<template>
  <div class="hidden sm:mb-8 sm:flex sm:justify-center">
    <div
      class="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 text-white dark:bg-slate-800 bg-zinc-700 m-1 hover:ring-blue-500 transition-all hover:scale-110 duration-400"
    >
      <span class="font-bold">{{ update.release.version }}</span> - {{ update.release.text }}
      <a
        :href="'https://github.com/IMGROOT2/algo/releases/tag/v' + update.release.version"
        target="_blank"
        class="font-semibold text-blue-400 hover:text-blue-500"
        aria-label="View the latest Algo release."
      >
        <span class="mx-1" aria-hidden="true">View Release</span>
        <span class="icon relative" style="top: 1px">
          <i class="fa-solid fa-chevron-right"></i>
        </span>
      </a>
    </div>
  </div>
</template>
<script setup>
import update from '../public/update.json'
</script>
