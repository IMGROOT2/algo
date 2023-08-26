<template>
  <div
    v-if="show"
    class="flex items-center max-w-md p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-slate-800 z-50 relative transition-transform transform my-3"
    :class="{ 'translate-x-0': show }"
    role="alert"
  >
    <div
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200"
    >
      <i class="w-4 h-4 fa-solid" :class="`${icon}`"></i>
      <span class="sr-only">Icon</span>
    </div>
    <div class="ml-3 text-sm font-normal">{{ message }}</div>
    <button
      type="button"
      class="ml-2 -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white"
      aria-label="Close"
      @click="show = false"
    >
      <span class="sr-only">Close</span>
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  show.value = true

  // hide the toast after 3 seconds
  setTimeout(() => {
    show.value = false
  }, 4000)
})

defineProps({
  message: String,
  icon: String
})
</script>

<style>
.transition-transform {
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
}
</style>
