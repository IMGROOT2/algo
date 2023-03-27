import { app, db, auth } from "./app-config";
import * as bulmaToast from 'bulma-toast'
import {toast} from "bulma-toast";
import fs from "fs";


bulmaToast.setDefaults({
    position: 'bottom-left'
})

const options = {
    label: document.getElementById("diff-label"),
    trigger: document.getElementById("diff-trigger"),
    menu: document.getElementById("diff-menu"),
    items: document.getElementsByClassName("dropdown-item"),
    generate: document.getElementById("generate-button")
}

const problem = {
    link: document.getElementById("external-icon"),
    problem: document.getElementById("problem"),
    title: document.getElementById("problem-title"),
    subtitle: document.getElementById("problem-subtitle"),
    text: document.getElementById("problem-text"),
    loader: document.getElementById("problem-loader")
}

auth.onAuthStateChanged(async user => {
    if(user) {
        if(localStorage.getItem("options") != null) {
            options.label.innerText = localStorage.getItem("options");
            for(let i = 0; i < options.items.length; i++) {
                if(options.items[i].innerText === localStorage.getItem("options")) {
                    options.items[i].classList.add("is-active");
                }
            }
        }
        document.getElementById("solve-button").classList.add("is-hidden");
    }
    else {
        location.href="/login";
    }
});
for(let i = 0; i < options.items.length; i++) {
    options.items[i].addEventListener("click", () => {
        options.label.innerText = options.items[i].innerText;
        localStorage.setItem("options", options.items[i].innerText);
        for(let j = 0; j < options.items.length; j++) {
            options.items[j].classList.remove("is-active");
        }
        options.items[i].classList.add("is-active");
    });
}
options.generate.addEventListener("click", () => {
    options.generate.classList.toggle("is-loading");
    problem.problem.classList.toggle("is-hidden");
    problem.loader.classList.toggle("is-hidden");
    try {
        const difficulty = options.label.innerText.toLowerCase();
        let id = -1;
        if(difficulty === "bronze") {
            // pick a random number from the data in bronze.json
            const bronze = JSON.parse(fs.readFileSync('./src/data/bronze.json', 'utf8'));
            id = bronze[Math.floor(Math.random() * bronze.length)];
        }
        else if(difficulty === "silver") {
            // pick a random number from the data in silver.json
            const silver = JSON.parse(fs.readFileSync('./src/data/silver.json', 'utf8'));
            id = silver[Math.floor(Math.random() * silver.length)];
        }
        else if(difficulty === "gold") {
            // pick a random number from the data in gold.json
            const gold = JSON.parse(fs.readFileSync('./src/data/gold.json', 'utf8'));
            id = gold[Math.floor(Math.random() * gold.length)];
        }
        else if(difficulty === "platinum") {
            // pick a random number from the data in platinum.json
            const platinum = JSON.parse(fs.readFileSync('./src/data/platinum.json', 'utf8'));
            id = platinum[Math.floor(Math.random() * platinum.length)];
        }




        fetch('https://cors-anywhere.herokuapp.com/http://usaco.org/index.php?page=viewproblem2&cpid=' + id, {mode: 'cors', method: 'GET'})
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const html = parser.parseFromString(data, 'text/html');
            problem.title.innerText = html.getElementsByClassName("panel")[0].getElementsByTagName("h2")[1].innerText;
            problem.subtitle.innerText = html.getElementsByClassName("panel")[0].getElementsByTagName("h2")[0].innerText;
            problem.text.innerHTML = html.getElementById("probtext-text").innerHTML;
            problem.link.href = 'http://usaco.org/index.php?page=viewproblem2&cpid=' + id;
        })



        options.generate.classList.toggle("is-loading");
        problem.problem.classList.toggle("is-hidden");
        problem.loader.classList.toggle("is-hidden");
        problem.link.classList.remove("is-hidden");
        bulmaToast.toast({ message: 'New problem generated!', type: 'is-success' });

    }
    catch(err) {
        toast({ message: 'Error generating problem. Please try again later.', type: 'is-danger' });
        options.generate.classList.toggle("is-loading");
        problem.problem.classList.toggle("is-hidden");
        problem.loader.classList.toggle("is-hidden");
    }
});