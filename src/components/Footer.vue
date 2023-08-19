<template>
  <footer class="footer bottom-0 mt-3">
    <div class="lg:flex justify-center mx-auto text-center">
      <div class="flex items-center justify-center">
        <a href="/">
          <img :src="AlgoFull" alt="Algo Logo" class="h-16" />
        </a>
      </div>
      <div
        class="flex items-center ml-auto dark:text-white text-zinc-800 text-center justify-center"
      >
        <a
          href="https://github.com/IMGROOT2/Algo"
          target="_blank"
          aria-label="Algo GitHub Repository"
          class="footer-item"
        >
          <i class="fab fa-github"></i>
        </a>
        <span class="mx-2">&centerdot;</span>
        <a href="/about" class="footer-item page-link">About</a>
        <span class="mx-2">&centerdot;</span>
        <span>Made by</span>
        <a href="https://github.com/IMGROOT2" target="_blank" class="footer-item ml-1 page-link"
          >Ruhan Gupta</a
        >
      </div>
    </div>
  </footer>
</template>

<script setup>
import AlgoFull from '../assets/images/algologofull.png'
</script>
