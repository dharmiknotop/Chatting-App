const intiState = {
  users: [],
}
export default (state = intiState, action) => {
  switch (action.type) {
    case `GET__USERS__REQUEST`:
      break
    case `GET__USERS__SUCCESS`:
      state = {
        ...state,
        users: action.payload.users,
      }
      break

    case `GET__USERS__FAILURE`:
      state = {
        ...state,
      }
      break
  }

  return state
}
