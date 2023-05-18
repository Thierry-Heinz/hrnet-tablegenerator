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
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalFilteredItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const firstItemOnPage =
    currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1;
  const lastItemOnPage =
    pageNumbers.length === currentPage
      ? totalFilteredItems
      : currentPage * itemsPerPage;

  return (
    <div className='table_footer'>
      <div
        className="dataTables_info"
        id="employee-table_info"
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
        className="dataTables_paginate paging_simple_numbers"
        id="employee-table_paginate"
      >
        <button
          className="paginate_button previous"
          aria-controls="employee-table"
          tabIndex="-1"
          id="employee-table_previous"
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
              aria-controls="employee-table"
              tabIndex="0"
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
        </span>

        <button
          className="paginate_button next"
          aria-controls="employee-table"
          onClick={nextPage}
          tabIndex="0"
          id="employee-table_next"
          disabled={lastItemOnPage === totalFilteredItems || !totalItems.length }
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default Pagination;
