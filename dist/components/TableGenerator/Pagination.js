"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Pagination = _ref => {
  let {
    itemsPerPage,
    totalItems,
    totalFilteredItems,
    paginate,
    previousPage,
    nextPage,
    currentPage,
    filtered
  } = _ref;
  //calculate the page numbers depending on the itemsPerPage props
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalFilteredItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // UI indication if showing the first elements or the last elements of the table
  const firstItemOnPage = currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1;
  const lastItemOnPage = pageNumbers.length === currentPage ? totalFilteredItems : currentPage * itemsPerPage;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "table_footer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "table_info",
    id: "table_info",
    role: "status",
    "aria-live": "polite"
  }, /*#__PURE__*/_react.default.createElement("span", null, "Showing ", firstItemOnPage, " to ", lastItemOnPage, " of ", totalFilteredItems, " ", "entries"), filtered && /*#__PURE__*/_react.default.createElement("span", null, "(filtered from ", totalItems, " total entries)")), /*#__PURE__*/_react.default.createElement("div", {
    className: "table_paginate paging_simple_numbers",
    id: "table_paginate"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "paginate_button previous",
    "aria-controls": "table_body",
    tabIndex: "-1",
    id: "table_previous",
    onClick: previousPage,
    disabled: currentPage === 1
  }, "Previous"), /*#__PURE__*/_react.default.createElement("span", null, pageNumbers.map((number, i) => /*#__PURE__*/_react.default.createElement("button", {
    key: number,
    className: "paginate_button ".concat(i + 1 === currentPage ? "current" : ""),
    "aria-controls": "table_body",
    tabIndex: "0",
    onClick: () => paginate(number)
  }, number))), /*#__PURE__*/_react.default.createElement("button", {
    className: "paginate_button next",
    "aria-controls": "table_body",
    onClick: nextPage,
    tabIndex: "0",
    id: "table_next",
    disabled: lastItemOnPage === totalFilteredItems || totalItems.length > 0
  }, "Next")));
};
var _default = Pagination;
exports.default = _default;