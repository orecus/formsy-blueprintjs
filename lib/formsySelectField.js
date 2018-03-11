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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormsySelect = function (_Component) {
  _inherits(FormsySelect, _Component);

  function FormsySelect(props) {
    _classCallCheck(this, FormsySelect);

    var _this = _possibleConstructorReturn(this, (FormsySelect.__proto__ || Object.getPrototypeOf(FormsySelect)).call(this, props));

    _this.state = { focused: false };

    _this.changeValue = _this.changeValue.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    return _this;
  }

  _createClass(FormsySelect, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.initialValue) {
        this.props.setValue(this.props.initialValue);
      } else {
        this.props.setValue(this.props.value);
      }
    }
  }, {
    key: 'changeValue',
    value: function changeValue(event) {
      this.props.setValue(event.currentTarget.value);
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
        formGroupClassNames: 'pt-form-group ',
        inputGroupClassNames: 'pt-input-group pt-select ',
        inputClassNames: '',
        labelClassNames: 'pt-label ',
        type: 'text',
        placeholder: null,
        validationError: null,
        required: null,
        leftIconName: null,
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
      if (this.props.type) {
        configuration.type = this.props.type;
      }
      if (this.props.inline) {
        configuration.formGroupClassNames += 'pt-inline ';
      }

      if (this.props.fill) {
        configuration.labelClassNames += 'pt-fill ';
        configuration.inputGroupClassNames += 'pt-fill ';
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
          ' *Required'
        );
      }

      if (!this.state.focused && this.props.showError()) {
        configuration.formGroupClassNames += 'pt-intent-danger ';
        configuration.inputGroupClassNames += 'pt-intent-danger ';
        configuration.required = _react2.default.createElement(
          'span',
          { className: 'pt-intent-danger', style: { color: '#DB3737' } },
          ' !'
        );
        configuration.validationError = _react2.default.createElement(
          'div',
          { className: 'pt-form-helper-text ' },
          ' ',
          this.props.getErrorMessage(),
          ' '
        );
      }

      if (configuration.leftIconName !== null) {
        configuration.leftIcon = _react2.default.createElement('span', { className: 'pt-icon pt-icon-' + configuration.leftIconName });
      }

      var options = this.props.children.map(function (option, i) {
        return _react2.default.createElement(
          'option',
          { key: option.value, value: option.value },
          option.title
        );
      });

      return _react2.default.createElement(
        'div',
        { style: this.props.style },
        _react2.default.createElement(
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
              _react2.default.createElement(
                'select',
                {
                  name: this.props.name,
                  className: configuration.inputClassNames,
                  disabled: configuration.disabled,
                  onChange: this.props.onChange || this.changeValue,
                  style: this.props.inputStyle,
                  defaultValue: this.props.initialValue,
                  value: this.props.getValue(),
                  onFocus: this.onFocus,
                  onBlur: this.onBlur },
                options
              )
            ),
            configuration.validationError
          )
        )
      );
    }
  }]);

  return FormsySelect;
}(_react.Component);

FormsySelect.propTypes = {
  label: _propTypes2.default.string.isRequired,
  inline: _propTypes2.default.bool,
  initialValue: _propTypes2.default.number,
  placeholder: _propTypes2.default.string,
  leftIconName: _propTypes2.default.string,
  fill: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool
};

exports.default = (0, _formsyReact.withFormsy)(FormsySelect);