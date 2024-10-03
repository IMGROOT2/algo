<template>
  <main>
    <h1 class="dark:text-white text-5xl text-center font-bold mx-auto py-20">
      About <img :src="AlgoFull" class="h-16 inline-block" />
    </h1>
    <div class="dark:bg-zinc-800 bg-zinc-300 p-5">
      <div class="pt-8 pb-4 px-4 mx-auto max-w-screen-xl lg:pt-16 lg:pb-8 lg:px-6">
        <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
            Why <img :src="AlgoFull" class="h-12 inline-block" />
          </h2>
          <p class="mb-4 font-light">
            As more people get into competitive programming and the USACO, more resources are
            available to help you prepare for the competition. However, there was one piece missing-
            practice. It's essential to learn the concepts and techniques, but it's equally, if not
            more important, to practice them. Until I created Algo, there were two options: randomly
            clicking on previous contests' problems or using train.usaco.org. <br /><br />
            <span class="font-bold"
              >However, clicking on problems randomly is inefficient, and train.usaco.org is
              incredibly outdated
            </span>
            (most of the website hasn't had a refresh or update since the early 2010s). So, I
            created Algo to help people practice USACO problems and help them get ready for the
            USACO. <br /><br />
            Algo is a web application designed to supercharge your USACO training. It randomly
            generates problems from past contests so that you can practice them. Algo will process
            and show the problems in a simple, clean interface. After solving the problem, you can
            submit your solution to the USACO website to check if your program works.
          </p>
        </div>
      </div>
      <div class="pb-8 pt-4 px-4 mx-auto max-w-screen-xl lg:pb-16 lg:pt-8 lg:px-6">
        <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
            Credits
          </h2>
          <p class="mb-4 font-light">
            Algo is solely created, developed, and maintained by
            <a href="https://ruhangupta.com" class="page-link transition-all">Ruhan Gupta</a>. For
            the full tech stack and libraries, check the
            <a href="https://github.com/IMGROOT2/Algo" class="page-link transition-all"
              >GitHub Repository</a
            >. Give it a star if you have an account! Thank you to my family and friends for
            supporting with Algo, including my brother (Reyansh) for testing. <br /><br />
            <span class="font-bold"
              >Algo is © 2023-<span id="year"></span> Ruhan Gupta. All rights reserved.
            </span>
            USACO problems are retrieved from
            <a href="http://usaco.org" class="page-link transition-all">usaco.org</a>. All USACO
            problem credits go to their respective authors, who are credited at the end of each
            problem. I do not take credit or ownership of any USACO problems.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onMounted } from 'vue'
import AlgoFull from '../assets/images/algologofull.png'
onMounted(() => {
  document.getElementById('year').innerHTML = new Date().getFullYear()
})
</script>
