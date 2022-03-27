import { MdEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineUser } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import './signUp.css'
import { signup } from '../../redux/actions/Authentication'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const { authenticated } = useSelector((state) => state.auth)

  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null
  // const [lname, Lname] = useState('')
  useEffect(() => {
    authenticated ? navigate('/') : console.log('erro')
  }, [authenticated])

  const registerUser = (e) => {
    e.preventDefault()

    const user = {
      fname,
      lname,
      email,
      password,
    }

    dispatch(signup(user))
  }

  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <form
          className="loginForm"
          encType="multipart/form-data"
          onSubmit={registerUser}
        >
          <div className="d-flex justify-content-center">Sign Up</div>

          <div className="signUpName">
            <AiOutlineUser />
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value)
              }}
            />
          </div>
          <div className="signUpName">
            <AiOutlineUser />
            <input
              type="text"
              placeholder="Surname"
              required
              name="name"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value)
              }}
            />
          </div>
          <div className="signUpEmail">
            <MdEmail />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="signUpPassword">
            <RiLockPasswordLine />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>

          <input type="submit" value="Register" className="signUpBtn" />
        </form>
      </div>
    </div>
  )
}

export default SignUp
