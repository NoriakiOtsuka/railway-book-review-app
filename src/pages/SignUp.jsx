import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'

import { Header } from '../components/Header'
import { url } from '../const'
import './signUp.scss'

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleNameChange = (e) => setName(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const onSignUp = () => {
    const data = {
      email: email,
      name: name,
      password: password,
    }

    axios
      .post(`${url}/users`, data)
      .then((res) => {
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`サインアップに失敗しました。 ${err}`)
      })
  }

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
          <button type="submit" className="signup-button" onClick={onSignUp}>
            作成
          </button>
        </form>
        <Link to="/login">ログイン</Link>
      </main>
    </div>
  )
}
