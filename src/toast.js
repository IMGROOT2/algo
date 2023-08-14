import { createApp } from 'vue'
import Toast from './components/Toast.vue'

let toastCount = 0

export default function createToast(message, icon, id = `toast-${++toastCount}`) {
  // create a new instance of the Toast component with the message and icon props
  const toast = createApp(Toast, {
    message,
    icon
  })

  // mount the component to an element
  const toastDiv = document.getElementById('div-toast')
  const component = toast.mount(document.createElement('div'))

  // set the ID of the component's root element
  component.$el.id = id

  // append the component's root element to the toast div
  toastDiv.appendChild(component.$el)

  // return the ID of the toast
  const toastId = id

  return toastId
}
