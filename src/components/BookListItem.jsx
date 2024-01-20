import axios from 'axios'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { url } from '../const'
import './bookListItem.scss'

export const BookListItem = (props) => {
  const TAG = 'BookListItem'
  const { book } = props
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies()
  const [errorMessage, setErrorMessage] = useState()

  const handleClick = () => {
    const data = {
      selectBookId: book.id,
    }

    const config = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies.token,
      },
    }

    axios
      .post(`${url}/logs`, data, config)
      .then(() => {
        navigate(`/detail/${book.id}`)
      })
      .catch((err) => {
        setErrorMessage(`ログの送信に失敗しました。${err}`)
      })
  }

  return (
    <>
      <article className="booklist">
        <h2 className="booklist-title__text">{book.title}</h2>
        <p className="booklist-review__text">レビュー：{book.review}</p>
        <p className="booklist-reviewer__text--red">
          レビューアー：{book.reviewer}
        </p>
        <button className="bookdetail-button" onClick={handleClick}>
          詳細画面
        </button>
      </article>
    </>
  )
}
