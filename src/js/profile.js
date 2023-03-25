import {auth, db} from "./app-config";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {updateProfile} from "firebase/auth";


const name = document.getElementById('name');
const email = document.getElementById('email');
const photoURL = document.getElementById('photoURL');
const bio = document.getElementById('bio');
const location = document.getElementById('location');
const created = document.getElementById('created');
const btnUpdateProfile = document.getElementById('save-changes');
const load = document.getElementById('load');

auth.onAuthStateChanged(function(user) {
    if (user) {
        // get user document and snapshot
        retrieveUserDoc(db, user).then((doc) => {
            name.value = user.displayName;
            email.value = user.email;
            if(doc.data().bio) {
                bio.value = doc.data().bio;
            }
            if(doc.data().location) {
                location.value = doc.data().location;
            }
            if(doc.data().created) {
                created.innerText = doc.data().created.toDate().toLocaleDateString();
            }
            if(auth.currentUser.photoURL) {
                photoURL.value = user.photoURL;
            }
            load.classList.toggle('is-hidden');
        });
        btnUpdateProfile.addEventListener('click', () => {
            btnUpdateProfile.classList.toggle('is-loading');
            updateProfile(user, {
                displayName: name.value,
                photoURL: photoURL.value
            }).then(() => {
                retrieveUserDoc(db, user).then((adoc) => {
                    const data = adoc.data();
                    data.bio = bio.value;
                    data.location = location.value;
                    setDoc(doc(db, "user_data", user.uid), data).then(() => {
                        btnUpdateProfile.classList.toggle('is-loading');
                        btnUpdateProfile.innerText = "Saved!";
                        setTimeout(() => {
                            btnUpdateProfile.innerText = "Save Changes";
                        }, 2000);
                    });
                });
            }).catch((error) => {
                console.log(error);
            });
        });
    } else {
        location.href = "/login";
        return false;
    }
});
async function retrieveUserDoc(db, user) {
    return await getDoc(doc(db, "user_data", user.uid));
}