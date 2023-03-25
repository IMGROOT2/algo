import { app, db, auth } from "./app-config";
import { GoogleAuthProvider, EmailAuthProvider } from "firebase/auth";

const dt = document.getElementById("dash-title");
const ds = document.getElementById("dash-subtitle");
const circle = document.getElementsByClassName("check-circle");

auth.onAuthStateChanged(async user => {
    if(user) {
        dt.innerText = "Welcome, " + user.displayName + "!";
        ds.innerText = "Today is ";
        const date = new Date();
        switch (date.getDay()) {
            case 0:
                ds.innerText += " " + "Sunday, ";
                break;
            case 1:
                ds.innerText += " " + "Monday, ";
                break;
            case 2:
                ds.innerText += " " + "Tuesday, ";
                break;
            case 3:
                ds.innerText += " " + "Wednesday, ";
                break;
            case 4:
                ds.innerText += " " + "Thursday, ";
                break;
            case 5:
                ds.innerText += " " + "Friday, ";
                break;
            case 6:
                ds.innerText += " " + "Saturday, ";
                break;
        }
        switch (date.getMonth()) {
            case 0:
                ds.innerText += " " + "January ";
                break;
            case 1:
                ds.innerText += " " + "February ";
                break;
            case 2:
                ds.innerText += " " + "March ";
                break;
            case 3:
                ds.innerText += " " + "April ";
                break;
            case 4:
                ds.innerText += " " + "May ";
                break;
            case 5:
                ds.innerText += " " + "June ";
                break;
            case 6:
                ds.innerText += " " + "July ";
                break;
            case 7:
                ds.innerText += " " + "August ";
                break;
            case 8:
                ds.innerText += " " + "September ";
                break;
            case 9:
                ds.innerText += " " + "October ";
                break;
            case 10:
                ds.innerText += " " + "November ";
                break;
            case 11:
                ds.innerText += " " + "December ";
                break;
        }
        ds.innerText += " " + date.getDate() + ".";
        // for each circle, add an event listener
        Array.from(circle).forEach(circle => {
            circle.addEventListener("click", () => {
                circle.classList.toggle("fa-circle");
                circle.classList.toggle("fa-circle-check");
                circle.classList.toggle("checkedOff");
            });
        });
    }
    else {
        location.href="/login";
    }
});