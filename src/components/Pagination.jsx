import React from 'react'
import ReactPaginate from 'react-paginate'

import './pagination.scss'

export const Pagination = (props) => {
  const handlePaginate = (data) => {
    props.handlePageChange(data.selected * 10)
  }

  return (
    <>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={1}
        onPageChange={handlePaginate}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page-item"
        activeLinkClassName="active"
        disabledClassName="disabled-button"
        previousLinkClassName="previous-link"
        nextLinkClassName="next-link"
        pageLinkClassName="page-link"
      />
    </>
  )
}
