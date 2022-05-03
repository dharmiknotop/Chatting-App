import { useEffect, useState } from 'react'
import './login.css'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineUser } from 'react-icons/ai'
import { signin } from '../../redux/actions/Authentication'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { authenticated } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userLogin = (e) => {
    e.preventDefault()
    if (email == '') {
      alert('Email is required')
      return
    }
    if (password == '') {
      alert('Password is required')
      return
    }

    dispatch(signin({ email, password }))
  }
  useEffect(() => {
    authenticated ? navigate('/') : navigate('/login')
  }, [authenticated])

  return (
    <h1>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <form className="loginForm" onSubmit={userLogin}>
            <div className="d-flex justify-content-center">Log in</div>

            <div className="Email">
              <MdEmail />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="Password">
              <RiLockPasswordLine />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
        </div>
      </div>
    </h1>
  )
}

export default Login
