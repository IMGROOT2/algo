<template>
    <main>
        <div class="home-adjust w-full text-center flex items-center justify-center flex-col h-screen bg-cover bg-no-repeat bg-bottom">
            <div class="hidden sm:mb-8 sm:flex sm:justify-center">
                <div class="relative rounded-full px-3 py-1 text-sm leading-6 ring-1 text-white bg-slate-800 m-1 hover:ring-blue-500">
                    0.4.0: Statistics update, Search, view individual problems, and more!
                    <a href="https://github.com/IMGROOT2/algo/releases/tag/v0.4.0" target="_blank" class="font-semibold text-blue-700 hover:text-blue-600">
                    <span class="mx-1" aria-hidden="true">View Release</span>
                    <span class="icon relative" style="top: 1px">
                        <i class="fa-solid fa-chevron-right"></i>
                    </span>
                    </a>
                </div>
            </div>
            <div class="mx-auto max-w-2xl mt-12">
                
                <div class="hidden lg:block mx-auto">
                <h1 class="text-6xl landing-title text-center text-white font-bold">
                    <span class="bg-clip-text text-transparent bg-gradient-to-b from-[#3072D6] to-[#27C877]">Go</span>
                    from <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-gray-700">Bronze</span> <br> to <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-gray-700">Platinum</span> with <img :src="AlgoFull" alt="Algo Logo" class="inline h-20">
                </h1>
                <div class="p-2 bg-zinc-800/50 rounded-lg flex-col flex my-5 ">
                    <h1 class="text-white text-xl">Algo is a USACO problem randomizer that pushes your training to the next level.</h1>
                </div>
                <a href="/solve">
                    <button class="text-white rounded-full p-2 px-6 bg-transparent border-2 border-white shadow-cyan-500/50 shadow-xl hover:border-white hover:shadow-emerald-500/50">Start Solving</button>
                </a>
                </div>
                <div class="block lg:hidden mx-auto max-w-3xl">
                <h1 class="text-6xl landing-title text-center text-white font-bold">
                    <span class="bg-clip-text text-transparent bg-gradient-to-b from-[#3072D6] to-[#27C877]">Go</span>
                    from <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-gray-700">Bronze</span> <br> to <span class="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-gray-700">Platinum</span> with <img :src="AlgoFull" alt="Algo Logo" class="inline h-16">
                </h1>
                <div class="p-2 bg-zinc-800/50 rounded-lg flex-col flex my-5 mx-3">
                    <h1 class="text-white text-xl">Algo is a USACO problem randomizer that pushes your training to the next level.</h1>
                </div>
                <a href="/solve">
                    <button class="text-white rounded-full p-2 px-6 bg-transparent border-2 border-white shadow-cyan-500/50 shadow-xl hover:border-white hover:shadow-emerald-500/50">Start Solving</button>
                </a>
                </div>
            </div>
            </div>

            <div class="home-adjust" style="background: #0b1120;">
            <div class="py-12 sm:py-32 mx-auto max-w-7xl px-6 lg:px-8">
                <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center md:grid-cols-3">
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt class="text-base leading-7 text-white">Users</dt>
                    <dd class="order-first text-6xl font-semibold tracking-tight"><span id="users" style="background: -webkit-linear-gradient(#3072D6, #27C877); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></span></dd>
                </div>
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt class="text-base leading-7 text-white">Page Views</dt>
                    <dd class="order-first text-6xl font-semibold tracking-tight"><span id="views" style="background: -webkit-linear-gradient(#3072D6, #27C877); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></span></dd>
                </div>
                <div class="mx-auto flex max-w-xs flex-col gap-y-4">
                    <dt class="text-base leading-7 text-white">Countries Reached</dt>
                    <dd class="order-first text-6xl font-semibold tracking-tight"><span id="countries" style="background: -webkit-linear-gradient(#3072D6, #27C877); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></span></dd>
                </div>
                </dl>
            </div>
        </div>
    </main>
</template>
<script setup>
    import { onMounted } from 'vue'
    import AlgoFull from '../assets/images/algologofull.png'
    import Polygon from '../assets/images/polygon.svg';
    onMounted(() => {
        const users = "890";
        const views = "6,400";
        const countries = "41";

        const usersSpan = document.getElementById("users");
        const viewsSpan = document.getElementById("views");
        const countriesSpan = document.getElementById("countries");

        usersSpan.innerText = users + "+";
        viewsSpan.innerText = views + "+";
        countriesSpan.innerText = countries + "+";

        // set the background image
        const homeAdjust = document.querySelector(".home-adjust");
        homeAdjust.style.backgroundImage = `url(${Polygon})`;
    });
</script>