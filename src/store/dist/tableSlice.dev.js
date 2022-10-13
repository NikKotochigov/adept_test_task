"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.selectAllEmployee = exports.changeEmployee = exports.removeEmployee = exports.addEmployee = exports.selectAllCompany = exports.changeCompany = exports.removeCompany = exports.addCompany = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _company = _interopRequireDefault(require("../data/company"));

var _employee = _interopRequireDefault(require("../data/employee"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  companyData: _company["default"],
  employeeData: _employee["default"]
};
var tableSlice = (0, _toolkit.createSlice)({
  name: "company",
  initialState: initialState,
  reducers: {
    addCompany: function addCompany(state, action) {
      state.companyData.unshift({
        id: action.payload.id,
        selected: false,
        company_name: "",
        count: 0,
        address: ""
      });
    },
    addEmployee: function addEmployee(state, action) {},
    removeCompany: function removeCompany(state, _) {
      return _objectSpread({}, state, {
        companyData: state.companyData.filter(function (item) {
          return !item.selected;
        })
      });
    },
    removeEmployee: function removeEmployee(state, action) {},
    changeCompany: function changeCompany(state, action) {
      var _action$payload = action.payload,
          id = _action$payload.id,
          value = _action$payload.value,
          column = _action$payload.column;
      return _objectSpread({}, state, {
        companyData: state.companyData.map(function (item) {
          if (item.id === +id) {
            return _objectSpread({}, item, _defineProperty({}, column, value));
          }

          return item;
        })
      });
    },
    changeEmployee: function changeEmployee(state, action) {},
    selectAllCompany: function selectAllCompany(state, action) {
      return _objectSpread({}, state, {
        companyData: state.companyData.map(function (item) {
          return _objectSpread({}, item, {
            selected: action.payload.checked
          });
        })
      });
    },
    selectAllEmployee: function selectAllEmployee(state, sction) {}
  }
});
var _tableSlice$actions = tableSlice.actions,
    addCompany = _tableSlice$actions.addCompany,
    removeCompany = _tableSlice$actions.removeCompany,
    changeCompany = _tableSlice$actions.changeCompany,
    selectAllCompany = _tableSlice$actions.selectAllCompany,
    addEmployee = _tableSlice$actions.addEmployee,
    removeEmployee = _tableSlice$actions.removeEmployee,
    changeEmployee = _tableSlice$actions.changeEmployee,
    selectAllEmployee = _tableSlice$actions.selectAllEmployee;
exports.selectAllEmployee = selectAllEmployee;
exports.changeEmployee = changeEmployee;
exports.removeEmployee = removeEmployee;
exports.addEmployee = addEmployee;
exports.selectAllCompany = selectAllCompany;
exports.changeCompany = changeCompany;
exports.removeCompany = removeCompany;
exports.addCompany = addCompany;
var _default = tableSlice.reducer;
exports["default"] = _default;