<template>
  <div id="theme-div" class="transition-all">
    <div class="bg-white dark:bg-[#1e1e1e] transition-all duration-600">
      <!-- theme div -->
      <Navbar />
      <FeedbackModal />
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
      <Footer />

      <div id="div-toast" class="bottom-5 left-5 fixed z-50"></div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import FeedbackModal from '@/components/FeedbackModal.vue'
</script>
