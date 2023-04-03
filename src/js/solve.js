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
        try {
            options.generate.classList.toggle("is-loading");
            problem.problem.classList.toggle("is-hidden");
            problem.loader.classList.toggle("is-hidden");
            if(localStorage.getItem("problem") === null) {
                bulmaToast.toast({ message: "Oops! Couldn't load previous problem.", type: 'is-warning' });
                options.generate.classList.toggle("is-loading");
                problem.problem.classList.toggle("is-hidden");
                problem.loader.classList.toggle("is-hidden");
            }
            else {
                const result = await generateProblem("custom-id", localStorage.getItem("problem"));
                if(result === "error") {
                    toast({ message: "Oops! Couldn't load previous problem.", type: 'is-warning' });
                    console.error("Issue with generateProblem().");
                    options.generate.classList.toggle("is-loading");
                    problem.problem.classList.toggle("is-hidden");
                    problem.loader.classList.toggle("is-hidden");
                }
                else if(result === "success"){
                    options.generate.classList.toggle("is-loading");
                    problem.problem.classList.toggle("is-hidden");
                    problem.loader.classList.toggle("is-hidden");
                    problem.link.classList.remove("is-hidden");
                    bulmaToast.toast({message: 'Restored previous problem!', type: 'is-success'});
                }
            }
        }
        catch(err) {
            toast({ message: "Oops! Couldn't load previous problem.", type: 'is-warning' });
            console.error(err.message);
            options.generate.classList.toggle("is-loading");
            problem.problem.classList.toggle("is-hidden");
            problem.loader.classList.toggle("is-hidden");
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
options.generate.addEventListener("click", async () => {
    options.generate.classList.toggle("is-loading");
    problem.problem.classList.toggle("is-hidden");
    problem.loader.classList.toggle("is-hidden");
    try {
        if (localStorage.getItem("options") === null) {
            bulmaToast.toast({
                message: "Oops! You haven't selected a difficulty. Select a difficulty and try again.",
                type: 'is-warning'
            });
            options.generate.classList.toggle("is-loading");
            problem.problem.classList.toggle("is-hidden");
            problem.loader.classList.toggle("is-hidden");
        } else {
            const result = await generateProblem("random-id", localStorage.getItem("options").toLowerCase());
            if (result === "error") {
                toast({message: 'Error generating problem. Please try again later.', type: 'is-danger'});
                console.error("Issue with generateProblem().");
                options.generate.classList.toggle("is-loading");
                problem.problem.classList.toggle("is-hidden");
                problem.loader.classList.toggle("is-hidden");
            } else if (result === "success") {
                options.generate.classList.toggle("is-loading");
                problem.problem.classList.toggle("is-hidden");
                problem.loader.classList.toggle("is-hidden");
                problem.link.classList.remove("is-hidden");
                bulmaToast.toast({message: 'New problem generated!', type: 'is-success'});
            }
        }
    } catch (err) {
        toast({message: 'Error generating problem. Please try again later.', type: 'is-danger'});
        console.error(err.message);
        options.generate.classList.toggle("is-loading");
        problem.problem.classList.toggle("is-hidden");
        problem.loader.classList.toggle("is-hidden");
    }
});
async function generateProblem(idType, data) {
    return new Promise(resolve => {
        try {
            var id = -1;
            if(idType === "random-id") {
                if (data === "bronze") {
                    // pick a random number from the data in bronze.json
                    const bronze = JSON.parse(fs.readFileSync('./src/data/bronze.json', 'utf8'));
                    id = bronze[Math.floor(Math.random() * bronze.length)];
                } else if (data === "silver") {
                    // pick a random number from the data in silver.json
                    const silver = JSON.parse(fs.readFileSync('./src/data/silver.json', 'utf8'));
                    id = silver[Math.floor(Math.random() * silver.length)];
                } else if (data === "gold") {
                    // pick a random number from the data in gold.json
                    const gold = JSON.parse(fs.readFileSync('./src/data/gold.json', 'utf8'));
                    id = gold[Math.floor(Math.random() * gold.length)];
                } else if (data === "platinum") {
                    // pick a random number from the data in platinum.json
                    const platinum = JSON.parse(fs.readFileSync('./src/data/platinum.json', 'utf8'));
                    id = platinum[Math.floor(Math.random() * platinum.length)];
                }
            }
            else if(idType === "custom-id") {
                id = data;
            }


            fetch('https://proxy.cors.sh/http://usaco.org/index.php?page=viewproblem2&cpid=' + id, {
                headers: {
                    'x-cors-api-key': 'temp_f4ed01f6394b2325ead5f8bad55f4e65'
                }
            })
                .then(response => response.text())
                .then(data => {
                    try {
                        const parser = new DOMParser();
                        const html = parser.parseFromString(data, 'text/html');
                        problem.title.innerText = html.getElementsByClassName("panel")[0].getElementsByTagName("h2")[1].innerText;
                        problem.subtitle.innerText = html.getElementsByClassName("panel")[0].getElementsByTagName("h2")[0].innerText;
                        problem.text.innerHTML = html.getElementById("probtext-text").innerHTML;
                        problem.link.href = 'http://usaco.org/index.php?page=viewproblem2&cpid=' + id;
                    }
                    catch(err) {
                        console.error(err.message);
                        console.log("oops");
                        resolve("error");
                    }
                }).then(() => {
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
            });
        }
        catch(err) {
            console.error(err.message);
            console.log("oops");
            resolve("error");
        }
    });
}