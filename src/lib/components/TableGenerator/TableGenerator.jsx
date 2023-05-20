import React from 'react';
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import sortAsc from "./images/sort_asc.png";
import sortDesc from "./images/sort_desc.png";
import sortBoth from "./images/sort_both.png";

const TableGenerator = ({ data }) => {
  const [columns] = useState(data.columns);

  const [initialData] = useState(data.nodes);
  const [dataBuffer, setDataBuffer] = useState(data.nodes);

  const [tableLength, setTableLength] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  const [filtered, setFiltered] = useState(false);
  const [sortedColumn, setSortedColumn] = useState();
  const [sortDirection, setSortDirection] = useState("DESC");


  /** Pagination funcs */
  useEffect(() => {
    const indexOfLastItem = currentPage * tableLength;
    const indexOfFirstItem = indexOfLastItem - tableLength;
    const currentItems = dataBuffer.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(currentItems);
  }, [dataBuffer, currentPage, tableLength]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== Math.ceil(initialData.length / tableLength)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSelectLength = (e) => {
    setTableLength(e.target.value);
  };

  /** Filtering table func */
  const filterTable = (objectsArray, value) => {
    return objectsArray.filter((node) => {
      for (const key in node) {
        if (node[key].toLowerCase().includes(value.toLowerCase())) {
          return node;
        }
      }
      return false;
    });
  };

  const handleFilterInput = (e) => {
    const inputVal = e.target.value;
    const results = filterTable(initialData, inputVal);
    initialData.filter((data) => data.firstName === inputVal);
    setDataBuffer(results);

    if (inputVal.length === 0) {
      setDataBuffer(initialData);
      setFiltered(false);
    } else {
      setFiltered(true);
    }
  };

  /** Sort by columns funcs */
  const handleSortColumn = (key) => {
    const sortedCurrentItems = currentItems.sort((a, b) =>
      // return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      a[key].localeCompare(b[key], "en", {
        numeric: "true",
        sensitivity: "base",
      })
    );
    if (sortedColumn === key) {
      if (sortDirection === "DESC") {
        setSortDirection("ASC");
        sortedCurrentItems.reverse();
      } else {
        setSortDirection("DESC");
      }
    } else {
      setSortDirection("DESC");
    }
    setCurrentItems(sortedCurrentItems);
    setSortedColumn(key);
  };

  // Output the table
  return (
    <div id="table_wrapper">
    <div className="table_header">
      <div id="table_length" className="dataTables_length">
        <label htmlFor="table_selectLength">
          Show
          <select
            onChange={handleSelectLength}
            name="table_length"
            id="table_selectLength"
            value={tableLength}
            >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          entries
        </label>
      </div>

      <div className="table_filter" id="table_filter">
        <label htmlFor="employee_inputFilter">
          Search:
          <input
            onChange={handleFilterInput}
            type="search"
            id="table_filter--input"
            aria-controls="employee-table"
            />
        </label>
      </div>
    </div>


      <table
        id="table_body"
        className="display table_body no-footer"
        aria-describedby="table_info"
      >
        <thead>
          <tr className="row">
            {columns.map((column, i) => (
              <th
                onClick={() => handleSortColumn(column.key)}
                key={`${column.key}-${i}`}
                id={column.key}
              >
                {column.label}

                <img
                  src={
                    column.key === sortedColumn
                      ? sortDirection === "DESC"
                        ? sortDesc
                        : sortAsc
                      : sortBoth
                  }
                  alt=""
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataBuffer.length ? (
            currentItems.map((node, index) => (
              <tr className="row" key={index} id={index}>
                {Object.keys(node).map((key, i) => (
                  <th key={`${index}-${i}`} id={key}>
                    {node[key]}
                  </th>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td>No matching records found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={tableLength}
        totalFilteredItems={dataBuffer.length}
        totalItems={initialData.length}
        paginate={paginate}
        previousPage={previousPage}
        nextPage={nextPage}
        currentPage={currentPage}
        filtered={filtered}
      />
    </div>
  );
};
export default TableGenerator;
