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

var FormsyDateInput = function (_Component) {
  _inherits(FormsyDateInput, _Component);

  function FormsyDateInput(props) {
    _classCallCheck(this, FormsyDateInput);

    var _this = _possibleConstructorReturn(this, (FormsyDateInput.__proto__ || Object.getPrototypeOf(FormsyDateInput)).call(this, props));

    _this.state = { focused: false };

    _this.changeValue = _this.changeValue.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    return _this;
  }

  _createClass(FormsyDateInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.initialValue) {
        this.props.setValue(this.props.initialValue);
      } else {
        this.props.setValue(this.props.getValue());
      }
    }
  }, {
    key: 'changeValue',
    value: function changeValue(value) {
      this.props.setValue(value);
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
        this.props.onBlur(this.props.getValue());
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var output = void 0;

      var configuration = {
        disabled: false,
        className: 'pt-label ',
        classNameInput: null,
        type: 'text',
        validationError: null,
        format: this.props.format || 'YYYY-MM-DD',
        isPristine: this.props.isPristine(),
        errorMessage: this.props.getErrorMessage(),
        minDate: this.props.minDate || null,
        maxDate: this.props.maxDate || null
      };

      if (this.props.placeholder) {
        configuration.placeholder = this.props.placeholder;
      }
      if (this.props.type) {
        configuration.type = this.props.type;
      }
      if (this.props.inline) {
        configuration.className += 'pt-inline ';
      }

      if (this.props.fill) {
        configuration.className += 'pt-fill ';
        configuration.classNameInput += 'pt-fill ';
      }

      if (this.props.disabled) {
        configuration.className += 'pt-disabled ';
        configuration.disabled = true;
      }

      if (!this.state.focused && this.props.showRequired()) {
        configuration.classNameInput = 'pt-intent-warning ';
        if (this.props.inline) {
          configuration.validationError = _react2.default.createElement(
            'span',
            { style: { color: '#D9822B' } },
            '*'
          );
        } else {
          configuration.validationError = _react2.default.createElement(
            'span',
            { style: { color: '#D9822B' } },
            '*Required'
          );
        }
      }

      if (!this.state.focused && this.props.showError()) {
        configuration.classNameInput = 'pt-intent-danger ';
        if (this.props.inline) {
          configuration.validationError = _react2.default.createElement(
            'span',
            { style: { color: '#DB3737' } },
            '!'
          );
        } else {
          configuration.validationError = _react2.default.createElement(
            'span',
            { style: { color: '#DB3737' } },
            this.getErrorMessage()
          );
        }
      }

      if (this.props.label) {
        output = _react2.default.createElement(
          'label',
          { className: configuration.className },
          this.props.label,
          configuration.validationError,
          _react2.default.createElement(_datetime.DateInput, {
            format: configuration.format,
            className: configuration.classNameInput,
            disabled: configuration.disabled,
            name: this.props.name,
            maxDate: configuration.maxDate,
            minDate: configuration.minDate,
            value: this.props.getValue(),
            onChange: this.changeValue,
            onKeyDown: this.onKeyDown,
            onFocus: this.onFocus,
            onBlur: this.onBlur })
        );
      } else {
        output = _react2.default.createElement(_datetime.DateInput, {
          format: configuration.format,
          className: configuration.classNameInput,
          disabled: configuration.disabled,
          name: this.props.name,
          maxDate: configuration.maxDate,
          minDate: configuration.minDate,
          value: this.props.getValue(),
          onChange: this.changeValue,
          onKeyDown: this.onKeyDown,
          onFocus: this.onFocus,
          onBlur: this.onBlur });
      }

      return _react2.default.createElement(
        'div',
        null,
        output
      );
    }
  }]);

  return FormsyDateInput;
}(_react.Component);

FormsyDateInput.propTypes = {
  label: _propTypes2.default.string,
  name: _propTypes2.default.string,
  inline: _propTypes2.default.bool,
  format: _propTypes2.default.string,
  initialValue: _propTypes2.default.instanceOf(Date),
  maxDate: _propTypes2.default.PropTypes.instanceOf(Date),
  minDate: _propTypes2.default.PropTypes.instanceOf(Date),
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  fill: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool
};

exports.default = (0, _formsyReact.withFormsy)(FormsyDateInput);