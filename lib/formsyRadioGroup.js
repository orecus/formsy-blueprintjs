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

var _core = require('@blueprintjs/core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormsyRadioGroup = function (_Component) {
  _inherits(FormsyRadioGroup, _Component);

  function FormsyRadioGroup(props) {
    _classCallCheck(this, FormsyRadioGroup);

    var _this = _possibleConstructorReturn(this, (FormsyRadioGroup.__proto__ || Object.getPrototypeOf(FormsyRadioGroup)).call(this, props));

    _this.state = {
      value: props.initialValue || 0,
      focused: false
    };

    _this.changeValue = _this.changeValue.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    return _this;
  }

  _createClass(FormsyRadioGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.initialValue) {
        this.props.setValue(this.state.value);
      } else {
        this.props.setValue(this.props.value);
      }
    }
  }, {
    key: 'changeValue',
    value: function changeValue(event) {
      var _this2 = this;

      var newValue = event.currentTarget.value;
      var oldValue = this.props.getValue();

      if (oldValue !== newValue) {
        this.setState({ value: newValue }, function () {
          _this2.props.setValue(newValue);
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
        formGroupClassNames: 'pt-form-group ',
        radioItem: '',
        inputGroupClassNames: 'pt-input-group ',
        inputClassNames: '',
        labelClassNames: 'pt-label pt-radio',
        placeholder: null,
        validationError: null,
        required: null,
        isPristine: this.props.isPristine(),
        errorMessage: this.props.getErrorMessage()
      };

      if (this.props.placeholder) {
        configuration.placeholder = this.props.placeholder;
      }
      if (this.props.inline) {
        configuration.formGroupClassNames += 'pt-inline ';
        configuration.radioItem += 'pt-inline ';
        configuration.radioStyle += { marginTop: '8px' };
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

      var radioButtons = this.props.children.map(function (option, i) {
        return _react2.default.createElement(_core.Radio, {
          key: option.value,
          value: option.value,
          label: option.label,
          className: configuration.radioItem,
          style: configuration.radioStyle });
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
              _react2.default.createElement(
                _core.RadioGroup,
                {
                  selectedValue: this.props.getValue(),
                  className: configuration.inputClassNames,
                  disabled: configuration.disabled,
                  onChange: this.props.onChange || this.changeValue,
                  style: this.props.inputStyle,
                  onFocus: this.onFocus,
                  onBlur: this.onBlur },
                radioButtons
              )
            ),
            configuration.validationError
          )
        )
      );
    }
  }]);

  return FormsyRadioGroup;
}(_react.Component);

FormsyRadioGroup.propTypes = {
  label: _propTypes2.default.string.isRequired,
  inline: _propTypes2.default.bool,
  initialValue: _propTypes2.default.number,
  placeholder: _propTypes2.default.string,
  leftIconName: _propTypes2.default.string,
  style: _propTypes2.default.object,
  fill: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool
};

exports.default = (0, _formsyReact.HOC)(FormsyRadioGroup);