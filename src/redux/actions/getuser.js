import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
export const getUsers = (uid) => {
  return async (dispatch) => {
    dispatch({ type: `GET__USERS__REQUEST` })

    const db = firebase.firestore()
    const unsubscribe = db
      .collection('users')
      // .where('uid', '!=', uid)
      .onSnapshot((querySnapshot) => {
        const users = []
        const mainUsers = []
        querySnapshot.forEach(function (doc) {
          if (doc.data().uid === uid) {
            mainUsers.push(doc.data('users'))
          }
        })
        mainUsers.forEach(function (doc) {
          console.log(doc.users)
          users.push(...doc.users)
          // if (doc.data().uid === uid) {
          //   users.push(doc.data('users'))
          // }
        })
        dispatch({
          type: `GET__USERS__SUCCESS`,
          payload: { users },
        })
      })
  }
}
