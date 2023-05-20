import React from 'react';

const Pagination = ({
  itemsPerPage,
  totalItems,
  totalFilteredItems,
  paginate,
  previousPage,
  nextPage,
  currentPage,
  filtered,
}) => {

  //calculate the page numbers depending on the itemsPerPage props
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalFilteredItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // UI indication if showing the first elements or the last elements of the table
  const firstItemOnPage =
    currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1;
  const lastItemOnPage =
    pageNumbers.length === currentPage
      ? totalFilteredItems
      : currentPage * itemsPerPage;

  return (
    <div className='table_footer'>
      <div
        className="table_info"
        id="table_info"
        role="status"
        aria-live="polite"
      >
        <span>
          Showing {firstItemOnPage} to {lastItemOnPage} of {totalFilteredItems}{" "}
          entries
        </span>
        {filtered && <span>(filtered from {totalItems} total entries)</span>}
      </div>

      <div
        className="table_paginate paging_simple_numbers"
        id="table_paginate"
      >
        <button
          className="paginate_button previous"
          aria-controls="table_body"
          tabIndex="-1"
          id="table_previous"
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          {pageNumbers.map((number, i) => (
            <button
              key={number}
              className={`paginate_button ${
                i + 1 === currentPage ? "current" : ""
              }`}
              aria-controls="table_body"
              tabIndex="0"
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
        </span>

        <button
          className="paginate_button next"
          aria-controls="table_body"
          onClick={nextPage}
          tabIndex="0"
          id="table_next"
          disabled={lastItemOnPage === totalFilteredItems || totalItems.length > 0 }
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Pagination;
