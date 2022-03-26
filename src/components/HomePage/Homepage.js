import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRealtimeConversations,
  getRealtimeUsers,
  updateMessage,
} from '../../redux/actions/userAction'

import { BsCircleFill } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { BiSend } from 'react-icons/bi'
import './homepage.css'
const Homepage = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  const user = useSelector((state) => state.user)
  const [chatStarted, setChatStarted] = useState(false)
  const [chatUser, setChatUser] = useState('')
  const [message, setMessage] = useState('')
  const [userUid, setUserUid] = useState(null)
  let unsubscribe
  const initChat = (user) => {
    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setUserUid(user.uid)

    console.log(user)

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }))
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

    // console.log(msgObj)
  }
  return (
    <div>
      <div className="row">
        <div className=" userSection col-lg-3">
          {user.users.length > 0
            ? user.users.map((user) => {
                return <Users onClick={initChat} key={user.uid} user={user} />
              })
            : null}
        </div>
        <div className="ChatSection col-lg-9 ">
          {chatStarted ? chatUser : ' '}
          {chatStarted
            ? user.conversations.map((con) => (
                <div
                  style={{
                    textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left',
                  }}
                >
                  <p className="messageStyle">{con.message}</p>
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
const Users = ({ user, onClick }) => {
  return (
    <div
      className="d-flex justify-content-between User"
      onClick={() => {
        onClick(user)
      }}
    >
      <div className="d-flex flex-row">
        <FaUserCircle size={40} />
        <div className="d-flex justify-content-center align-items-center">
          {user.firstName}
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <BsCircleFill
          size={10}
          className={user.isOnline === true ? 'text-success' : 'text-secondary'}
        />
      </div>
    </div>
  )
}
export default Homepage
