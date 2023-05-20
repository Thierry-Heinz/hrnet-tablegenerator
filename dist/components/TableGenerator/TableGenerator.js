"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.array.reverse.js");
var _react = _interopRequireWildcard(require("react"));
var _Pagination = _interopRequireDefault(require("./Pagination"));
var _sort_asc = _interopRequireDefault(require("./images/sort_asc.png"));
var _sort_desc = _interopRequireDefault(require("./images/sort_desc.png"));
var _sort_both = _interopRequireDefault(require("./images/sort_both.png"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const TableGenerator = _ref => {
  let {
    data
  } = _ref;
  const [columns] = (0, _react.useState)(data.columns);
  const [initialData] = (0, _react.useState)(data.nodes);
  const [dataBuffer, setDataBuffer] = (0, _react.useState)(data.nodes);
  const [tableLength, setTableLength] = (0, _react.useState)(25);
  const [currentPage, setCurrentPage] = (0, _react.useState)(1);
  const [currentItems, setCurrentItems] = (0, _react.useState)([]);
  const [filtered, setFiltered] = (0, _react.useState)(false);
  const [sortedColumn, setSortedColumn] = (0, _react.useState)();
  const [sortDirection, setSortDirection] = (0, _react.useState)("DESC");

  /** Pagination funcs */
  (0, _react.useEffect)(() => {
    const indexOfLastItem = currentPage * tableLength;
    const indexOfFirstItem = indexOfLastItem - tableLength;
    const currentItems = dataBuffer.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(currentItems);
  }, [dataBuffer, currentPage, tableLength]);
  const paginate = pageNumber => {
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
  const handleSelectLength = e => {
    setTableLength(e.target.value);
  };

  /** Filtering table func */
  const filterTable = (objectsArray, value) => {
    return objectsArray.filter(node => {
      for (const key in node) {
        if (node[key].toLowerCase().includes(value.toLowerCase())) {
          return node;
        }
      }
      return false;
    });
  };
  const handleFilterInput = e => {
    const inputVal = e.target.value;
    const results = filterTable(initialData, inputVal);
    initialData.filter(data => data.firstName === inputVal);
    setDataBuffer(results);
    if (inputVal.length === 0) {
      setDataBuffer(initialData);
      setFiltered(false);
    } else {
      setFiltered(true);
    }
  };

  /** Sort by columns funcs */
  const handleSortColumn = key => {
    const sortedCurrentItems = currentItems.sort((a, b) =>
    // return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    a[key].localeCompare(b[key], "en", {
      numeric: "true",
      sensitivity: "base"
    }));
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
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "table_wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "table_header"
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: "table_length",
    className: "dataTables_length"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "table_selectLength"
  }, "Show", /*#__PURE__*/_react.default.createElement("select", {
    onChange: handleSelectLength,
    name: "table_length",
    id: "table_selectLength",
    value: tableLength
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: "10"
  }, "10"), /*#__PURE__*/_react.default.createElement("option", {
    value: "25"
  }, "25"), /*#__PURE__*/_react.default.createElement("option", {
    value: "50"
  }, "50"), /*#__PURE__*/_react.default.createElement("option", {
    value: "100"
  }, "100")), "entries")), /*#__PURE__*/_react.default.createElement("div", {
    className: "table_filter",
    id: "table_filter"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "employee_inputFilter"
  }, "Search:", /*#__PURE__*/_react.default.createElement("input", {
    onChange: handleFilterInput,
    type: "search",
    id: "table_filter--input",
    "aria-controls": "employee-table"
  })))), /*#__PURE__*/_react.default.createElement("table", {
    id: "table_body",
    className: "display table_body no-footer",
    "aria-describedby": "table_info"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", {
    className: "row"
  }, columns.map((column, i) => /*#__PURE__*/_react.default.createElement("th", {
    onClick: () => handleSortColumn(column.key),
    key: "".concat(column.key, "-").concat(i),
    id: column.key
  }, column.label, /*#__PURE__*/_react.default.createElement("img", {
    src: column.key === sortedColumn ? sortDirection === "DESC" ? _sort_desc.default : _sort_asc.default : _sort_both.default,
    alt: ""
  }))))), /*#__PURE__*/_react.default.createElement("tbody", null, dataBuffer.length ? currentItems.map((node, index) => /*#__PURE__*/_react.default.createElement("tr", {
    className: "row",
    key: "".concat(node, "-").concat(index),
    id: index
  }, columns.map(column => {
    return Object.keys(node).map((key, i) => {
      return column.key === key && /*#__PURE__*/_react.default.createElement("th", {
        className: "".concat(index, "-").concat(i, "-").concat(column.key),
        key: "".concat(index, "-").concat(i, "-").concat(column.key),
        id: key
      }, node[column.key]);
    });
  }))) : /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", null, "No matching records found")))), /*#__PURE__*/_react.default.createElement(_Pagination.default, {
    itemsPerPage: tableLength,
    totalFilteredItems: dataBuffer.length,
    totalItems: initialData.length,
    paginate: paginate,
    previousPage: previousPage,
    nextPage: nextPage,
    currentPage: currentPage,
    filtered: filtered
  }));
};
var _default = TableGenerator;
exports.default = _default;