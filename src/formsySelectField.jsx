import React, { Component } from 'react';
import { HOC } from 'formsy-react';
import PropTypes from 'prop-types';

class FormsySelect extends Component {
  constructor (props) {
    super(props);

    this.state = {
      focused: false
    };

    this.changeValue = this.changeValue.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount () {
    if (this.props.initialValue) {
      this.props.setValue(this.props.initialValue);
    } else {
      this.props.setValue(this.props.value);
    }
  }

  changeValue (event) {
    this.props.setValue(event.currentTarget.value);
  }

  onFocus () {
    this.setState({ focused: true });
  }

  onBlur (e) {
    this.setState({ focused: false });
    this.props.setValue(this.props.getValue());

    if (this.props.onBlur) {
      this.props.onBlur(this.state.value);
    }
  }

  render () {
    let configuration = {
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

    if (this.props.placeholder) { configuration.placeholder = this.props.placeholder; }
    if (this.props.leftIconName) { configuration.leftIconName = this.props.leftIconName; }
    if (this.props.type) { configuration.type = this.props.type; }
    if (this.props.inline) { configuration.formGroupClassNames += 'pt-inline '; }

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
      configuration.required = <span className='pt-intent-warning' style={{color: '#D9822B'}}>(Required)</span>;
    }

    if (!this.state.focused && this.props.showError()) {
      configuration.formGroupClassNames += 'pt-intent-danger ';
      configuration.inputGroupClassNames += 'pt-intent-danger ';
      configuration.required = <span className='pt-intent-danger' style={{color: '#DB3737'}}>(Validation Error)</span>;
      configuration.validationError = <div className='pt-form-helper-text '>
        {this.props.getErrorMessage()}
      </div>;
    }

    if (configuration.leftIconName !== null) {
      configuration.leftIcon = <span className={'pt-icon pt-icon-' + configuration.leftIconName} />;
    }

    const options = this.props.children.map((option, i) => (
      <option key={option.value} value={option.value}>
        {option.title}
      </option>
    ));

    return (
      <div style={this.props.style}>
        <div className={configuration.formGroupClassNames}>
          <label className={configuration.labelClassNames} htmlFor={this.props.name}>
            {this.props.label}
            {configuration.required}
          </label>
          <div className='pt-form-content'>
            <div className={configuration.inputGroupClassNames}>
              {configuration.leftIcon}
              <select
                name={this.props.name}
                className={configuration.inputClassNames}
                disabled={configuration.disabled}
                onChange={this.props.onChange || this.changeValue}
                style={this.props.inputStyle}
                defaultValue={this.props.initialValue}
                value={this.props.getValue()}
                onFocus={this.onFocus}
                onBlur={this.onBlur}>
                {options}
              </select>
            </div>
            {configuration.validationError}
          </div>
        </div>
      </div>);
  }
}

FormsySelect.propTypes = {
  label: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  initialValue: PropTypes.number,
  placeholder: PropTypes.string,
  leftIconName: PropTypes.string,
  fill: PropTypes.bool,
  disabled: PropTypes.bool
};

export default HOC(FormsySelect);
