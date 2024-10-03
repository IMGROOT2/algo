<template>
  <div class="relative inline-block z-99">
    <span @mouseenter="isTooltipVisible = true" @mouseleave="isTooltipVisible = false">
      <i class="fa-solid fa-question-circle text-gray-500 hover:text-gray-600 cursor-pointer"></i>
    </span>
    <div
      :id="tooltipId"
      role="tooltip"
      class="fixed inline-block ml-2 p-1 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
      v-show="isTooltipVisible"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  message: {
    type: String,
    required: true
  }
})

const tooltipId = ref(`tooltip-${Math.random().toString(36).substring(7)}`)
const isTooltipVisible = ref(false)
</script>
