<template>
  <div
    class="fixed z-50 inset-0 flex dark:bg-[#1e1e1e] bg-zinc-50 items-center justify-center text-white flex-col p-3 text-center"
  >
    <div class="text-6xl font-bold text-gray-500 mb-4">
      <span
        class="filling-text bg-clip-text text-transparent bg-gradient-to-tr from-[#3072D6] to-[#27C877]"
        style="animation-delay: 0s"
        >4</span
      >
      <span
        class="filling-text bg-clip-text text-transparent bg-gradient-to-tr from-[#3072D6] to-[#27C877]"
        style="animation-delay: 0.2s"
        >0</span
      >
      <span
        class="filling-text bg-clip-text text-transparent bg-gradient-to-tr from-[#3072D6] to-[#27C877]"
        style="animation-delay: 0.4s"
        >4</span
      >
    </div>
    <div class="text-2xl font-medium text-gray-500 mb-4">Oops! Page not found.</div>
    <div class="text-lg text-gray-500 mb-8">
      The page you are looking for might not exist or may be temporarily unavailable.
    </div>
    <router-link
      to="/"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition duration-200"
      >Go back to <img class="h-6 inline" :src="AlgoFull"
    /></router-link>
  </div>
</template>
<script setup>
import AlgoFull from '../assets/images/algologofull.png'
</script>
<style>
.filling-text {
  display: inline-block;
  position: relative;
  opacity: 0;
  animation: fill-up 1s ease-in-out forwards;
}

@keyframes fill-up {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
