import './App.css'
import Navbar from './components/navbar/Navbar'
import Login from './components/Login/Login'
import SignUp from './components/signUp/SignUp'
import Homepage from './components/HomePage/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isLoggedInUser } from './redux/actions/Authentication'
import { useEffect } from 'react'
function App() {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser())
    }
  }, [])
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
