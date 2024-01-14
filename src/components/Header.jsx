import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { signOut } from '../store/authSlice'
import { url } from '../const'
import './header.scss'

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies()

  const handleSignIn = () => {
    navigate('/login')
  }

  const handleSignOut = () => {
    dispatch(signOut())
    removeCookie('token')
    navigate('/')
  }

  useEffect(() => {
    if (auth === true) {
      const config = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + cookies.token,
        },
      }

      axios.get(`${url}/users`, config).then((res) => setName(res.data.name))
    }
  })

  return (
    <header className="header">
      <h1>書籍レビュー</h1>
      {auth ? (
        <>
          <h2 className="user-name__text">{name}</h2>
          <button onClick={handleSignOut} className="sign-out-button">
            サインアウト
          </button>
        </>
      ) : (
        <button onClick={handleSignIn} className="sign-in-button">
          ログイン
        </button>
      )}
    </header>
  )
}
