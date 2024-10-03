<template>
  <footer class="px-12 pb-12 pt-2 lg:pt-12 bottom-0 mt-3">
    <div class="block lg:hidden lg:absolute mx-auto">
      <Theme num="one" />
    </div>
    <div class="lg:flex justify-center mx-auto text-center">
      <div class="flex items-center justify-center">
        <a href="/">
          <img :src="AlgoFull" alt="Algo Logo" class="h-16 mb-5 lg:mb-0" />
        </a>
      </div>
      <div class="hidden lg:block lg:absolute mx-auto">
        <Theme num="two" />
      </div>
      <div
        class="flex items-center ml-auto dark:text-white text-zinc-800 text-center justify-center"
      >
        <a
          href="https://github.com/IMGROOT2/Algo"
          target="_blank"
          aria-label="Algo GitHub Repository"
          class="page-link transition-all"
        >
          <i class="fab fa-github"></i>
        </a>
        <span class="mx-2">&centerdot;</span>
        <a href="/about" class="page-link transition-all">About</a>
        <span class="mx-2">&centerdot;</span>
        <span>Made by</span>
        <a href="https://ruhangupta.com/" target="_blank" class="ml-1 page-link transition-all"
          >Ruhan Gupta</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup>
import AlgoFull from '../assets/images/algologofull.png'
import Theme from './Theme.vue'
</script>
