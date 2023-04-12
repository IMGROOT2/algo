document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});

import { toast } from "bulma-toast";
import { auth, db } from "./app-config";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";

onAuthStateChanged(auth, async user => {
    if (user) {
        await retrieveUserDoc(db, user).then(adoc => {
            console.log(adoc.data());
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
});
async function retrieveUserDoc(db, user) {
    return await getDoc(doc(db, "user_data", user.uid));
}
