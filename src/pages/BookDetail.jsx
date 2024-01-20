import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate, useParams } from 'react-router-dom'

import { Header } from '../components/Header'
import { BookDetailItem } from '../components/BookDetailItem'
import { Loading } from '../components/Loarding'
import { url } from '../const'
import './bookDetail.scss'

export const BookDetail = () => {
  const TAG = 'BookDetail'
  const navigate = useNavigate()
  const [book, setBook] = useState([])
  const [isMine, setIsMine] = useState(false)
  const [isLording, setIsLording] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [cookies, setCookie, removeCookie] = useCookies()
  const { bookId } = useParams()

  const handleClick = () => {
    navigate(`/edit/${book.id}`)
  }

  useEffect(() => {
    setIsLording(true)
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies.token,
      },
    }

    axios
      .get(`${url}/books/${bookId}`, config)
      .then((res) => {
        setBook(res.data)
        setIsMine(res.data.isMine)
        setIsLording(false)
      })

      .catch((err) => {
        setErrorMessage(`読み込みに失敗しました。${err}`)
        setIsLording(false)
      })
  }, [])

  return (
    <div>
      <Header />
      <main>
        <h2>書籍レビュー詳細</h2>
        <div>{bookId}</div>
        {isLording ? (
          <Loading type={'spinningBubbles'} color={'black'} />
        ) : (
          <>
            <p className="error-message">{errorMessage}</p>
            <BookDetailItem book={book} />
            {isMine ? (
              <button className="edit-book-button" onClick={handleClick}>
                編集画面
              </button>
            ) : null}
          </>
        )}
      </main>
    </div>
  )
}
