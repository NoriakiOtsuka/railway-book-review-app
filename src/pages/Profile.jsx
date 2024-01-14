import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { Header } from '../components/Header'
import { url } from '../const'
import './profile.scss'

export const Profile = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [icon, setIcon] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies()
  const [errorMessage, setErrorMessage] = useState('')
  const handleNameChange = (e) => setName(e.target.value)
  const onUpdateUser = (e) => {
    e.preventDefault()

    const data = {
      name: name,
    }

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies.token,
      },
    }

    axios
      .put(`${url}/users`, data, config)
      .then((res) => {
        console.log(res.data)
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。${err}`)
      })
  }

  useEffect(() => {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies.token,
      },
    }

    axios
      .get(`${url}/users`, config)
      .then((res) => {
        const user = res.data
        setName(user.name)
        setIcon(user.iconUrl)
      })
      .catch((err) => {
        setErrorMessage(`ユーザー情報の取得に失敗しました。 ${err}`)
      })
  }, [])

  return (
    <div>
      <Header />
      <main className="profile">
        <h2>ユーザー情報</h2>
        <img src={icon} className="user-icon__image" />
        <p className="error-message">{errorMessage}</p>
        <form className="edit-user-form" onSubmit={onUpdateUser}>
          <label>ユーザー名</label>
          <br />
          <input
            type="text"
            onChange={handleNameChange}
            className="edit-user-name"
            value={name}
          />
          <br />
          <button type="submit" className="edit-user-button">
            更新
          </button>
        </form>
      </main>
    </div>
  )
}
