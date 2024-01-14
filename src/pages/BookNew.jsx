import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { Header } from '../components/Header'
import { url } from '../const'
import './bookNew.scss'

export const BookNew = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [bookUrl, setBookUrl] = useState('')
  const [detail, setDetail] = useState('')
  const [review, setReview] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [cookies, setCookie, removeCookie] = useCookies()
  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleUrlChange = (e) => setBookUrl(e.target.value)
  const handleDetailChange = (e) => setDetail(e.target.value)
  const handleReviewChange = (e) => setReview(e.target.value)

  const onBookNew = (e) => {
    e.preventDefault()

    const data = {
      title: title,
      url: bookUrl,
      detail: detail,
      review: review,
    }

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies.token,
      },
    }

    axios
      .post(`${url}/books`, data, config)
      .then((res) => {
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`書籍レビュー投稿に失敗しました。${err}`)
      })
  }

  return (
    <div>
      <Header />
      <main className="book-new">
        <h2>新規投稿</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="book-new-form" onSubmit={onBookNew}>
          <label>タイトル</label>
          <br />
          <input
            type="text"
            className="tilte-input"
            onChange={handleTitleChange}
          />
          <br />
          <label>URL</label>
          <br />
          <input type="url" className="url-input" onChange={handleUrlChange} />
          <br />
          <label>詳細</label>
          <br />
          <input
            type="text"
            className="detail-input"
            onChange={handleDetailChange}
          />
          <br />
          <label>レビュー</label>
          <br />
          <input
            type="text"
            className="review-input"
            onChange={handleReviewChange}
          />
          <br />
          <button type="submit" className="submit-button">
            新規投稿
          </button>
        </form>
      </main>
    </div>
  )
}
