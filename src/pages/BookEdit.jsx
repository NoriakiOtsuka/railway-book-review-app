import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'

import { Header } from '../components/Header'
import { url } from '../const'
import './bookEdit.scss'

export const BookEdit = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [bookUrl, setBookUrl] = useState('')
  const [detail, setDetail] = useState('')
  const [review, setReview] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies()
  const { bookId } = useParams()
  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleUrlChange = (e) => setBookUrl(e.target.value)
  const handleDetailChange = (e) => setDetail(e.target.value)
  const handleReviewChange = (e) => setReview(e.target.value)

  const onUpdateBook = (e) => {
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
      .put(`${url}/books/${bookId}`, data, config)
      .then((res) => {
        console.log(res.data)
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。${err}`)
      })
  }

  const onDeleteBook = (e) => {
    e.preventDefault()

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies.token,
      },
    }

    axios
      .delete(`${url}/books/${bookId}`, config)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        setErrorMessage(`削除に失敗しました。${err}`)
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
      .get(`${url}/books/${bookId}`, config)
      .then((res) => {
        setTitle(res.data.title)
        setBookUrl(res.data.url)
        setDetail(res.data.detail)
        setReview(res.data.review)
      })

      .catch((err) => {
        setErrorMessage(`読み込みに失敗しました。${err}`)
      })
  }, [])

  return (
    <div>
      <Header />
      <main className="edit-book">
        <p className="error-message">{errorMessage}</p>
        <h2>書籍レビュー編集</h2>
        <form className="edit-book-form" onSubmit={onUpdateBook}>
          <label>タイトル</label>
          <br />
          <input
            type="text"
            onChange={handleTitleChange}
            className="edit-book-title"
            value={title}
          />
          <br />
          <label>URL</label>
          <br />
          <input
            type="url"
            onChange={handleUrlChange}
            className="edit-book-url"
            value={bookUrl}
          />
          <br />
          <label>詳細</label>
          <br />
          <input
            type="text"
            onChange={handleDetailChange}
            className="edit-book-detail"
            value={detail}
          />
          <br />
          <label>レビュー</label>
          <br />
          <input
            type="text"
            onChange={handleReviewChange}
            className="edit-book-review"
            value={review}
          />
          <br />
          <button type="submit" className="edit-book-update-button">
            更新
          </button>
        </form>
        <button
          type="button"
          className="edit-book-delete-button"
          onClick={onDeleteBook}
        >
          削除
        </button>
      </main>
    </div>
  )
}
