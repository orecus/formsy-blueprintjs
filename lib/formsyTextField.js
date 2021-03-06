'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _core = require('@blueprintjs/core');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormsyText = function (_Component) {
  _inherits(FormsyText, _Component);

  function FormsyText(props) {
    _classCallCheck(this, FormsyText);

    var _this = _possibleConstructorReturn(this, (FormsyText.__proto__ || Object.getPrototypeOf(FormsyText)).call(this, props));

    _this.state = { focused: false };

    _this.changeValue = _this.changeValue.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    return _this;
  }

  _createClass(FormsyText, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          initialValue = _props.initialValue,
          setValue = _props.setValue;


      if (initialValue) {
        this.props.setValue(initialValue);
      }
    }
  }, {
    key: 'changeValue',
    value: function changeValue(event) {
      this.props.setValue(event.currentTarget.value);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e, data) {
      this.setState({ focused: false });
      this.props.setValue(this.props.getValue());

      if (this.props.onBlur) {
        this.props.onBlur(this.state.value);
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.setState({ focused: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var output = void 0;

      var configuration = {
        disabled: false,
        formGroupClassNames: 'pt-form-group ',
        inputGroupClassNames: 'pt-input-group ',
        inputClassNames: 'pt-input ',
        labelClassNames: 'pt-label ',
        type: 'text',
        placeholder: null,
        validationError: null,
        required: null,
        rightElement: null,
        leftIconName: null,
        iconSize: this.props.iconSize || 16,
        leftIcon: null,
        isPristine: this.props.isPristine(),
        errorMessage: this.props.getErrorMessage()
      };

      if (this.props.placeholder) {
        configuration.placeholder = this.props.placeholder;
      }
      if (this.props.leftIconName) {
        configuration.leftIconName = this.props.leftIconName;
      }
      if (this.props.rightElement) {
        configuration.rightElement = this.props.rightElement;
      }
      if (this.props.type) {
        configuration.type = this.props.type;
      }
      if (this.props.inline) {
        configuration.formGroupClassNames += 'pt-inline ';
      }

      if (this.props.fill) {
        configuration.labelClassNames += 'pt-fill ';
        configuration.inputClassNames += 'pt-fill ';
      }

      if (this.props.disabled) {
        configuration.formGroupClassNames += 'pt-disabled ';
        configuration.inputClassNames += 'pt-disabled ';
        configuration.disabled = true;
      }

      if (!this.state.focused && this.props.showRequired()) {
        configuration.formGroupClassNames += 'pt-intent-warning ';
        configuration.inputGroupClassNames += 'pt-intent-warning ';
        configuration.required = _react2.default.createElement(
          'span',
          { className: 'pt-intent-warning', style: { color: '#D9822B' } },
          '*Required'
        );
      }

      if (!this.state.focused && this.props.showError()) {
        configuration.formGroupClassNames += 'pt-intent-danger ';
        configuration.inputGroupClassNames += 'pt-intent-danger ';
        configuration.required = _react2.default.createElement(
          'span',
          { className: 'pt-intent-danger', style: { color: '#DB3737' } },
          '!'
        );
        configuration.validationError = _react2.default.createElement(
          'div',
          { className: 'pt-form-helper-text ' },
          this.props.getErrorMessage()
        );
      }

      if (configuration.leftIconName !== null) {
        configuration.leftIcon = _react2.default.createElement(_core.Icon, { icon: configuration.leftIconName, iconSize: configuration.iconSize });
      }

      if (this.props.label) {
        output = _react2.default.createElement(
          'div',
          { className: configuration.formGroupClassNames },
          _react2.default.createElement(
            'label',
            { className: configuration.labelClassNames, htmlFor: this.props.name },
            this.props.label,
            configuration.required
          ),
          _react2.default.createElement(
            'div',
            { className: 'pt-form-content' },
            _react2.default.createElement(
              'div',
              { className: configuration.inputGroupClassNames },
              configuration.leftIcon,
              _react2.default.createElement('input', {
                disabled: configuration.disabled,
                id: this.props.name,
                className: configuration.inputClassNames,
                type: configuration.type,
                placeholder: configuration.placeholder,
                name: this.props.name,
                value: this.props.getValue(),
                onChange: this.changeValue,
                onKeyDown: this.onKeyDown,
                onFocus: this.onFocus,
                onBlur: this.onBlur }),
              configuration.rightElement
            ),
            configuration.validationError
          )
        );
      } else {
        output = _react2.default.createElement(
          'div',
          { className: configuration.formGroupClassNames },
          _react2.default.createElement(
            'div',
            { className: 'pt-form-content' },
            _react2.default.createElement(
              'div',
              { className: configuration.inputGroupClassNames },
              configuration.leftIcon,
              _react2.default.createElement('input', {
                disabled: configuration.disabled,
                id: this.props.name,
                className: configuration.inputClassNames,
                type: configuration.type,
                placeholder: configuration.placeholder,
                name: this.props.name,
                value: this.props.getValue(),
                onChange: this.changeValue,
                onKeyDown: this.onKeyDown,
                onFocus: this.onFocus,
                onBlur: this.onBlur }),
              configuration.rightElement
            ),
            configuration.validationError
          )
        );
      }

      return _react2.default.createElement(
        'div',
        null,
        output
      );
    }
  }]);

  return FormsyText;
}(_react.Component);

FormsyText.propTypes = {
  label: _propTypes2.default.string,
  name: _propTypes2.default.string,
  inline: _propTypes2.default.bool,
  initialValue: _propTypes2.default.string,
  value: _propTypes2.default.string,
  type: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  leftIconName: _propTypes2.default.string,
  rightElement: _propTypes2.default.element,
  inputRef: _propTypes2.default.element,
  fill: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool
};

exports.default = (0, _formsyReact.withFormsy)(FormsyText);