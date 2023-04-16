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
