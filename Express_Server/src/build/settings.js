"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionString = exports.accessToken = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var accessToken = process.env.ACCESS_TOKEN;
exports.accessToken = accessToken;
var connectionString = process.env.CONNECTION_STRING;
exports.connectionString = connectionString;