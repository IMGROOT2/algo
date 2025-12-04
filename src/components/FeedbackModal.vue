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
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AlgoFull from '@/assets/images/algologofull.png'

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
    // small delay so it doesn't jump in before page renders
    window.requestAnimationFrame(() => {
      showFeedbackModal.value = true
    })
  }
})
</script>
