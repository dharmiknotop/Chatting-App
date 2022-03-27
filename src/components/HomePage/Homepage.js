import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRealtimeConversations,
  getRealtimeUsers,
  updateMessage,
} from '../../redux/actions/userAction'

import { BsCircleFill } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { BiSend } from 'react-icons/bi'
import './homepage.css'
import { NewUser } from '../../redux/actions/Authentication'
import { useNavigate } from 'react-router-dom'
const Homepage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state) => state.auth)
  const user = useSelector((state) => state.user)
  const [chatStarted, setChatStarted] = useState(false)
  const [chatUser, setChatUser] = useState('')
  const [message, setMessage] = useState('')
  const [userUid, setUserUid] = useState(null)
  const [showUser, setshowUser] = useState(false)

  let unsubscribe
  const showUsers = () => {
    setshowUser(true)
  }
  const initChat = (user) => {
    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setUserUid(user.uid)
    dispatch(NewUser(user, auth))

    console.log(user)

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }))
    setshowUser(false)
  }
  const authChat = (user) => {
    setChatStarted(true)
    setChatUser(`${user.users.firstName} ${user.users.lastName}`)
    setUserUid(user.uid)

    console.log(user)

    dispatch(
      getRealtimeConversations({ uid_1: auth.uid, uid_2: user.users.uid }),
    )
    setshowUser(false)
  }
  const stopUser = () => {
    setshowUser(false)
  }
  useEffect(() => {
    unsubscribe = dispatch(getRealtimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    auth.authenticated ? navigate('/') : navigate('/login')
  }, [auth.authenticated])

  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe.then((f) => f()).catch((error) => console.log(error))
    }
  }, [])
  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    }

    if (message !== '') {
      dispatch(updateMessage(msgObj)).then(() => {
        setMessage('')
      })
    }

    console.log(msgObj)
  }
  return (
    <div className="position-relative">
      {showUser ? (
        <>
          <div className="ShowUsersDiv ">
            <ImCross onClick={stopUser} className="cross" color="white" />
            <div className="ShowUsers container">
              {user.users && user.users.length > 0
                ? user.users.map((user) => {
                    return (
                      <Users
                        onClick={initChat}
                        key={user.uid}
                        user={user}
                        auth={auth}
                      />
                    )
                  })
                : null}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="row">
        <div className=" userSection col-lg-3 col-md-3 col-sm-3 col-xl-3">
          {auth.users && auth.users.length > 0
            ? auth.users.map((user) => {
                return (
                  <Auth
                    onClick={authChat}
                    key={user.uid}
                    user={user.user}
                    auth={auth}
                  />
                )
              })
            : null}
          <button
            className="Add-user btn btn-outline-primary"
            onClick={showUsers}
          >
            +
          </button>
        </div>
        <div className="ChatSection col-lg-9 col-md-9 col-sm-9 ">
          <p className="UserName"> {chatStarted ? chatUser : ' '}</p>
          {auth.users.length === 1 ? (
            <>
              {' '}
              <div className="center" style={{ textAlign: 'center' }}>
                You have currently no user Add them through bottom left button
                To Add New User
              </div>
            </>
          ) : null}
          {chatStarted
            ? user.conversations.map((con) => (
                <div
                  style={{
                    textAlign: con.user_uid_1 == auth.uid ? 'right ' : 'left ',
                  }}
                >
                  <p className="messageStyle">
                    <span
                      className={` ${
                        con.user_uid_1 == auth.uid ? 'active' : 'inactive'
                      }`}
                    >
                      {con.message}
                    </span>
                  </p>
                </div>
              ))
            : null}
          <div className="InputText d-flex justify-content-center align-items-center">
            <input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
              placeholder="Enter the Message"
              type="text"
            />
            <div
              className="Send d-flex justify-content-center align-items-center"
              onClick={submitMessage}
            >
              <BiSend />
            </div>{' '}
          </div>
        </div>
      </div>
    </div>
  )
}
const Users = ({ user, onClick, auth }) => {
  return (
    <div className="">
      {auth.uid !== user.uid ? (
        <>
          <div
            className="d-flex justify-content-between User"
            onClick={() => {
              onClick(user)
            }}
          >
            <div className="d-flex flex-row">
              <FaUserCircle size={40} />
              <div className="d-flex justify-content-center align-items-center">
                {user.users && user.firstName}
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <BsCircleFill
                size={10}
                className={
                  user.isOnline === true ? 'text-success' : 'text-secondary'
                }
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
const Auth = ({ user, onClick, auth }) => {
  return (
    <div className="">
      {user.users &&
      user.users.length === undefined &&
      auth.uid !== user.users.uid ? (
        <>
          <div
            className="d-flex justify-content-between User"
            onClick={() => {
              onClick(user)
            }}
          >
            <div className="d-flex flex-row">
              <FaUserCircle size={40} />
              <div className="d-flex justify-content-center align-items-center">
                {user.users && user.users.firstName}
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <BsCircleFill
                size={10}
                className={
                  user.isOnline === true ? 'text-success' : 'text-secondary'
                }
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
export default Homepage
