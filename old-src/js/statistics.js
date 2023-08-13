import {auth, db} from "./app-config";
import {doc, getDoc} from "firebase/firestore";
import Chart from 'chart.js/auto';
import {onAuthStateChanged} from "firebase/auth";
import * as problems from "../data/data.json";

const name = document.getElementById("name");
const numSolved = document.getElementById("num-solved");
const numSeen = document.getElementById("num-seen");
const numSkipped = document.getElementById("num-skipped");
const numUnsolved = document.getElementById("num-unsolved");
const chart = document.getElementById("chart");

const statsModal = document.getElementById("statsModal");
const toggleStatsModal = document.getElementsByClassName("toggleStatsModal");
const statsTitle = document.getElementById("statsTitle");
const problemSearch = document.getElementById("problemSearch");
const searchButton = document.getElementById("searchButton");
const searchMenu = document.getElementById("searchMenu");

const detail = {
    "solved": document.getElementById("solved-detail-button"),
    "seen": document.getElementById("seen-detail-button"),
    "skipped": document.getElementById("skipped-detail-button"),
    "unsolved": document.getElementById("unsolved-detail-button")
}
let pSeen = [];
let pSolved = [];
let pSkipped = [];
let pUnsolved = [];
let pSeenSearch = [];
let pSolvedSearch = [];
let pSkippedSearch = [];
let pUnsolvedSearch = [];

function showStatsModal(type) {
    statsTitle.innerText = "Search " + type.charAt(0).toUpperCase() + type.slice(1) + " Problems";
    if(type === "solved") {
        statsTitle.style.color = "#23d160";
        searchMenu.innerHTML = "";
        pSolved.forEach(id => {
            const info = getInfo(id);
            const li = document.createElement("li");
            const a = document.createElement("a");
            const span = document.createElement("span");
            span.classList.add("tag", "has-text-white", "is-6", "ml-2");
            span.innerText = id;
            if(info.division === "bronze") {
                span.classList.add("is-bronze");
            }
            if(info.division === "silver") {
                span.classList.add("is-silver");
            }
            if(info.division === "gold") {
                span.classList.add("is-gold");
            }
            if(info.division === "platinum") {
                span.classList.add("is-platinum");
            }
            let toPush = id + " " + info.title.substring(11).toLowerCase() + " " + info.division;
            pSolvedSearch.push(toPush);
            a.classList.add("has-text-white");
            a.href = "/problem/" + id;
            a.innerText += info.title.substring(11);
            a.appendChild(span);
            li.appendChild(a);
            searchMenu.appendChild(li);
        });
        localStorage.setItem("ModalType", "solved");
    }
    if(type === "seen") {
        statsTitle.style.color = "#209cee";
        searchMenu.innerHTML = "";
        pSeen.forEach(id => {
            const info = getInfo(id);
            const li = document.createElement("li");
            const a = document.createElement("a");
            const span = document.createElement("span");
            span.classList.add("tag", "has-text-white", "is-6", "ml-2");
            span.innerText = id;
            if(info.division === "bronze") {
                span.classList.add("is-bronze");
            }
            if(info.division === "silver") {
                span.classList.add("is-silver");
            }
            if(info.division === "gold") {
                span.classList.add("is-gold");
            }
            if(info.division === "platinum") {
                span.classList.add("is-platinum");
            }
            let toPush = id + " " + info.title.substring(11).toLowerCase() + " " + info.division;
            pSeenSearch.push(toPush);
            a.classList.add("has-text-white");
            a.href = "/problem/" + id;
            a.innerText += info.title.substring(11);
            a.appendChild(span);
            li.appendChild(a);
            searchMenu.appendChild(li);
        });
        localStorage.setItem("ModalType", "seen");
    }
    if(type === "skipped") {
        statsTitle.style.color = "#ffdd57";
        searchMenu.innerHTML = "";
        pSkipped.forEach(id => {
            const info = getInfo(id);
            const li = document.createElement("li");
            const a = document.createElement("a");
            const span = document.createElement("span");
            span.classList.add("tag", "has-text-white", "is-6", "ml-2");
            span.innerText = id;
            if(info.division === "bronze") {
                span.classList.add("is-bronze");
            }
            if(info.division === "silver") {
                span.classList.add("is-silver");
            }
            if(info.division === "gold") {
                span.classList.add("is-gold");
            }
            if(info.division === "platinum") {
                span.classList.add("is-platinum");
            }
            let toPush = id + " " + info.title.substring(11).toLowerCase() + " " + info.division;
            pSkippedSearch.push(toPush);
            a.classList.add("has-text-white");
            a.href = "/problem/" + id;
            a.innerText += info.title.substring(11);
            a.appendChild(span);
            li.appendChild(a);
            searchMenu.appendChild(li);
        });
        localStorage.setItem("ModalType", "skipped");
    }
    if(type === "unsolved") {
        statsTitle.style.color = "#ff3860";
        searchMenu.innerHTML = "";
        pUnsolved.forEach(id => {
            const info = getInfo(id);
            const li = document.createElement("li");
            const a = document.createElement("a");
            const span = document.createElement("span");
            span.classList.add("tag", "has-text-white", "is-6", "ml-2");
            span.innerText = id;
            if(info.division === "bronze") {
                span.classList.add("is-bronze");
            }
            if(info.division === "silver") {
                span.classList.add("is-silver");
            }
            if(info.division === "gold") {
                span.classList.add("is-gold");
            }
            if(info.division === "platinum") {
                span.classList.add("is-platinum");
            }
            let toPush = id + " " + info.title.substring(11).toLowerCase() + " " + info.division;
            pUnsolvedSearch.push(toPush);
            a.classList.add("has-text-white");
            a.href = "/problem/" + id;
            a.innerText += info.title.substring(11);
            a.appendChild(span);
            li.appendChild(a);
            searchMenu.appendChild(li);
        });
        localStorage.setItem("ModalType", "unsolved");
    }
    problemSearch.value = "";
    statsModal.classList.toggle("is-active");
}
for (let i = 0; i < toggleStatsModal.length; i++) {
    toggleStatsModal[i].addEventListener("click", () => {
        statsModal.classList.toggle("is-active");
    });
}

onAuthStateChanged(auth, async user => {
    if (user) {
        name.innerText = user.displayName;
        await retrieveUserDoc(db, user).then(adoc => {
            console.log("General info");
            console.log(adoc.data());
        });

        await retrieveUserDoc(db, user).then(async (adoc) => {
            const data = adoc.data();
            const problemsSeen = data["problemsSeen"];
            const problemsSolved = data["problemsSolved"];
            const problemsSkipped = data["problemsSkipped"];
            const problemsUnsolved = data["problemsUnsolved"];

            numSeen.innerText = problemsSeen.length;
            numSolved.innerText = problemsSolved.length;
            numSkipped.innerText = problemsSkipped.length;
            numUnsolved.innerText = problemsUnsolved.length;

            pSeen = problemsSeen;
            pSolved = problemsSolved;
            pSkipped = problemsSkipped;
            pUnsolved = problemsUnsolved;

            await genChart(problemsSolved.length, problemsSkipped.length, problemsUnsolved.length);

            for (const [key, value] of Object.entries(detail)) {
                value.addEventListener("click", () => {
                    showStatsModal(key, user);
                });
            }
        });


    } else {
        location.href = "/login";
    }
});

async function retrieveUserDoc(db, user) {
    return await getDoc(doc(db, "user_data", user.uid));
}

async function genChart(solved, skipped, unsolved) {
    if (solved + skipped + unsolved !== 0) {
        document.getElementById("showWhenZero").classList.add("is-hidden");
        new Chart(chart, {
            type: 'doughnut',
            data: {
                labels: [
                    "Unsolved, didn't attempt.",
                    'Solved!',
                    'Skipped, but attempted.'
                ],
                datasets: [{
                    data: [unsolved, solved, skipped],
                    backgroundColor: [
                        'hsl(348, 100%, 61%)',
                        'hsl(141, 71%, 48%)',
                        'hsl(48, 100%, 67%)'
                    ],
                    hoverOffset: 4
                }],
            },
        });
    } else {
        document.getElementById("showWhenZero").classList.remove("is-hidden");
    }
}
function getInfo(id) {
    let generated = {};
    let found = false;
    let divisions = ["bronze", "silver", "gold", "platinum"];
    divisions.every(division => {
        problems[division].every(p => {
            if (p.id === parseInt(id)) {
                generated = p;
                found = true;
                return false;
            }
            return true;
        });
        return !found;
    });
    return generated;
}

problemSearch.addEventListener("input", () => {
    searchAndUpdate();
});
searchButton.addEventListener("click", () => {
    searchAndUpdate();
});

function searchAndUpdate() {
    let type = localStorage.getItem("ModalType");
    let value = problemSearch.value.toLowerCase();
    let array = [];
    if(type === "seen") {
        array = pSeenSearch;
    }
    if(type === "solved") {
        array = pSolvedSearch;
    }
    if(type === "skipped") {
        array = pSkippedSearch;
    }
    if(type === "unsolved") {
        array = pUnsolvedSearch;
    }
    let filtered = array.filter(problem => {
        if(problem.includes(value)) {
            console.log("found that " + value + "is in " + problem);
        }
        else {
            console.log("found that " + value + "is not in " + problem);
        }
        return problem.includes(value);
    });
    console.log(filtered);
    // clear the menu, then add the filtered items
    searchMenu.innerHTML = "";
    filtered.forEach(problem => {
        let id = problem.split(" ")[0];
        let info = getInfo(id);
        const li = document.createElement("li");
        const a = document.createElement("a");
        const span = document.createElement("span");
        span.classList.add("tag", "has-text-white", "is-6", "ml-2");
        span.innerText = id;
        if(info.division === "bronze") {
            span.classList.add("is-bronze");
        }
        if(info.division === "silver") {
            span.classList.add("is-silver");
        }
        if(info.division === "gold") {
            span.classList.add("is-gold");
        }
        if(info.division === "platinum") {
            span.classList.add("is-platinum");
        }
        a.classList.add("has-text-white");
        a.href = "/problem/" + id;
        a.innerText += info.title.substring(11);
        a.appendChild(span);
        li.appendChild(a);
        searchMenu.appendChild(li);
    });
}
