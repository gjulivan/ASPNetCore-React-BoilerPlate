webpackHotUpdate(0,{

/***/ 953:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = __webpack_require__(25);

var _UserMainPanel = __webpack_require__(954);

var _UserMainPanel2 = _interopRequireDefault(_UserMainPanel);

var _reactRedux = __webpack_require__(74);

var _MainStyle = __webpack_require__(99);

var _MainStyle2 = _interopRequireDefault(_MainStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_Component) {
    _inherits(User, _Component);

    function User() {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
    }

    _createClass(User, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: _MainStyle2.default.user },
                _react2.default.createElement(
                    _semanticUiReact.Grid,
                    { stackable: true, stretched: true, textAlign: 'center', columns: 3 },
                    _react2.default.createElement(UserTopPanel, null),
                    _react2.default.createElement(_semanticUiReact.Grid.Row, null),
                    _react2.default.createElement(_semanticUiReact.Grid.Row, null)
                )
            );
        }
    }]);

    return User;
}(_react.Component);

function mapStateToProps(state) {
    return {
        user: state.user,
        wallets: state.wallets
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(User);

/***/ })

})
//# sourceMappingURL=hot-update.js.map