import { auth, db } from "./app-config";
import * as bulmaToast from 'bulma-toast'
import * as problems from '../data/data.json'
import {doc, getDoc, updateDoc} from "firebase/firestore";

const { setDefaults, toast } = bulmaToast;

setDefaults({
    position: 'bottom-left'
});

const options = {
    label: document.getElementById("diff-label"),
    trigger: document.getElementById("diff-trigger"),
    menu: document.getElementById("diff-menu"),
    items: document.getElementsByClassName("dropdown-item"),
    generate: document.getElementById("generate-button"),
    dropdown: document.getElementById("diff-dropdown"),
    green: document.getElementById("green"),
    yellow: document.getElementById("yellow"),
    red: document.getElementById("red")
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
    if (user) {

        console.log(user.uid);

        if (localStorage.getItem("options") != null) {
            options.label.innerText = localStorage.getItem("options");
            for (let i = 0; i < options.items.length; i++) {
                if (options.items[i].innerText === localStorage.getItem("options")) {
                    options.items[i].classList.add("is-active");
                }
            }
        }
        try {
            if (localStorage.getItem("problem") !== null) {
                options.red.classList.toggle("is-loading");
                options.yellow.classList.toggle("is-loading");
                options.green.classList.toggle("is-loading");
                options.generate.classList.toggle("is-loading");
                problem.problem.classList.toggle("is-hidden");
                problem.loader.classList.toggle("is-hidden");
                const result = await generateProblem("custom-id", localStorage.getItem("problem"), user);
                if (result === "error") {
                    toast({message: "Oops! Couldn't load previous problem.", type: 'is-warning'});
                    console.error("Issue with generateProblem().");
                    options.generate.classList.toggle("is-loading");
                    problem.problem.classList.toggle("is-hidden");
                    problem.loader.classList.toggle("is-hidden");
                    options.red.classList.toggle("is-loading");
                    options.yellow.classList.toggle("is-loading");
                    options.green.classList.toggle("is-loading");
                } else if (result === "success") {
                    options.generate.classList.toggle("is-loading");
                    options.generate.classList.toggle("is-hidden");
                    problem.problem.classList.toggle("is-hidden");
                    problem.loader.classList.toggle("is-hidden");
                    problem.link.classList.remove("is-hidden");
                    options.red.classList.toggle("is-loading");
                    options.yellow.classList.toggle("is-loading");
                    options.green.classList.toggle("is-loading");
                    bulmaToast.toast({message: 'Restored previous problem!', type: 'is-success'});
                }
            }
        } catch (err) {
            toast({message: "Oops! Couldn't load previous problem.", type: 'is-warning'});
            console.error(err.message);
            options.generate.classList.toggle("is-loading");
            problem.problem.classList.toggle("is-hidden");
            problem.loader.classList.toggle("is-hidden");
            options.red.classList.toggle("is-loading");
            options.yellow.classList.toggle("is-loading");
            options.green.classList.toggle("is-loading");
        }
        document.getElementById("solve-button").classList.add("is-hidden");


        options.green.addEventListener("click", async () => {
            options.red.classList.toggle("is-loading");
            options.yellow.classList.toggle("is-loading");
            options.green.classList.toggle("is-loading");
            problem.problem.classList.toggle("is-hidden");
            problem.loader.classList.toggle("is-hidden");
            try {
                // in firestore, find the document with the id of the user. then add localstorage.getItem("problem") to the array called "problems-seen" and "problems-solved"
                // use v9
                await retrieveUserDoc(db, user).then((adoc) => {
                    const data = adoc.data();
                    const problemsSeen = data["problems-seen"];
                    const problemsSolved = data["problems-solved"];
                    const problemsSkipped = data["problems-skipped"];
                    const problemsUnsolved = data["problems-unsolved"];
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
                        "problems-seen": problemsSeen,
                        "problems-solved": problemsSolved,
                        "problems-skipped": problemsSkipped,
                        "problems-unsolved": problemsUnsolved
                    }).then(() => {
                        console.log("Updated user document.");
                    });

                });
                if (localStorage.getItem("options") === null) {
                    bulmaToast.toast({
                        message: "Oops! You haven't selected a difficulty. Select a difficulty and try again.",
                        type: 'is-warning'
                    });
                    options.red.classList.toggle("is-loading");
                    options.yellow.classList.toggle("is-loading");
                    options.green.classList.toggle("is-loading");
                    problem.problem.classList.toggle("is-hidden");
                    problem.loader.classList.toggle("is-hidden");
                } else {
                    const result = await generateProblem("random-id", localStorage.getItem("options").toLowerCase(), user);
                    if (result === "error") {
                        toast({message: 'Error generating problem. Please try again later.', type: 'is-danger'});
                        console.error("Issue with generateProblem().");
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("is-hidden");
                        problem.loader.classList.toggle("is-hidden");
                    } else if (result === "success") {
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("is-hidden");
                        problem.loader.classList.toggle("is-hidden");
                        problem.link.classList.remove("is-hidden");
                        options.generate.classList.add("is-hidden");
                        bulmaToast.toast({message: 'New problem generated!', type: 'is-success'});
                    }
                }
            } catch (err) {
                toast({message: 'Error generating problem. Please try again later.', type: 'is-danger'});
                console.error(err.message);
                options.red.classList.toggle("is-loading");
                options.yellow.classList.toggle("is-loading");
                options.green.classList.toggle("is-loading");
                problem.problem.classList.toggle("is-hidden");
                problem.loader.classList.toggle("is-hidden");
            }
        });
        options.yellow.addEventListener("click", async () => {
            options.red.classList.toggle("is-loading");
            options.yellow.classList.toggle("is-loading");
            options.green.classList.toggle("is-loading");
            problem.problem.classList.toggle("is-hidden");
            problem.loader.classList.toggle("is-hidden");
            try {
                // in firestore, find the document with the id of the user. then add localstorage.getItem("problem") to the array called "problems-seen" and "problems-solved"
                // use v9
                await retrieveUserDoc(db, user).then((adoc) => {
                    const data = adoc.data();
                    const problemsSeen = data["problems-seen"];
                    const problemsSolved = data["problems-solved"];
                    const problemsSkipped = data["problems-skipped"];
                    const problemsUnsolved = data["problems-unsolved"];
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
                    // update the document with the new arrays
                    updateDoc(doc(db, "user_data", user.uid), {
                        "problems-seen": problemsSeen,
                        "problems-solved": problemsSolved,
                        "problems-skipped": problemsSkipped,
                        "problems-unsolved": problemsUnsolved
                    }).then(() => {
                        console.log("Updated user document.");
                    });

                });
                if (localStorage.getItem("options") === null) {
                    bulmaToast.toast({
                        message: "Oops! You haven't selected a difficulty. Select a difficulty and try again.",
                        type: 'is-warning'
                    });
                    options.red.classList.toggle("is-loading");
                    options.yellow.classList.toggle("is-loading");
                    options.green.classList.toggle("is-loading");
                    problem.problem.classList.toggle("is-hidden");
                    problem.loader.classList.toggle("is-hidden");
                } else {
                    const result = await generateProblem("random-id", localStorage.getItem("options").toLowerCase(), user);
                    if (result === "error") {
                        toast({message: 'Error generating problem. Please try again later.', type: 'is-danger'});
                        console.error("Issue with generateProblem().");
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("is-hidden");
                        problem.loader.classList.toggle("is-hidden");
                    } else if (result === "success") {
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("is-hidden");
                        problem.loader.classList.toggle("is-hidden");
                        problem.link.classList.remove("is-hidden");
                        options.generate.classList.add("is-hidden");
                        bulmaToast.toast({message: 'New problem generated!', type: 'is-success'});
                    }
                }
            } catch (err) {
                toast({message: 'Error generating problem. Please try again later.', type: 'is-danger'});
                console.error(err.message);
                options.red.classList.toggle("is-loading");
                options.yellow.classList.toggle("is-loading");
                options.green.classList.toggle("is-loading");
                problem.problem.classList.toggle("is-hidden");
                problem.loader.classList.toggle("is-hidden");
            }
        });
        options.red.addEventListener("click", async () => {
            options.red.classList.toggle("is-loading");
            options.yellow.classList.toggle("is-loading");
            options.green.classList.toggle("is-loading");
            problem.problem.classList.toggle("is-hidden");
            problem.loader.classList.toggle("is-hidden");
            try {
                // in firestore, find the document with the id of the user. then add localstorage.getItem("problem") to the array called "problems-seen" and "problems-solved"
                // use v9
                await retrieveUserDoc(db, user).then((adoc) => {
                    const data = adoc.data();
                    const problemsSeen = data["problems-seen"];
                    const problemsSolved = data["problems-solved"];
                    const problemsSkipped = data["problems-skipped"];
                    const problemsUnsolved = data["problems-unsolved"];
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
                        "problems-seen": problemsSeen,
                        "problems-solved": problemsSolved,
                        "problems-skipped": problemsSkipped,
                        "problems-unsolved": problemsUnsolved
                    }).then(() => {
                        console.log("Updated user document.");
                    });

                });
                if (localStorage.getItem("options") === null) {
                    bulmaToast.toast({
                        message: "Oops! You haven't selected a difficulty. Select a difficulty and try again.",
                        type: 'is-warning'
                    });
                    options.red.classList.toggle("is-loading");
                    options.yellow.classList.toggle("is-loading");
                    options.green.classList.toggle("is-loading");
                    problem.problem.classList.toggle("is-hidden");
                    problem.loader.classList.toggle("is-hidden");
                } else {
                    const result = await generateProblem("random-id", localStorage.getItem("options").toLowerCase(), user);
                    if (result === "error") {
                        toast({message: 'Error generating problem. Please try again later.', type: 'is-danger'});
                        console.error("Issue with generateProblem().");
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("is-hidden");
                        problem.loader.classList.toggle("is-hidden");
                    } else if (result === "success") {
                        options.red.classList.toggle("is-loading");
                        options.yellow.classList.toggle("is-loading");
                        options.green.classList.toggle("is-loading");
                        problem.problem.classList.toggle("is-hidden");
                        problem.loader.classList.toggle("is-hidden");
                        problem.link.classList.remove("is-hidden");
                        options.generate.classList.add("is-hidden");
                        bulmaToast.toast({message: 'New problem generated!', type: 'is-success'});
                    }
                }
            } catch (err) {
                toast({message: 'Error generating problem. Please try again later.', type: 'is-danger'});
                console.error(err.message);
                options.red.classList.toggle("is-loading");
                options.yellow.classList.toggle("is-loading");
                options.green.classList.toggle("is-loading");
                problem.problem.classList.toggle("is-hidden");
                problem.loader.classList.toggle("is-hidden");
            }
        });


    } else {
        location.href = "/login";
    }
});
for (let i = 0; i < options.items.length; i++) {
    options.items[i].addEventListener("click", () => {
        options.dropdown.classList.toggle("is-active");
        options.label.innerText = options.items[i].innerText;
        localStorage.setItem("options", options.items[i].innerText);
        for (let j = 0; j < options.items.length; j++) {
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
            const result = await generateProblem("random-id", localStorage.getItem("options").toLowerCase(), user);
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
                options.generate.classList.add("is-hidden");
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

async function generateProblem(idType, data, user) {
    return new Promise(async resolve => {
        try {
            let id = -1;
            if (idType === "random-id") {
                console.log("Generating random problem...");
                await retrieveUserDoc(db, user).then(adoc => {
                    console.log("Retrieved user document.");
                    const fsdata = adoc.data();
                    const problemsSeen = fsdata["problems-seen"];
                    console.log("Retrieved user document.2");
                    id = problems[data][Math.floor(Math.random() * problems[data].length)];
                    while (problemsSeen.includes(id)) {
                        console.log(id + " is already seen. Generating new problem...");
                        id = problems[data][Math.floor(Math.random() * problems[data].length)];
                    }
                });
            } else if (idType === "custom-id") {
                id = data;
            }
            fetch('https://proxy.cors.sh/http://usaco.org/index.php?page=viewproblem2&cpid=' + id, {
                headers: {
                    'x-cors-api-key': 'b1c8b699-db38-4c0b-92f6-632a6ebff01c'
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
                    } catch (err) {
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
        } catch (err) {
            console.error(err.message);
            console.log("oops");
            resolve("error");
        }
    });
}
options.trigger.addEventListener("click", () => {
    options.dropdown.classList.toggle("is-active");
});
async function retrieveUserDoc(db, user) {
    return await getDoc(doc(db, "user_data", user.uid));
}
