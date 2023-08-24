<template>
    <main class="flex flex-row items-center w-full h-screen justify-evenly">
            <div class="flex-col items-center bg-zinc-300 dark:bg-zinc-800 rounded-lg p-5 w-1/4 ml-8">
                <h1 class="text-3xl text-gray-600 dark:text-white font-bold mb-8">Options</h1>
                <div id="diff-dropdown">
                    <button id="diff-trigger" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span id="diff-label">Difficulty</span> <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                    </svg></button>
                    <!-- Dropdown menu -->
                    <div id="diff-menu" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item">Bronze</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item">Silver</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item">Gold</a>
                        </li>
                        <li>
                            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dropdown-item">Platinum</a>
                        </li>
                        </ul>
                    </div>
                </div>
                <div class="my-3">
                    <button id="generate-button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><span class="diff-label">New Problem</span></button>
                    <div id="recordstatus">
                        <p class="text-gray-900 dark:text-white text-xl">Record Status</p>
                        <button id="green" class="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="button"><span class="diff-label">Green</span></button>
                        <button id="yellow" class="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800" type="button"><span class="diff-label">Yellow</span></button>
                        <button id="red" class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" type="button"><span class="diff-label">Red</span></button>
                    </div>
                </div>
            </div>
        <div class="flex-1 flex h-screen mr-8">
            <Loader size="16" id="problem-loader" class="hidden" />
            <div class="flex-1 overflow-y-scroll">
                <div id="problem" class="mx-auto">
            <div class="py-4">
            <div class="flex items-center justify-between px-4 sm:px-6 lg:px-8">
                <div>
                <h1
                    class="text-2xl lg:text-3xl font-bold dark:text-white text-gray-700"
                    id="problem-title"
                ></h1>
                <p class="text-gray-400 text-sm lg:text-lg" id="problem-subtitle"></p>
                </div>
                <div class="text-right">
                <span
                    id="problem-id"
                    class="text-gray-900 dark:text-white rounded-md px-2 py-1 text-sm"
                >313</span>
                <p class="dark:text-white text-sm lg:text-lg mt-3">
                    View on <a href="#" id="problem-link" class="page-link">usaco.org</a>
                </p>
                </div>
            </div>
            </div>
            <div class="dark:bg-zinc-800 bg-zinc-300 p-5 rounded-lg mx-3">
            <div class="p-4 lg:p-8">
                <div class="max-w-screen-xl text-gray-500 sm:text-lg dark:text-gray-400">
                <p class="mb-4" id="problem-text"></p>
                </div>
            </div>
            </div>
        </div>
            </div>
        </div>
    </main>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
      integrity="sha384-vKruj+a13U8yHIkAyGgK1J3ArTLzrFGBbBc0tDp4ad/EyewESeXE/Iv67Aj8gKZ0"
      crossorigin="anonymous"
    />
  </template>
<script setup>
import * as problems from '../public/data/data.json'
import Loader from '../components/Loader.vue'
import 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js'
import 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/contrib/auto-render.min.js'
import {auth, db} from "../app-config";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import { onMounted } from 'vue'
import createToast from '../toast';

onMounted(() => {

const options = {
    label: document.getElementById("diff-label"), // done
    trigger: document.getElementById("diff-trigger"), // done
    menu: document.getElementById("diff-menu"), // done
    items: document.getElementsByClassName("dropdown-item"), // done
    generate: document.getElementById("generate-button"), // done
    dropdown: document.getElementById("diff-dropdown"),  // done
    green: document.getElementById("green"), // done
    yellow: document.getElementById("yellow"), // done
    red: document.getElementById("red"), // done
    record: document.getElementById("recordstatus"), // done
    toggleModal: document.getElementsByClassName("toggleModal"), // done
    recordModal: document.getElementById("recordModal") // done
}

const problem = {
    link: document.getElementById("problem-link"),
    id: document.getElementById("problem-id"),
    problem: document.getElementById("problem"),
    title: document.getElementById("problem-title"),
    subtitle: document.getElementById("problem-subtitle"),
    text: document.getElementById("problem-text"),
    loader: document.getElementById("problem-loader")
}
let user;
onAuthStateChanged(auth, async auser => {
    user = auser;
    if (user) {
        console.log(user.uid);
        await checkIfFS(db, auser);
        if (localStorage.getItem("options") != null) {
            options.label.innerText = localStorage.getItem("options");
            for (let i = 0; i < options.items.length; i++) {
                if (options.items[i].innerText === localStorage.getItem("options")) {
                    options.items[i].classList.add("bg-gray-100", "dark:bg-gray-600", "dark:text-white");
                }
            }
        }
        try {
            if (localStorage.getItem("problem") !== null) {
                options.generate.classList.toggle("is-loading");
                problem.problem.classList.toggle("hidden");
                problem.loader.classList.toggle("hidden");
                const result = await generateProblem("custom-id", [localStorage.getItem("problem"), localStorage.getItem("options")], user);
                if (result === "error") {
                    createToast("Oops! Couldn't load previous problem.", 'fa-triangle-exclamation')
                    console.error("Issue with generateProblem().");
                    options.generate.classList.toggle("is-loading");
                    problem.problem.classList.toggle("hidden");
                    problem.loader.classList.toggle("hidden");
                } else if (result === "success") {
                    options.generate.classList.toggle("is-loading");
                    options.generate.classList.toggle("hidden");
                    problem.problem.classList.toggle("hidden");
                    problem.loader.classList.toggle("hidden");
                    problem.link.classList.remove("hidden");
                    options.record.classList.remove("hidden");
                    createToast("Restored previous problem!", 'fa-circle-check')
                }
            }
        } catch (err) {
            createToast("Oops! Couldn't load previous problem.", 'fa-triangle-exclamation')
            options.generate.classList.toggle("is-loading");
            problem.problem.classList.toggle("hidden");
            problem.loader.classList.toggle("hidden");
            options.red.classList.toggle("is-loading");
            options.yellow.classList.toggle("is-loading");
            options.green.classList.toggle("is-loading");
        }


        options.green.addEventListener("click", async () => {
            options.red.classList.toggle("is-loading");
            options.yellow.classList.toggle("is-loading");
            options.green.classList.toggle("is-loading");
            problem.problem.classList.toggle("hidden");
            problem.loader.classList.toggle("hidden");
            try {
                // in firestore, find the document with the id of the user. then add localstorage.getItem("problem") to the array called "problemsSeen" and "problemsSolved"
                // use v9
                await retrieveUserDoc(db, user).then((adoc) => {
                    const data = adoc.data();
                    const problemsSeen = data["problemsSeen"];
                    const problemsSolved = data["problemsSolved"];
                    const problemsSkipped = data["problemsSkipped"];
                    const problemsUnsolved = data["problemsUnsolved"];
                    // if the problem is not in the problems seen array, add it
                    if (!problemsSeen.includes(localStorage.getItem("problem"))) {
                        problemsSeen.push(localStorage.getItem("problem"));
                    }
                    // if the problem is not in the problems solved array, add it
                    if (!problemsSolved.includes(localStorage.getItem("problem"))) {
                        problemsSolved.push(localStorage.getItem("problem"));
                    }
                    // if the problem is in the problems unsolved array, remove it
                    if (problemsUnsolved.includes(localStorage.getItem("problem"))) {
                        const index = problemsUnsolved.indexOf(localStorage.getItem("problem"));
                        if (index > -1) {
                            problemsUnsolved.splice(index, 1);
                        }
                    }
                    // if the problem is in the problems skipped array, remove it
                    if (problemsSkipped.includes(localStorage.getItem("problem"))) {
                        const index = problemsSkipped.indexOf(localStorage.getItem("problem"));
                        if (index > -1) {
                            problemsSkipped.splice(index, 1);
                        }
                    }
                    // update the document with the new arrays
                    updateDoc(doc(db, "user_data", user.uid), {
                        "problemsSeen": problemsSeen,
                        "problemsSolved": problemsSolved,
                        "problemsSkipped": problemsSkipped,
                        "problemsUnsolved": problemsUnsolved
                    }).then(() => {
                        console.log("Updated user document.");
                    });

                });
                if (localStorage.getItem("options") === null) {
                    createToast("Oops! You haven't selected a difficulty. Select a difficulty and try again.", 'fa-triangle-exclamation')
                    options.red.classList.toggle("is-loading");
                    options.yellow.classList.toggle("is-loading");
                    options.green.classList.toggle("is-loading");
                    problem.problem.classList.toggle("hidden");
                    problem.loader.classList.toggle("hidden");
                } else {
                    const result = await generateProblem("random-id", localStorage.getItem("options").toLowerCase(), user);
                    if (result === "error") {
                        createToast('Error generating problem. Please try again later.', 'fa-triangle-exclamation')
                        console.error("Issue with generateProblem().");
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("hidden");
                        problem.loader.classList.toggle("hidden");
                    } else if (result === "success") {
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("hidden");
                        problem.loader.classList.toggle("hidden");
                        problem.link.classList.remove("hidden");
                        options.generate.classList.add("hidden");
                        createToast('New problem generated!', 'fa-circle-check')
                    }
                }
            } catch (err) {
                createToast('Error generating problem. Please try again later.', 'fa-triangle-exclamation')
                options.red.classList.toggle("is-loading");
                options.yellow.classList.toggle("is-loading");
                options.green.classList.toggle("is-loading");
                problem.problem.classList.toggle("hidden");
                problem.loader.classList.toggle("hidden");
            }
        });
        options.yellow.addEventListener("click", async () => {
            options.red.classList.toggle("is-loading");
            options.yellow.classList.toggle("is-loading");
            options.green.classList.toggle("is-loading");
            problem.problem.classList.toggle("hidden");
            problem.loader.classList.toggle("hidden");
            try {
                // in firestore, find the document with the id of the user. then add localstorage.getItem("problem") to the array called "problemsSeen" and "problemsSolved"
                // use v9
                await retrieveUserDoc(db, user).then((adoc) => {
                    const data = adoc.data();
                    const problemsSeen = data["problemsSeen"];
                    const problemsSolved = data["problemsSolved"];
                    const problemsSkipped = data["problemsSkipped"];
                    const problemsUnsolved = data["problemsUnsolved"];
                    if (!problemsSeen.includes(localStorage.getItem("problem"))) {
                        problemsSeen.push(localStorage.getItem("problem"));
                    }
                    if (!problemsSkipped.includes(localStorage.getItem("problem"))) {
                        problemsSkipped.push(localStorage.getItem("problem"));
                    }
                    if (problemsSolved.includes(localStorage.getItem("problem"))) {
                        const index = problemsSolved.indexOf(localStorage.getItem("problem"));
                        if (index > -1) {
                            problemsSolved.splice(index, 1);
                        }
                    }
                    if (problemsUnsolved.includes(localStorage.getItem("problem"))) {
                        const index = problemsUnsolved.indexOf(localStorage.getItem("problem"));
                        if (index > -1) {
                            problemsUnsolved.splice(index, 1);
                        }
                    }
                    // TODO: double check this is correct with splicing...
                    // update the document with the new arrays
                    updateDoc(doc(db, "user_data", user.uid), {
                        "problemsSeen": problemsSeen,
                        "problemsSolved": problemsSolved,
                        "problemsSkipped": problemsSkipped,
                        "problemsUnsolved": problemsUnsolved
                    }).then(() => {
                        console.log("Updated user document.");
                    });

                });
                if (localStorage.getItem("options") === null) {
                    createToast("Oops! You haven't selected a difficulty. Select a difficulty and try again.", 'fa-triangle-exclamation')
                    options.red.classList.toggle("is-loading");
                    options.yellow.classList.toggle("is-loading");
                    options.green.classList.toggle("is-loading");
                    problem.problem.classList.toggle("hidden");
                    problem.loader.classList.toggle("hidden");
                } else {
                    const result = await generateProblem("random-id", localStorage.getItem("options").toLowerCase(), user);
                    if (result === "error") {
                        createToast('Error generating problem. Please try again later.', 'fa-triangle-exclamation')
                        console.error("Issue with generateProblem().");
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("hidden");
                        problem.loader.classList.toggle("hidden");
                    } else if (result === "success") {
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("hidden");
                        problem.loader.classList.toggle("hidden");
                        problem.link.classList.remove("hidden");
                        options.generate.classList.add("hidden");
                        createToast('New problem generated!', 'fa-circle-check')
                    }
                }
            } catch (err) {
                createToast('Error generating problem. Please try again later.', 'fa-triangle-exclamation')
                options.red.classList.toggle("is-loading");
                options.yellow.classList.toggle("is-loading");
                options.green.classList.toggle("is-loading");
                problem.problem.classList.toggle("hidden");
                problem.loader.classList.toggle("hidden");
            }
        });
        options.red.addEventListener("click", async () => {
            options.red.classList.toggle("is-loading");
            options.yellow.classList.toggle("is-loading");
            options.green.classList.toggle("is-loading");
            problem.problem.classList.toggle("hidden");
            problem.loader.classList.toggle("hidden");
            try {
                // in firestore, find the document with the id of the user. then add localstorage.getItem("problem") to the array called "problemsSeen" and "problemsSolved"
                // use v9
                await retrieveUserDoc(db, user).then((adoc) => {
                    const data = adoc.data();
                    const problemsSeen = data["problemsSeen"];
                    const problemsSolved = data["problemsSolved"];
                    const problemsSkipped = data["problemsSkipped"];
                    const problemsUnsolved = data["problemsUnsolved"];
                    if (!problemsSeen.includes(localStorage.getItem("problem"))) {
                        problemsSeen.push(localStorage.getItem("problem"));
                    }
                    if (!problemsUnsolved.includes(localStorage.getItem("problem"))) {
                        problemsUnsolved.push(localStorage.getItem("problem"));
                    }
                    if (problemsSolved.includes(localStorage.getItem("problem"))) {
                        const index = problemsSolved.indexOf(localStorage.getItem("problem"));
                        if (index > -1) {
                            problemsSolved.splice(index, 1);
                        }
                    }
                    if (problemsSkipped.includes(localStorage.getItem("problem"))) {
                        const index = problemsSkipped.indexOf(localStorage.getItem("problem"));
                        if (index > -1) {
                            problemsSkipped.splice(index, 1);
                        }
                    }
                    // update the document with the new arrays
                    updateDoc(doc(db, "user_data", user.uid), {
                        "problemsSeen": problemsSeen,
                        "problemsSolved": problemsSolved,
                        "problemsSkipped": problemsSkipped,
                        "problemsUnsolved": problemsUnsolved
                    }).then(() => {
                        console.log("Updated user document.");
                    });

                });
                if (localStorage.getItem("options") === null) {
                    createToast("Oops! You haven't selected a difficulty. Select a difficulty and try again.", 'fa-triangle-exclamation')
                    options.red.classList.toggle("is-loading");
                    options.yellow.classList.toggle("is-loading");
                    options.green.classList.toggle("is-loading");
                    problem.problem.classList.toggle("hidden");
                    problem.loader.classList.toggle("hidden");
                } else {
                    const result = await generateProblem("random-id", localStorage.getItem("options").toLowerCase(), user);
                    if (result === "error") {
                        createToast('Error generating problem. Please try again later.', 'fa-triangle-exclamation')
                        console.error("Issue with generateProblem().");
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("hidden");
                        problem.loader.classList.toggle("hidden");
                    } else if (result === "success") {
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("hidden");
                        problem.loader.classList.toggle("hidden");
                        problem.link.classList.remove("hidden");
                        options.generate.classList.add("hidden");
                        createToast('New problem generated!', 'fa-circle-check')
                    }
                }
            } catch (err) {
                createToast('Error generating problem. Please try again later.', 'fa-triangle-exclamation')
                options.red.classList.toggle("is-loading");
                options.yellow.classList.toggle("is-loading");
                options.green.classList.toggle("is-loading");
                problem.problem.classList.toggle("hidden");
                problem.loader.classList.toggle("hidden");
            }
        });


    } else {
        location.href = "/login";
    }
});
for (let i = 0; i < options.items.length; i++) {
    options.items[i].addEventListener("click", () => {
        options.menu.classList.toggle("hidden");
        options.label.innerText = options.items[i].innerText;
        let previous = localStorage.getItem("options");
        localStorage.setItem("options", options.items[i].innerText);
        for (let j = 0; j < options.items.length; j++) {
            options.items[j].classList.remove("bg-gray-100", "dark:bg-gray-600", "dark:text-white");
        }
        options.items[i].classList.add("bg-gray-100", "dark:bg-gray-600", "dark:text-white");
        if (previous !== localStorage.getItem("options")) {
            options.generate.classList.toggle("is-loading");
            problem.problem.classList.toggle("hidden");
            problem.loader.classList.toggle("hidden");
            generateProblem("random-id", localStorage.getItem("options").toLowerCase(), user).then((result) => {
                if (result === "error") {
                    createToast('Error generating problem. Please try again later.', 'fa-triangle-exclamation')
                    console.error("Issue with generateProblem().");
                    options.generate.classList.toggle("is-loading");
                    problem.problem.classList.toggle("hidden");
                    problem.loader.classList.toggle("hidden");
                } else if (result === "success") {
                    options.generate.classList.toggle("is-loading");
                    problem.problem.classList.toggle("hidden");
                    problem.loader.classList.toggle("hidden");
                    problem.link.classList.remove("hidden");
                    options.generate.classList.add("hidden");
                    options.record.classList.remove("hidden");
                    createToast('New problem generated!', 'fa-circle-check')
                }
            });
        }
    });
}
options.generate.addEventListener("click", async () => {
    options.generate.classList.toggle("is-loading");
    problem.problem.classList.toggle("hidden");
    problem.loader.classList.toggle("hidden");
    try {
        if (localStorage.getItem("options") === null) {
            createToast("Oops! You haven't selected a difficulty. Select a difficulty and try again.", 'fa-triangle-exclamation')
            options.generate.classList.toggle("is-loading");
            problem.problem.classList.toggle("hidden");
            problem.loader.classList.toggle("hidden");
        } else {
            const result = await generateProblem("random-id", localStorage.getItem("options").toLowerCase(), user);
            if (result === "error") {
                createToast('Error generating problem. Please try again later.', 'fa-triangle-exclamation')
                console.error("Issue with generateProblem().");
                options.generate.classList.toggle("is-loading");
                problem.problem.classList.toggle("hidden");
                problem.loader.classList.toggle("hidden");
            } else if (result === "success") {
                options.generate.classList.toggle("is-loading");
                problem.problem.classList.toggle("hidden");
                problem.loader.classList.toggle("hidden");
                problem.link.classList.remove("hidden");
                options.generate.classList.add("hidden");
                options.record.classList.remove("hidden");
                createToast('New problem generated!', 'fa-circle-check')
            }
        }
    } catch (err) {
        createToast('Error generating problem. Please try again later.', 'fa-triangle-exclamation')
        options.generate.classList.toggle("is-loading");
        problem.problem.classList.toggle("hidden");
        problem.loader.classList.toggle("hidden");
    }
});

async function generateProblem(idType, data, user) {
    return new Promise(async resolve => {
        try {
            let id = -1;
            let div = "";
            if (idType === "random-id") {
                div = data.toLowerCase();
                // console.log("Generating random problem...");
                await retrieveUserDoc(db, user).then(adoc => {
                    // console.log("Retrieved user document.");
                    const fsdata = adoc.data();
                    const problemsSeen = fsdata["problemsSeen"];
                    // console.log("Retrieved user document.2");
                    id = problems[data][Math.floor(Math.random() * problems[data].length)].id;
                    while (problemsSeen.includes(id)) {
                        console.log(id + " is already seen. Generating new problem...");
                        id = problems[data][Math.floor(Math.random() * problems[data].length)].id;
                    }
                });
            } else if (idType === "custom-id") {
                // set id to data[0] in int form
                id = parseInt(data[0]);
                div = data[1].toLowerCase();
            }
            let generated = {};
            // console.log("id: " + id + ", div: " + div);
            problems[div].every(p => {
                if (p.id === id) {
                    generated = p;
                    return false;
                }
                return true;
            });
            if (generated.hasOwnProperty("id")) {
                console.log("Found problem with id " + id + ".");
                try {
                    problem.title.innerText = generated.title;
                    problem.subtitle.innerText = generated.subtitle;
                    problem.text.innerHTML = generated.problem;
                    problem.link.href = generated.url;
                    problem.link.classList.remove("hidden");
                    problem.id.classList.remove("hidden");
                    switch(generated.division) {
                        case "platinum":
                            problem.id.classList.remove("is-bronze", "is-silver", "is-gold", "is-primary");
                            problem.id.classList.add("is-platinum");
                            break;
                        case "gold":
                            problem.id.classList.remove("is-bronze", "is-silver", "is-platinum", "is-primary");
                            problem.id.classList.add("is-gold");
                            break;
                        case "silver":
                            problem.id.classList.remove("is-bronze", "is-gold", "is-platinum", "is-primary");
                            problem.id.classList.add("is-silver");
                            break;
                        case "bronze":
                            problem.id.classList.remove("is-silver", "is-gold", "is-platinum", "is-primary");
                            problem.id.classList.add("is-bronze");
                            break;
                        default:
                            problem.id.classList.remove("is-bronze", "is-silver", "is-gold", "is-platinum");
                            problem.id.classList.add("is-primary");
                    }
                    problem.id.innerText = "ID: " + generated.id;
                } catch (err) {
                    createToast(err.message, 'fa-triangle-exclamation')
                    console.log("oops1");
                    resolve("error");
                }
                window.renderMathInElement(document.getElementById("problem-text"), {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false},
                        {left: '\\(', right: '\\)', display: false},
                        {left: '\\[', right: '\\]', display: true}
                    ]
                });
                localStorage.setItem("problem", id);
                resolve("success");
            }
        } catch (err) {
            createToast(err.message, 'fa-triangle-exclamation')
            console.log("oops2");
            resolve("error");
        }
    });
}

options.trigger.addEventListener("click", () => {
    options.menu.classList.toggle("hidden");
});

async function retrieveUserDoc(db, user) {
    return await getDoc(doc(db, "user_data", user.uid));
}

for (let i = 0; i < options.toggleModal.length; i++) {
    options.toggleModal[i].addEventListener("click", () => {
        options.recordModal.classList.toggle("is-active");
    });
}

async function checkIfFS(db, user) {
    await retrieveUserDoc(db, user).then(adoc => {
        const fsdata = adoc.data();
        if (!fsdata.hasOwnProperty("problemsSeen")) {
            updateDoc(doc(db, "user_data", user.uid), {
                problemsSeen: [],
                problemsSolved: [],
                problemsSkipped: [],
                problemsUnsolved: []
            });
        }
    });
}
})

</script>