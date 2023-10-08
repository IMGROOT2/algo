<template>
  <div class="home-adjust dark:bg-[#0b1120] bg-zinc-200">
    <div class="py-12 sm:py-32 mx-auto max-w-7xl px-6 lg:px-8">
      <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center md:grid-cols-3">
        <div class="mx-auto flex max-w-xs flex-col gap-y-4 hover:scale-110 transition-all">
          <dt class="text-base leading-7 dark:text-white text-gray-900">Users</dt>
          <dd class="order-first text-5xl lg:text-6xl font-semibold tracking-tight">
            <span
              id="users"
              style="
                background: -webkit-linear-gradient(#3072d6, #27c877);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              "
              >{{ update.analytics.users }}+</span
            >
          </dd>
        </div>
        <div class="mx-auto flex max-w-xs flex-col gap-y-4 hover:scale-110 transition-all">
          <dt class="text-base leading-7 dark:text-white text-gray-900">Page Views</dt>
          <dd class="order-first text-5xl lg:text-6xl font-semibold tracking-tight">
            <span
              id="views"
              style="
                background: -webkit-linear-gradient(#3072d6, #27c877);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              "
              >{{ update.analytics.views }}+</span
            >
          </dd>
        </div>
        <div class="mx-auto flex max-w-xs flex-col gap-y-4 hover:scale-110 transition-all">
          <dt class="text-base leading-7 dark:text-white text-gray-900">Countries Reached</dt>
          <dd class="order-first text-5xl lg:text-6xl font-semibold tracking-tight">
            <span
              style="
                background: -webkit-linear-gradient(#3072d6, #27c877);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              "
              >{{ update.analytics.countries }}+</span
            >
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
<script setup>
import update from '../assets/data/update.json'
</script>
