import './bookListItem.scss'

export const BookListItem = (props) => {
  const { book } = props

  return (
    <>
      <article className="booklist">
        <h2 className="booklist-title__text">{book.title}</h2>
        <p className="booklist-detail__text">詳細：{book.detail}</p>
        <a className="booklist-url__text" href={book.url}>
          URL：{book.url}
        </a>
        <p className="booklist-review__text">レビュー：{book.review}</p>
        <p className="booklist-reviewer__text--red">
          レビューアー：{book.reviewer}
        </p>
      </article>
    </>
  )
}
