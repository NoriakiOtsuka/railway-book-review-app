import { Link } from 'react-router-dom'

import { BookDetail } from '../pages/BookDetail'
import './bookDetailItem.scss'

export const BookDetailItem = (props) => {
  const { book } = props

  return (
    <>
      <article className="bookdetail">
        <h2 className="bookdetail-title__text">{book.title}</h2>
        <p className="bookdetail-detail__text">詳細：{book.detail}</p>
        <a className="bookdetail-url__text" href={book.url}>
          URL：{book.url}
        </a>
        <p className="bookdetail-review__text">レビュー：{book.review}</p>
        <p className="bookdetail-reviewer__text--red">
          レビューアー：{book.reviewer}
        </p>
      </article>
    </>
  )
}
