import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRealtimeConversations,
  getRealtimeUsers,
  updateMessage,
} from '../../redux/actions/userAction'
import UserChatNavbar from './userChatNavbar'
import { getUsers } from '../../redux/actions/getuser'
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
  const trying = useSelector((state) => state.trying)
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

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }))
    setshowUser(false)
  }
  const authChat = (user, trying) => {
    console.log(user)
    console.log(user.uid)
    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setUserUid(user.uid)

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }))
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
    dispatch(getUsers(auth.uid))
  }, [dispatch])
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
  // console.log(trying)

  return (
    <div className="position-relative">
      {showUser ? (
        <>
          <div className="ShowUsersDiv ">
            <div className="ShowUsers container">
              <div className="showUsersContainer">
                <div className="showUserNavbar">
                  Add the user You Want to Chat with
                  <ImCross onClick={stopUser} className="cross" color="black" />
                </div>
                {user.users && user.users.length > 0
                  ? user.users.map((user) => {
                      return (
                        <AllUsers
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
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="mainContainer">
        <div className=" userSection ">
          <UserChatNavbar showUsers={showUsers} />

          {trying.users &&
            trying.users.map((user) => {
              return (
                <ChattingUser
                  onClick={authChat}
                  key={auth.uid}
                  user={user}
                  auth={auth}
                  trying={trying}
                />
              )
            })}
        </div>
        <div className="ChatSection  ">
          <div className="bgOverlay"></div>
          <p className="UserName"> {chatStarted ? chatUser : ' '}</p>
          {auth.users.length === 0 ? (
            <>
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
                    <div className="ChatUserName">
                      {con.user_uid_1 !== auth.uid
                        ? chatStarted
                          ? chatUser
                          : ''
                        : ''}
                    </div>
                    <div className="OurUserName">
                      {con.user_uid_1 === auth.uid ? auth.firstName : <></>}
                    </div>

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
              placeholder="Type a Message"
              type="text"
            />
            <div
              className="Send d-flex justify-content-center align-items-center"
              onClick={submitMessage}
            >
              <BiSend color="gray" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const AllUsers = ({ user, onClick, auth }) => {
  return (
    <div className="">
      {auth.uid !== user.uid ? (
        <>
          <div
            className="d-flex justify-content-between User addUser"
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
const ChattingUser = ({ user, onClick, auth, trying }) => {
  return (
    <div className="">
      {/* {user && auth.uid !== user.users.uid ? ( */}
      <>
        <div
          className=" User"
          onClick={() => {
            onClick(user)
          }}
        >
          <div className={'chatGrid'}>
            <div className=" userImgSection ">
              <FaUserCircle className="userImg" />
            </div>
            <div className=" userNameSection d-flex align-items-center justify-content-between">
              <div className="">{user && user.firstName}</div>
              <div className="d-flex justify-content-center align-items-center onlineIcon">
                <BsCircleFill
                  size={10}
                  className={
                    user.isOnline === true ? 'text-success' : 'text-secondary'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </>
      {/* ) : ( */}
      {/* <h1>{user.users && user.users.firstName} </h1> */}
      {/* )} */}
    </div>
  )
}
export default Homepage
