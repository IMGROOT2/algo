import {auth} from "./app-config";
import * as bulmaToast from 'bulma-toast'
import * as problems from '../data/data.json'
import {onAuthStateChanged} from "firebase/auth";

const {setDefaults} = bulmaToast;

setDefaults({
    position: 'bottom-left'
});

const problem = {
    title: document.getElementById("problem-title"),
    subtitle: document.getElementById("problem-subtitle"),
    text: document.getElementById("problem-text"),
    link: document.getElementById("problem-link"),
    id: document.getElementById("problem-id")
};

let user;
onAuthStateChanged(auth, async auser => {
    user = auser;
    if (user) {
        const id = window.location.pathname.match(/problem\/(\d+)/)[1];
        console.log(id);
        generateProblem(id);
    } else {
        location.href = "/login";
    }
});


function generateProblem(id) {
        try {
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
            if (!found) {
                location.href = "/404";
            }
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
                document.title = generated.title + " - Algo";
            } catch (err) {
                bulmaToast.toast({message: err.message, type: 'is-danger'});
                console.log("oops1");
            }
            window.renderMathInElement(document.getElementById("problem-text"), {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true}
                ]
            });
        } catch (err) {
            bulmaToast.toast({message: err.message, type: 'is-danger'});
            console.log("oops2");
        }
}