import { useNavigate, Link } from 'react-router-dom'

import './bookListItem.scss'

export const BookListItem = (props) => {
  const TAG = 'BookListItem'
  const { book } = props
  const navigate = useNavigate()

  const handleClick = () => {
    console.log(`${TAG}: Book ID is ${book.id}`)
    navigate(`/detail/${book.id}`)
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
