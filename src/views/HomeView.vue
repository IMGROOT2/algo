<template>
  <div
    v-if="showFeedbackModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/70 p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="feedback-modal-title"
  >
    <div
      class="relative w-full max-w-lg mx-auto overflow-hidden rounded-2xl bg-white/95 shadow-2xl ring-1 ring-zinc-200 backdrop-blur dark:bg-zinc-900/95 dark:ring-zinc-700"
    >
      <button
        type="button"
        @click="dismissFeedbackModal"
        class="absolute top-3 right-3 text-gray-300 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:text-gray-500 dark:hover:text-gray-200"
        aria-label="Close feedback dialog"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="bg-[#1f3a73] px-6 py-5 text-white">
        <div class="flex items-center gap-4">
          <img :src="AlgoFull" alt="Algo logo" class="h-10 w-auto" />
          <div>
            <p class="text-sm uppercase tracking-[0.25em] text-white/70">Shape the future</p>
            <h2 id="feedback-modal-title" class="text-2xl font-semibold">We’d love your voice</h2>
          </div>
        </div>
      </div>
      <div class="p-6 space-y-5">
        <p class="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
          Got <span class="font-semibold text-blue-600 dark:text-blue-400">two minutes</span> to share how
          Algo can do even more for you? Tell us what would level up your training.<span
            class="block font-medium text-emerald-600 dark:text-emerald-400"
            >Plus, we’ll spotlight you on the About page.</span
          >
        </p>
        <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li class="flex items-start gap-3">
            <span class="mt-1 text-blue-500"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
            <span>Suggest improvements or dream up entirely new features.</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-1 text-amber-500"><i class="fa-solid fa-star"></i></span>
            <span>Be featured for your feedback on Algo's About page!</span>
          </li>
        </ul>
        <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            @click="dismissFeedbackModal"
            class="w-full sm:w-auto rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-zinc-800"
          >
            Maybe later
          </button>
          <button
            type="button"
            @click="openFeedbackForm"
            class="w-full sm:w-auto rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-500"
          >
            Share feedback
          </button>
        </div>
      </div>
    </div>
  </div>
  <main>
    <div
      class="home-adjust relative w-full text-center flex items-center justify-center flex-col h-screen bg-cover bg-no-repeat bg-bottom"
    >
      <!-- Embed the SVG polygon directly -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1373"
        height="695"
        viewBox="0 0 1373 695"
        fill="none"
        class="absolute inset-0 w-full h-full top-10 right-8 z-0"
      >
        <g opacity="0.15" filter="url(#filter0_f_67_188)">
          <path
            d="M814.057 514.451L180.943 180.363L1447.17 180.363L814.057 514.451Z"
            fill="#0025c8"
          />
        </g>
        <defs fill="#000000">
          <filter
            id="filter0_f_67_188"
            x="0.943115"
            y="0.362732"
            width="1626.23"
            height="694.088"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
            fill="#000000"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" fill="#000000" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
              fill="#000000"
            />
            <feGaussianBlur
              stdDeviation="90"
              result="effect1_foregroundBlur_67_188"
              fill="#000000"
            />
          </filter>
        </defs>
      </svg>
      <div class="relative z-10 w-full">
        <Banner />
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div
            class="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 dark:text-white text-gray-700 dark:bg-slate-800 bg-zinc-200 m-1 hover:ring-emerald-500 ring-emerald-400 transition-all hover:scale-110 duration-400"
          >
            Algo is a <span class="font-bold">2x Hackathon Winner</span>!
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
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-gray-700"
                >Bronze</span
              >
              <br />
              to
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-gray-700"
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
    </div>
    <HomeStatistics />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AlgoFull from '../assets/images/algologofull.png'
import Banner from '../components/Banner.vue'
import HomeStatistics from '../components/HomeStatistics.vue'

const FEEDBACK_MODAL_KEY = 'algo-feedback-modal-dismissed'
const FEEDBACK_FORM_URL = 'https://forms.gle/2qo1exSSopAChjET6'

const showFeedbackModal = ref(false)

function dismissFeedbackModal() {
  showFeedbackModal.value = false
  if (typeof window !== 'undefined') {
    localStorage.setItem(FEEDBACK_MODAL_KEY, 'true')
  }
}

function openFeedbackForm() {
  if (typeof window !== 'undefined') {
    window.open(FEEDBACK_FORM_URL, '_blank', 'noopener')
  }
  dismissFeedbackModal()
}

onMounted(() => {
  if (typeof window === 'undefined') {
    return
  }

  const hasSeenModal = localStorage.getItem(FEEDBACK_MODAL_KEY)
  if (!hasSeenModal) {
    showFeedbackModal.value = true
  }
})
</script>
