"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _companySlice = _interopRequireDefault(require("./companySlice"));

var _employeeSlice = _interopRequireDefault(require("./employeeSlice"));

var _idSlice = _interopRequireDefault(require("./idSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _toolkit.configureStore)({
  reducer: {
    company: _companySlice["default"],
    employee: _employeeSlice["default"],
    activeId: _idSlice["default"]
  }
});

exports["default"] = _default;