<template>
  <main>
    <section class="w-full text-center flex items-center justify-center flex-col h-screen">
      <h1 class="text-3xl dark:text-white font-bold mb-5">Profile</h1>
      <div class="dark:bg-zinc-800 p-3 rounded-lg lg:w-[calc(30vw)] mx-5">
        <div class="mx-auto justify-center align-center text-center flex" id="load">
          <Loader size="16" />
        </div>

        <div id="settings" class="hidden">
          <form class="space-y-4 md:space-y-5">
            <div>
              <p class="dark:text-white text-sm block text-left ml-1 mb-1 font-bold">Name</p>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                id="name"
                required
              />
            </div>
            <div>
              <div class="text-left">
                <p class="dark:text-white text-sm text-left ml-1 mb-1 font-bold inline">Email</p>
                <span class="inline-block"
                  ><Tooltip
                    message="You can't change your email address linked to your account yet!"
                /></span>
              </div>
              <input
                class="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 pointer-events-none"
                placeholder="Email Address"
                id="email"
                required
                disabled
              />
            </div>
            <div>
              <div class="text-left">
                <p class="dark:text-white text-sm text-left ml-1 mb-1 font-bold inline">
                  Profile Picture URL
                </p>
                <span class="inline-block"
                  ><Tooltip message="File upload for profile pictures are coming soon!"
                /></span>
              </div>
              <input
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Profile Photo URL"
                id="photoURL"
              />
            </div>
            <div class="flex justify-between w-full">
              <button
                class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 block text-center dark:focus:ring-blue-800"
                id="save-changes"
              >
                Save Changes
              </button>
              <p class="dark:text-gray-500 text-md lg:text-lg">
                Account created: <span id="created"></span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { auth, db } from '../app-config'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import Loader from '../components/Loader.vue'
import createToast from '../toast'
import Tooltip from '../components/Tooltip.vue'
import { onMounted } from 'vue'

onMounted(() => {
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const photoURL = document.getElementById('photoURL')
  const created = document.getElementById('created')
  const btnUpdateProfile = document.getElementById('save-changes')
  const load = document.getElementById('load')
  const settings = document.getElementById('settings')

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // get user document and snapshot
      retrieveUserDoc(db, user).then((doc) => {
        name.value = user.displayName
        email.value = user.email
        if (doc.data().created) {
          created.innerText = doc.data().created.toDate().toLocaleDateString()
        }
        if (auth.currentUser.photoURL) {
          photoURL.value = user.photoURL
        }
        load.classList.toggle('hidden')
        settings.classList.toggle('hidden')
      })
      btnUpdateProfile.addEventListener('click', (e) => {
        e.preventDefault()
        btnUpdateProfile.innerHTML = 'Saving...'
        btnUpdateProfile.disabled = true
        updateProfile(user, {
          displayName: name.value,
          photoURL: photoURL.value
        })
          .then(() => {
            retrieveUserDoc(db, user).then((adoc) => {
              const data = adoc.data()
              setDoc(doc(db, 'user_data', user.uid), data).then(() => {
                btnUpdateProfile.classList.toggle('bg-blue-600')
                btnUpdateProfile.classList.toggle('bg-emerald-500')
                btnUpdateProfile.classList.toggle('hover:bg-blue-700')
                btnUpdateProfile.innerText = 'Saved!'
                setTimeout(() => {
                  btnUpdateProfile.innerText = 'Save Changes'
                  btnUpdateProfile.disabled = false
                  btnUpdateProfile.classList.toggle('bg-blue-600')
                  btnUpdateProfile.classList.toggle('bg-emerald-500')
                  btnUpdateProfile.classList.toggle('hover:bg-blue-700')
                }, 2000)
              })
            })
          })
          .catch((error) => {
            const errorMessage = error.message
            createToast(errorMessage, 'fa-triangle-exclamation')
            btnUpdateProfile.disabled = false
            btnUpdateProfile.innerText = 'Save Changes'
          })
      })
    } else {
      location.href = '/login'
      return false
    }
  })
})
async function retrieveUserDoc(db, user) {
  return await getDoc(doc(db, 'user_data', user.uid))
}
</script>
