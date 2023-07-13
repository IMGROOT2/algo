import {auth, db} from "./app-config";
import * as bulmaToast from 'bulma-toast'
import * as problems from '../data/data.json'
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";

const {setDefaults, toast} = bulmaToast;

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
    red: document.getElementById("red"),
    record: document.getElementById("recordstatus"),
    toggleModal: document.getElementsByClassName("toggleModal"),
    recordModal: document.getElementById("recordModal")
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
                    options.items[i].classList.add("is-active");
                }
            }
        }
        try {
            if (localStorage.getItem("problem") !== null) {
                options.generate.classList.toggle("is-loading");
                problem.problem.classList.toggle("is-hidden");
                problem.loader.classList.toggle("is-hidden");
                const result = await generateProblem("custom-id", [localStorage.getItem("problem"), localStorage.getItem("options")], user);
                if (result === "error") {
                    toast({message: "Oops! Couldn't load previous problem.", type: 'is-warning'});
                    console.error("Issue with generateProblem().");
                    options.generate.classList.toggle("is-loading");
                    problem.problem.classList.toggle("is-hidden");
                    problem.loader.classList.toggle("is-hidden");
                } else if (result === "success") {
                    options.generate.classList.toggle("is-loading");
                    options.generate.classList.toggle("is-hidden");
                    problem.problem.classList.toggle("is-hidden");
                    problem.loader.classList.toggle("is-hidden");
                    problem.link.classList.remove("is-hidden");
                    options.record.classList.remove("is-hidden");
                    bulmaToast.toast({message: 'Restored previous problem!', type: 'is-success'});
                }
            }
        } catch (err) {
            toast({message: "Oops! Couldn't load previous problem.", type: 'is-warning'});
            bulmaToast.toast({message: err.message, type: 'is-danger'});
            options.generate.classList.toggle("is-loading");
            problem.problem.classList.toggle("is-hidden");
            problem.loader.classList.toggle("is-hidden");
            options.red.classList.toggle("is-loading");
            options.yellow.classList.toggle("is-loading");
            options.green.classList.toggle("is-loading");
        }


        options.green.addEventListener("click", async () => {
            options.red.classList.toggle("is-loading");
            options.yellow.classList.toggle("is-loading");
            options.green.classList.toggle("is-loading");
            problem.problem.classList.toggle("is-hidden");
            problem.loader.classList.toggle("is-hidden");
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
                bulmaToast.toast({message: err.message, type: 'is-danger'});
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
                bulmaToast.toast({message: err.message, type: 'is-danger'});
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
                bulmaToast.toast({message: err.message, type: 'is-danger'});
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
        let previous = localStorage.getItem("options");
        localStorage.setItem("options", options.items[i].innerText);
        for (let j = 0; j < options.items.length; j++) {
            options.items[j].classList.remove("is-active");
        }
        options.items[i].classList.add("is-active");
        if (previous !== localStorage.getItem("options")) {
            options.generate.classList.toggle("is-loading");
            problem.problem.classList.toggle("is-hidden");
            problem.loader.classList.toggle("is-hidden");
            generateProblem("random-id", localStorage.getItem("options").toLowerCase(), user).then((result) => {
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
                    options.record.classList.remove("is-hidden");
                    bulmaToast.toast({message: 'New problem generated!', type: 'is-success'});
                }
            });
        }
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
                options.record.classList.remove("is-hidden");
                bulmaToast.toast({message: 'New problem generated!', type: 'is-success'});
            }
        }
    } catch (err) {
        toast({message: 'Error generating problem. Please try again later.', type: 'is-danger'});
        bulmaToast.toast({message: err.message, type: 'is-danger'});
        options.generate.classList.toggle("is-loading");
        problem.problem.classList.toggle("is-hidden");
        problem.loader.classList.toggle("is-hidden");
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
                    problem.link.classList.remove("is-hidden");
                    problem.id.classList.remove("is-hidden");
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
                    bulmaToast.toast({message: err.message, type: 'is-danger'});
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
            bulmaToast.toast({message: err.message, type: 'is-danger'});
            console.log("oops2");
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