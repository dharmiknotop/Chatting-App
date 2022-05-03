import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { logout } from '../../redux/actions/Authentication'

const UserChatNavbar = ({ showUsers }) => {
  const dispatch = useDispatch()

  const { authenticated, firstName, lastName, uid } = useSelector(
    (state) => state.auth,
  )
  const [showdropdown, setshowDropDown] = useState(false)
  const logoutUser = () => {
    dispatch(logout(uid))
  }
  return (
    <div className="d-flex justify-content-between chatNavbar align-items-center">
      <span>{` ${firstName && firstName} ${lastName && lastName}`}</span>
      <span className="dropdownSpan">
        <BsThreeDotsVertical
          onClick={() => {
            showdropdown === false
              ? setshowDropDown(true)
              : setshowDropDown(false)
          }}
        />
        <ul
          className={
            showdropdown === true ? `dropdownActive dropdown` : 'dropdown'
          }
        >
          <li
            onClick={() => {
              showUsers()
            }}
          >
            Add a user
          </li>
          <li onClick={logoutUser}>log out</li>
        </ul>
      </span>
    </div>
  )
}

export default UserChatNavbar
