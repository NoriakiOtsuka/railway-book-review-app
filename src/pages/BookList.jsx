import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { Header } from '../components/Header'
import { BookListItem } from '../components/BookListItem'
import { Pagination } from '../components/Pagination'
import { url } from '../const'

export const BookList = () => {
  const [books, setBooks] = useState([])
  const [offset, setOffset] = useState(0)
  const [cookies, setCookie, removeCookie] = useCookies()
  const handlePageChange = (value) => setOffset(value)

  useEffect(() => {
    console.log('booklist')
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + cookies.token,
      },
    }

    axios
      .get(`${url}/books?offset=${offset}`, config)
      .then((res) => setBooks(res.data))
  })

  return (
    <div>
      <Header />
      <main>
        <h2>書籍一覧</h2>
        {books.map((book) => (
          <BookListItem book={book} />
        ))}
        <Pagination handlePageChange={handlePageChange} />
      </main>
    </div>
  )
}
