import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './reducers/userReducer'
import LoginSignUp from './reducers/LoginSignup'
import tryReducer from './reducers/tryReducer.js'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
const reducer = combineReducers({
  auth: LoginSignUp,
  user: userReducer,
  trying: tryReducer,
})

const middleware = [thunk]
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
)
export default store
