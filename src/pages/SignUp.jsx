import axios from 'axios'
import React, { useState } from 'react'
import imageCompression from 'browser-image-compression'
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate, Link } from 'react-router-dom'

import { signIn } from '../store/authSlice'
import { Header } from '../components/Header'
import { ImageUpload } from '../components/ImageUpload'
import { url } from '../const'
import './signUp.scss'

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const TAG = 'SignUp'
  const auth = useSelector((state) => state.auth.isSignIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [icon, setIcon] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies()
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleNameChange = (e) => setName(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleIconChange = (file) => setIcon(file)

  const onSignUp = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    }

    axios
      .post(`${url}/users`, data)
      .then((res) => {
        const token = res.data.token
        dispatch(signIn())
        setCookie('token', token)

        if (icon) {
          handleCompressFile()
        }
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`サインアップに失敗しました。 ${err}`)
      })
  }

  const handleCompressFile = async () => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      console.log(`${TAG}: originalFile size ${icon.size / 1024 / 1024} MB`)
      const compressedFile = await imageCompression(icon, options)
      console.log(
        `${TAG}: compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      )
      await postIcon(compressedFile)
    } catch (error) {
      console.log(`${TAG}: ${error}`)
    }
  }

  const postIcon = async (compressedFile) => {
    const form = new FormData()
    form.append('icon', compressedFile)
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + cookies.token,
      },
    }

    axios
      .post(`${url}/uploads`, form, config)
      .then((res) => {
        console.log(`${TAG}: icon url is ${res.data.iconUrl}`)
      })
      .catch((err) => {
        setErrorMessage(`アイコンアップロードに失敗しました。 ${err}`)
      })
  }

  if (auth) return <Navigate to="/" />

  const onSubmit = (data) => console.log(data)

  return (
    <div>
      <Header />
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <label>メールアドレス</label>
          <br />
          <input
            {...register('email', {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
            })}
            type="email"
            className="email-input"
            onChange={handleEmailChange}
          />
          {errors.email?.message && (
            <p className="input-validation">{errors.email.message}</p>
          )}
          <br />
          <label>ユーザ名</label>
          <br />
          <input
            {...register('name', {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
            })}
            type="text"
            className="name-input"
            onChange={handleNameChange}
          />
          {errors.name?.message && (
            <p className="input-validation">{errors.name.message}</p>
          )}
          <br />
          <label>パスワード</label>
          <br />
          <input
            {...register('password', {
              required: {
                value: true,
                message: '入力が必須の項目です。',
              },
              minLength: {
                value: 8,
                message: '8文字以上入力してください。',
              },
            })}
            type="password"
            className="password-input"
            onChange={handlePasswordChange}
          />
          {errors.password?.type === 'required' && (
            <p className="input-validation">{errors.password.message}</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="input-validation">{errors.password.message}</p>
          )}
          <br />
          <ImageUpload handleIconChange={handleIconChange} />
          <br />
          <button type="submit" className="signup-button" onClick={onSignUp}>
            作成
          </button>
        </form>
        <Link to="/login">ログイン</Link>
      </main>
    </div>
  )
}
