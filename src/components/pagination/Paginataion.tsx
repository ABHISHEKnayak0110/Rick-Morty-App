import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from "./Pagination.module.scss"

function Paginataion(props :any) {
  return (
      <div className={styles.paginationDiv}>
     <ReactPaginate
    nextLabel={">"}
    onPageChange={props.handleClickPageNo}
    pageRangeDisplayed={3}
    marginPagesDisplayed={2}
    pageCount={props?.totalPage || 0}
    forcePage={props?.pageNo ||0  - 1}
    previousLabel="<"
    pageClassName={styles["page-item"]}
    pageLinkClassName={styles["page-link"]}
    previousClassName={styles["prev"]}
    previousLinkClassName={styles["page-link"]}
    nextClassName={styles["next"]}
    nextLinkClassName={styles["page-link"]}
    breakLabel="..."
    breakClassName={styles["page-item"]}
    breakLinkClassName={styles["page-link"]}
    containerClassName={"pagination"}
    activeClassName={styles["active"]}
    renderOnZeroPageCount={null}
  />
      </div>
  
  )
}

export default Paginataion