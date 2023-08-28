<template>
  <section class="w-full text-center flex items-center justify-center flex-col h-screen">
    <div class="has-text-centered -mt-20 w-full">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img class="h-12" :src="AlgoFull" alt="Algo" />
        </a>
        <div
          id="login"
          class="w-[calc(100vw-2rem)] p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-zinc-800 dark:border-gray-700 sm:p-8"
        >
          <h2
            class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white"
          >
            Log in
          </h2>
          <button
            id="button-auth-button-login"
            class="rounded-lg bg-white border-gray-400 border shadow-md block w-full p-3 mt-5"
          >
            <div class="flex">
              <div class="flex ml-3">
                <img :src="Google" alt="Google Logo" style="w-16 h-16" />
              </div>
              <div class="text-center mx-auto mt-0">
                <p class="signup-with-google-text">Sign in with Google</p>
              </div>
            </div>
          </button>
          <div class="relative flex py-4 items-center">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="flex-shrink mx-4 text-gray-400">OR</span>
            <div class="flex-grow border-t border-gray-400"></div>
          </div>
          <form class="space-y-4 md:space-y-5">
            <div>
              <input
                autocomplete="username"
                type="email"
                name="email"
                id="email-login"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email Address"
                required=""
              />
            </div>
            <div>
              <input
                autocomplete="current-password"
                type="password"
                name="password"
                id="password-login"
                placeholder="Password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              id="button-login"
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log in
            </button>
          </form>
          <p class="dark:text-white text-gray-900 mt-3">
            Forgot your
            <a href="#" class="btn-forgot-password text-blue-500 hover:underline">password?</a>
          </p>
          <p class="dark:text-white text-gray-900">
            Don't have an account?
            <a href="#" id="switchtosignup" class="text-blue-500 hover:underline">Sign up</a>
          </p>
        </div>

        <div
          id="signup"
          class="hidden w-[calc(100vw-2rem)] p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-zinc-800 dark:border-gray-700 sm:p-8"
        >
          <h2
            class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white"
          >
            Sign Up
          </h2>
          <button
            id="button-auth-button-signup"
            class="rounded-lg bg-white border-gray-400 border shadow-md block w-full p-3 mt-5"
          >
            <div class="flex">
              <div class="flex ml-3">
                <img :src="Google" alt="Google Logo" style="w-16 h-16" />
              </div>
              <div class="text-center mx-auto mt-0">
                <p class="signup-with-google-text">Sign up with Google</p>
              </div>
            </div>
          </button>
          <div class="relative flex py-4 items-center">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="flex-shrink mx-4 text-gray-400">OR</span>
            <div class="flex-grow border-t border-gray-400"></div>
          </div>
          <form class="space-y-4 md:space-y-5">
            <div>
              <input
                type="text"
                name="email"
                id="name-signup"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                required=""
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email-signup"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email Address"
                required=""
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password-signup"
                placeholder="Password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              id="button-signup"
              type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign up
            </button>
          </form>
          <p class="dark:text-white text-gray-900 mt-3">
            Forgot your
            <a href="#" class="btn-forgot-password text-blue-500 hover:underline">password?</a>
          </p>
          <p class="dark:text-white text-gray-900">
            Already have an account?
            <a href="#" id="switchtologin" class="text-blue-500 hover:underline">Sign in</a>
          </p>
        </div>

        <div
          id="forgot-password"
          class="hidden w-[calc(100vw-2rem)] p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-zinc-800 dark:border-gray-700 sm:p-8"
        >
          <h2
            class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white"
          >
            Reset Password
          </h2>
          <form class="space-y-4 md:space-y-5 mt-5">
            <div>
              <input
                autocomplete="username"
                type="email"
                name="email"
                id="email-f-email"
                placeholder="Email Address"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <button
              id="button-f-sendEmail"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send Reset Email
            </button>
          </form>
          <p class="text-white mt-3">
            <a id="switchtologinfromfp" href="#" class="text-blue-500 hover:underline"
              >Back to Log in</a
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted } from 'vue'
import AlgoFull from '../assets/images/algologofull.png'
import Google from '../assets/images/googleg.svg'
import createToast from '../toast'
import { auth, db } from '../app-config'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'

const google = new GoogleAuthProvider()

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user && user.metadata.creationTime !== user.metadata.lastSignInTime) {
      location.href = '/solve'
    }
  })
  const forgotPasswordButtons = document.getElementsByClassName('btn-forgot-password')
  for (let i = 0; i < forgotPasswordButtons.length; i++) {
    forgotPasswordButtons[i].addEventListener('click', () => {
      document.getElementById('forgot-password').classList.toggle('hidden')
      document.getElementById('login').classList.add('hidden')
      document.getElementById('signup').classList.add('hidden')
    })
  }
  document.getElementById('switchtosignup').addEventListener('click', () => {
    document.getElementById('login').classList.toggle('hidden')
    document.getElementById('signup').classList.toggle('hidden')
  })
  document.getElementById('switchtologin').addEventListener('click', () => {
    document.getElementById('login').classList.toggle('hidden')
    document.getElementById('signup').classList.toggle('hidden')
  })
  document.getElementById('switchtologinfromfp').addEventListener('click', () => {
    document.getElementById('forgot-password').classList.toggle('hidden')
    document.getElementById('login').classList.toggle('hidden')
  })

  // add event listener to login button
  document.getElementById('button-login').addEventListener('click', function (event) {
    event.preventDefault()
    login()
  })

  // add event listener to signup button
  document.getElementById('button-signup').addEventListener('click', function (event) {
    event.preventDefault()
    signup()
  })
  // add event listener to forgot password button
  document.getElementById('button-f-sendEmail').addEventListener('click', function (event) {
    event.preventDefault()
    forgotPassword(event)
  })

  document.getElementById('button-auth-button-login').addEventListener('click', googleAuth)
  document.getElementById('button-auth-button-signup').addEventListener('click', googleAuth)

  // login function
  async function login() {
    const email = document.getElementById('email-login').value
    const password = document.getElementById('password-login').value
    // log the user in
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        // const user = userCredential.user;
        location.href = '/solve'
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message
        createToast(errorMessage, 'fa-triangle-exclamation')
      })
  }

  // signup function
  async function signup() {
    const email = document.getElementById('email-signup').value
    const password = document.getElementById('password-signup').value
    const name = document.getElementById('name-signup').value
    // create the user
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user
        // set user display name
        await setupFirestoreForNewUser(auth, db, user).then(async () => {
          updateProfile(user, {
            displayName: name
          }).then(() => {
            console.log('Updated user display name')
            location.href = '/solve'
          })
        })
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message
        createToast(errorMessage, 'fa-triangle-exclamation')
        // ..
      })
  }

  // forgot password function
  async function forgotPassword(event) {
    event.preventDefault()
    const email = document.getElementById('email-f-email').value
    // send password reset email
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        createToast(
          'Password reset email sent! Check your inbox as well as Spam or Junk folders. Press the Reset Password button to resend the email.',
          'fa-circle-check'
        )
      })
      .catch((error) => {
        const errorMessage = error.message
        createToast(errorMessage, 'fa-triangle-exclamation')
      })
  }

  function googleAuth() {
    signInWithPopup(auth, google)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const { isNewUser } = getAdditionalUserInfo(result)
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user
        if (isNewUser) {
          await setupFirestoreForNewUser(auth, db, user).then(() => {
            location.href = '/solve'
          })
        } else {
          location.href = '/solve'
        }
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message
        createToast(errorMessage, 'fa-triangle-exclamation')
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      })
  }

  async function setupFirestoreForNewUser(auth, db, user) {
    await setDoc(doc(db, 'user_data', user.uid), {
      created: serverTimestamp(),
      problemsSeen: [],
      problemsSolved: [],
      problemsSkipped: [],
      problemsUnsolved: []
    })
  }

  // async function retrieveUserDoc(db, user) {
  //     return await getDoc(doc(db, "user_data", user.uid));
  // }
})
</script>
