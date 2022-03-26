import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { Provider } from 'react-redux'
import store from './redux/store'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyBJlBpqNZTb8X90CP0gq8CLE244XLmncAI',
  authDomain: 'chatting-app-835b0.firebaseapp.com',
  projectId: 'chatting-app-835b0',
  storageBucket: 'chatting-app-835b0.appspot.com',
  messagingSenderId: '854047905717',
  appId: '1:854047905717:web:165d6c2d10f9ad83652bfc',
  measurementId: 'G-WDBJ4V3N9H',
}
const firebaseApp = firebase.initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
window.store = store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
