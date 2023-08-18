<template>
    <main>
        <section class="w-full text-center flex items-center justify-center flex-col h-screen">
        <div class="dark:bg-zinc-800 p-3 rounded-lg lg:w-[calc(40vw)]">
            <h1 class="text-3xl dark:text-white font-bold mb-5">Profile</h1>
            <!-- <div class="mx-auto justify-center align-center text-center" id="load">
                <Loader size="8" />
            </div> -->

            <!-- class="hidden" -->
            <div id="settings mt-5"> 
                <form class="space-y-4 md:space-y-5">
                    <div>
                    <input
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Display Name"
                        required
                    />
                    </div>
                    <div>
                    <input
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Email Address"
                        required
                    />  
                    </div>
                    <div>
                    <input
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Profile Picture"
                    />
                    </div>
                    <button
                    class=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                    Save Changes
                    </button>
                </form>
            </div>
        </div>
        </section>
        <!-- <div class="profile-settings">
            <div class="container">
                <div class="column is-9">
                    <div class="profile-settings-content">
                        <div class="profile-settings-content-header">
                            <h1 class="title is-1 has-text-white mb-4 mt-4">Profile</h1>
                            <h1 class="title is-1 has-text-white mt-4 loader is-loading is-medium" id="load"></h1>
                        </div>
                        <div class="hidden" id="settings">
                            <div class="profile-settings-content-body">
                                <div class="profile-settings-content-body-item">
                                    <div class="profile-settings-content-body-item-header">
                                        <h1 class="title is-5 has-text-white">Name</h1>
                                    </div>
                                    <div class="profile-settings-content-body-item-body">
                                        <div class="field">
                                            <div class="control"><input class="input" id="name" type="text" placeholder="Name" required="required" /></div>
                                        </div>
                                    </div>
                                    <div class="profile-settings-content-body-item">
                                        <div class="profile-settings-content-body-item-header">
                                            <h1 class="title is-5 has-text-white">Email<a class="tooltip has-tooltip-right" data-tooltip="You can't change your email address linked to your account yet!"><span class="icon is-small ml-1" style="font-size: 0.7rem;"><i class="fas fa-question-circle"></i></span></a></h1>
                                        </div>
                                        <div class="profile-settings-content-body-item-body">
                                            <div class="field">
                                                <div class="control"><input class="input" id="email" type="email" placeholder="Email" required="required" disabled="disabled" /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="profile-settings-content-body-item">
                                    <div class="profile-settings-content-body-item-header">
                                        <h1 class="title is-5 has-text-white">Profile Picture<a class="tooltip has-tooltip-right" data-tooltip="File upload for profile pictures are coming soon!"><span class="icon is-small ml-1" style="font-size: 0.7rem;"><i class="fas fa-question-circle"></i></span></a></h1>
                                    </div>
                                    <div class="profile-settings-content-body-item-body">
                                        <div class="field">
                                            <div class="control"><input class="input" id="photoURL" type="url" placeholder="Photo URL" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h1 class="subtitle has-text-white is-5" style="margin-top: 1rem; margin-bottom: 0">Account Created: <span id="created"></span></h1><button class="button is-primary has-text-white mt-3" id="save-changes">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </main>
</template>
<script setup>
    import {auth, db} from '../app-config'
    import {doc, getDoc, setDoc} from "firebase/firestore";
    import {onAuthStateChanged, updateProfile} from "firebase/auth";
    import Loader from '../components/Loader.vue'


    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const photoURL = document.getElementById('photoURL');
    const created = document.getElementById('created');
    const btnUpdateProfile = document.getElementById('save-changes');
    const load = document.getElementById('load');
    const settings = document.getElementById('settings');

    onAuthStateChanged(auth, user => {
        if (user) {
            // get user document and snapshot
            retrieveUserDoc(db, user).then((doc) => {
                name.value = user.displayName;
                email.value = user.email;
                if (doc.data().created) {
                    created.innerText = doc.data().created.toDate().toLocaleDateString();
                }
                if (auth.currentUser.photoURL) {
                    photoURL.value = user.photoURL;
                }
                load.classList.toggle('hidden');
                settings.classList.toggle('hidden');

            });
            btnUpdateProfile.addEventListener('click', () => {
                btnUpdateProfile.classList.toggle('is-loading');
                updateProfile(user, {
                    displayName: name.value,
                    photoURL: photoURL.value
                }).then(() => {
                    retrieveUserDoc(db, user).then((adoc) => {
                        const data = adoc.data();
                        setDoc(doc(db, "user_data", user.uid), data).then(() => {
                            btnUpdateProfile.classList.toggle('is-loading');
                            btnUpdateProfile.classList.remove('is-primary');
                            btnUpdateProfile.style.background = "#00d1b2";
                            btnUpdateProfile.innerText = "Saved!";
                            setTimeout(() => {
                                btnUpdateProfile.innerText = "Save Changes";
                                btnUpdateProfile.style.background = "";
                                btnUpdateProfile.classList.add('is-primary');
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
</script>