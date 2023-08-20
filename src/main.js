import { auth, db } from './app-config'
import { deleteField, doc, getDoc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import '@/assets/css/style.css'
import '@/assets/css/core.css'

if (location.host === 'algo-usaco.web.app') location.host = 'algousaco.com'

const app = createApp(App)
app.use(router)
app.mount('#app')

onAuthStateChanged(auth, async (user) => {
  if (user) {
    if (!localStorage.getItem('hasCheckedDatabase')) {
      await retrieveUserDoc(db, user).then((adoc) => {
        console.log(adoc.data())
        const fsdata = adoc.data()
        if (!Object.prototype.hasOwnProperty.call(fsdata, 'problemsSeen')) {
          updateDoc(doc(db, 'user_data', user.uid), {
            problemsSeen: [],
            problemsSolved: [],
            problemsSkipped: [],
            problemsUnsolved: []
          })
        }
        if (Object.prototype.hasOwnProperty.call(fsdata, 'problems-seen')) {
          updateDoc(doc(db, 'user_data', user.uid), {
            'problems-seen': deleteField(),
            'problems-solved': deleteField(),
            'problems-skipped': deleteField(),
            'problems-unsolved': deleteField()
          })
        }
      })
      localStorage.setItem('hasCheckedDatabase', 'true')
    }
  }
})

async function retrieveUserDoc(db, user) {
  return await getDoc(doc(db, 'user_data', user.uid))
}
