import React from 'react'
import { useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/Authentication'
import './navbar.css'
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authenticated, firstName, lastName, uid } = useSelector(
    (state) => state.auth,
  )
  const logouts = () => {
    dispatch(logout(uid))
  }
  useEffect(() => {
    authenticated ? navigate('/') : navigate('/login')
  }, [])
  return (
    <div className="Navbar">
      <div className="p-3">
        {' '}
        {firstName && firstName} {lastName && lastName}
      </div>{' '}
      {authenticated && authenticated ? (
        <>
          <div className="log-out" onClick={logouts}>
            Log out
          </div>
        </>
      ) : (
        <>
          <div className="d-flex">
            <div>
              {' '}
              <Link to="/login">Log in</Link>
            </div>
            <div>
              {' '}
              <Link to="/register">Sign up</Link>
            </div>{' '}
          </div>
        </>
      )}
    </div>
  )
}

export default Navbar
