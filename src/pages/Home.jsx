import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Header } from '../components/Header'
import { BookListItem } from '../components/BookListItem'
import { Pagination } from '../components/Pagination'
import { url } from '../const'
import './Home.scss'

export const Home = () => {
  const [books, setBooks] = useState([])
  const [offset, setOffset] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const handlePageChange = (value) => setOffset(value)

  useEffect(() => {
    axios
      .get(`${url}/public/books?offset=${offset}`)
      .then((res) => setBooks(res.data))
  })

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
        <h2>書籍一覧</h2>
        {books.map((book) => (
          <BookListItem book={book} />
        ))}
        <Pagination handlePageChange={handlePageChange} />
      </main>
    </div>
  )
}
