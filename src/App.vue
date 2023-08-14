<template>
  <div> <!-- theme div -->
    <Navbar />
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
    <Footer />

    <div id="div-toast" class="bottom-5 left-5 fixed z-50"></div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>