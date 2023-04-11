import { auth, db } from "./app-config";
import * as bulmaToast from 'bulma-toast'
import {doc, getDoc, updateDoc} from "firebase/firestore";
import Chart from 'chart.js/auto';

const name = document.getElementById("name");
const numSolved = document.getElementById("num-solved");
const numSeen = document.getElementById("num-seen");
const numSkipped = document.getElementById("num-skipped");
const numUnsolved = document.getElementById("num-unsolved");
const chart = document.getElementById("chart");

const { setDefaults, toast } = bulmaToast;

setDefaults({
    position: 'bottom-left'
});


auth.onAuthStateChanged(async user => {
    if (user) {

        name.innerText = user.displayName;

        await retrieveUserDoc(db, user).then(async (adoc) => {
            const data = adoc.data();
            const problemsSeen = data["problems-seen"];
            const problemsSolved = data["problems-solved"];
            const problemsSkipped = data["problems-skipped"];
            const problemsUnsolved = data["problems-unsolved"];

            numSeen.innerText = problemsSeen.length;
            numSolved.innerText = problemsSolved.length;
            numSkipped.innerText = problemsSkipped.length;
            numUnsolved.innerText = problemsUnsolved.length;

            await genChart(problemsSolved.length, problemsSkipped.length, problemsUnsolved.length);
        });


    } else {location.href = "/login";}
});
async function retrieveUserDoc(db, user) {
    return await getDoc(doc(db, "user_data", user.uid));
}
async function genChart(solved, skipped, unsolved) {
    if(solved + skipped + unsolved !== 0) {
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
    }
    else {
        document.getElementById("showWhenZero").classList.remove("is-hidden");
    }
}