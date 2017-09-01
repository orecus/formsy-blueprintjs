'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _datetime = require('@blueprintjs/datetime');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormsyDateTimePicker = function (_Component) {
  _inherits(FormsyDateTimePicker, _Component);

  function FormsyDateTimePicker(props) {
    _classCallCheck(this, FormsyDateTimePicker);

    var _this = _possibleConstructorReturn(this, (FormsyDateTimePicker.__proto__ || Object.getPrototypeOf(FormsyDateTimePicker)).call(this, props));

    _this.state = { value: _this.props.defaultValue || Date.now };
    _this.changeValue = _this.changeValue.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    return _this;
  }

  _createClass(FormsyDateTimePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.defaultValue) {
        this.props.setValue(this.state.value);
      } else {
        this.setState({ value: this.props.value || Date.now }, function () {
          _this2.props.setValue(_this2.state.value);
        });
      }
    }
  }, {
    key: 'changeValue',
    value: function changeValue(event) {
      var _this3 = this;

      var newValue = event.currentTarget.value;
      var oldValue = this.props.getValue();

      if (newValue !== oldValue) {
        this.setState({ value: newValue }, function () {
          _this3.props.setValue(_this3.state.value);
        });
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({ focused: true });
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      this.setState({ focused: false });
      this.props.setValue(this.props.getValue());

      if (this.props.onBlur) {
        this.props.onBlur(this.state.value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var configuration = {
        disabled: false,
        className: '',
        validationError: null,
        isPristine: this.props.isPristine(),
        errorMessage: this.props.getErrorMessage()
      };

      if (this.props.disabled) {
        configuration.className += 'pt-disabled ';
        configuration.disabled = true;
      }
      if (!this.state.focused && this.props.showRequired()) {
        configuration.className = 'pt-intent-warning ';
      }
      if (!this.state.focused && this.props.showError()) {
        configuration.className = 'pt-intent-danger ';
      }

      return _react2.default.createElement(_datetime.DateTimePicker, {
        defaultValue: this.props.defaultValue,
        value: this.props.getValue(),
        onChange: this.changeValue,
        disabled: configuration.disabled,
        className: configuration.className });
    }
  }]);

  return FormsyDateTimePicker;
}(_react.Component);

FormsyDateTimePicker.propTypes = {
  label: _react2.default.PropTypes.string.isRequired,
  defaultValue: _react2.default.PropTypes.string,
  disabled: _react2.default.PropTypes.bool
};

exports.default = (0, _formsyReact.HOC)(FormsyDateTimePicker);