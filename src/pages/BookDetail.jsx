import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'

import { Header } from '../components/Header'
import { BookDetailItem } from '../components/BookDetailItem'
import { Loading } from '../components/Loarding'
import { url } from '../const'
import './bookDetail.scss'

export const BookDetail = () => {
  const [book, setBook] = useState([])
  const [isLording, setIsLording] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [cookies, setCookie, removeCookie] = useCookies()
  const { bookId } = useParams()

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
        {isLording ? (
          <Loading type={'spinningBubbles'} color={'black'} />
        ) : (
          <>
            <p className="error-message">{errorMessage}</p>
            <BookDetailItem book={book} />
          </>
        )}
      </main>
    </div>
  )
}
