import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { authConstanst } from '../constants/constants'
export const signup = (user) => {
  return async (dispatch) => {
    const db = firebase.firestore()

    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` })

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data)
        const currentUser = firebase.auth().currentUser
        const name = `${user.fname} ${user.lname}`
        console.log('0')
        currentUser
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            //if you are here means it is updated successfully
            console.log('this in then 0')
            db.collection('users')
              .doc(data.user.uid)
              .set({
                firstName: user.fname,
                lastName: user.lname,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                //succeful
                console.log('this in then')
                const loggedInUser = {
                  firstName: user.fname,
                  lastName: user.lname,
                  uid: data.user.uid,
                  email: user.email,
                }
                console.log('this in then 1')

                localStorage.setItem('user', JSON.stringify(loggedInUser))
                console.log('User logged in successfully...!')
                dispatch({
                  type: `${authConstanst.USER_LOGIN}_SUCCESS`,
                  payload: { user: loggedInUser },
                })
              })
              .catch((error) => {
                console.log(error)
                dispatch({
                  type: `${authConstanst.USER_LOGIN}_FAILURE`,
                  payload: { error },
                })
              })
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
export const signin = (user) => {
  return async (dispatch) => {
    console.log('hi')
    dispatch({ type: `${authConstanst.USER_LOGIN}_REQUEST` })
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        console.log(data)

        const db = firebase.firestore()
        db.collection('users')
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName.split(' ')
            const firstName = name[0]
            const lastName = name[1]

            const loggedInUser = {
              firstName,
              lastName,
              uid: data.user.uid,
              email: data.user.email,
            }

            localStorage.setItem('user', JSON.stringify(loggedInUser))

            dispatch({
              type: `${authConstanst.USER_LOGIN}_SUCCESS`,
              payload: { user: loggedInUser },
            })
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
        dispatch({
          type: `${authConstanst.USER_LOGIN}_FAILURE`,
          payload: { error },
        })
      })
  }
}
export const isLoggedInUser = () => {
  return async (dispatch) => {
    const user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null

    if (user) {
      dispatch({
        type: `${authConstanst.USER_LOGIN}_SUCCESS`,
        payload: { user },
      })
    } else {
      dispatch({
        type: `${authConstanst.USER_LOGIN}_FAILURE`,
        payload: { error: 'Login again please' },
      })
    }
  }
}
export const logout = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` })
    //Now lets logout user

    const db = firebase.firestore()
    db.collection('users')
      .doc(uid)
      .update({
        isOnline: false,
      })
      .then(() => {
        firebase
          .auth()
          .signOut()
          .then(() => {
            //successfully
            localStorage.clear()
            dispatch({ type: `${authConstanst.USER_LOGOUT}_SUCCESS` })
          })
          .catch((error) => {
            console.log(error)
            dispatch({
              type: `${authConstanst.USER_LOGOUT}_FAILURE`,
              payload: { error },
            })
          })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
