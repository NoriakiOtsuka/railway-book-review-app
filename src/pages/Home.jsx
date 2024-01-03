import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Header } from '../components/Header'
import './Home.scss'

export const Home = () => {
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div>
      <Header />
      <main className="taskList">
        <p className="error-message">{errorMessage}</p>
        <div>
          <Link to="/login">ログイン</Link>
          <br />
          <Link to="/signup">新規作成</Link>
        </div>
      </main>
    </div>
  )
}
