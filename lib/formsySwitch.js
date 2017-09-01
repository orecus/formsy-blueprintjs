'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _core = require('@blueprintjs/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormsySwitch = function (_Component) {
  _inherits(FormsySwitch, _Component);

  function FormsySwitch(props) {
    _classCallCheck(this, FormsySwitch);

    var _this = _possibleConstructorReturn(this, (FormsySwitch.__proto__ || Object.getPrototypeOf(FormsySwitch)).call(this, props));

    _this.state = { value: _this.props.defaultChecked || false };
    _this.changeValue = _this.changeValue.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    return _this;
  }

  _createClass(FormsySwitch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.defaultChecked) {
        this.props.setValue(this.state.value);
      } else {
        this.setState({ value: this.props.value || false }, function () {
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

      if (newValue === 'on' && oldValue === true) {
        this.setState({ value: false }, function () {
          _this3.props.setValue(_this3.state.value);
        });
      } else {
        this.setState({ value: true }, function () {
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
      if (this.props.inline) {
        configuration.className += 'pt-inline ';
      }
      if (!this.state.focused && this.props.showRequired()) {
        configuration.className = 'pt-intent-warning ';
      }
      if (!this.state.focused && this.props.showError()) {
        configuration.className = 'pt-intent-danger ';
      }
      if (this.props.fill) {
        configuration.className += 'pt-fill ';
      }

      return _react2.default.createElement(_core.Switch, { defaultChecked: this.props.defaultChecked, checked: this.props.getValue(), label: this.props.label, onChange: this.changeValue, disabled: configuration.disabled, className: configuration.className });
    }
  }]);

  return FormsySwitch;
}(_react.Component);

FormsySwitch.propTypes = {
  label: _react2.default.PropTypes.string.isRequired,
  inline: _react2.default.PropTypes.bool,
  defaultChecked: _react2.default.PropTypes.string,
  fill: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool
};

exports.default = (0, _formsyReact.HOC)(FormsySwitch);