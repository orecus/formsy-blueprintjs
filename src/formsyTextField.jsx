import React, { Component } from 'react';
import { HOC } from 'formsy-react';

import PropTypes from 'prop-types';

class FormsyText extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: props.initialValue || '',
      focused: false
    };

    this.changeValue = this.changeValue.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount () {
    if (this.props.initialValue) {
      this.props.setValue(this.state.value);
    } else {
      this.props.setValue(this.props.value);
    }
  }

  changeValue (event) {
    const newValue = event.currentTarget.value;
    const oldValue = this.props.getValue();

    if (oldValue !== newValue) {
      this.setState({ value: newValue }, () => {
        this.props.setValue(newValue);
      });
    }
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
    let output;

    let configuration = {
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
      leftIcon: null,
      isPristine: this.props.isPristine(),
      errorMessage: this.props.getErrorMessage()
    };

    if (this.props.placeholder) { configuration.placeholder = this.props.placeholder; }
    if (this.props.leftIconName) { configuration.leftIconName = this.props.leftIconName; }
    if (this.props.rightElement) { configuration.rightElement = this.props.rightElement; }
    if (this.props.type) { configuration.type = this.props.type; }
    if (this.props.inline) { configuration.formGroupClassNames += 'pt-inline '; }

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
      configuration.required = <span className='pt-intent-warning' style={{color: '#D9822B'}}> *Required</span>;
    }

    if (!this.state.focused && this.props.showError()) {
      configuration.formGroupClassNames += 'pt-intent-danger ';
      configuration.inputGroupClassNames += 'pt-intent-danger ';
      configuration.required = <span className='pt-intent-danger' style={{color: '#DB3737'}}> !</span>;
      configuration.validationError = <div className='pt-form-helper-text '> {this.props.getErrorMessage()} </div>;
    }

    if (configuration.leftIconName !== null) {
      configuration.leftIcon = <span className={'pt-icon pt-icon-' + configuration.leftIconName} />;
    }

    if (this.props.label) {
      output = <div className={configuration.formGroupClassNames}>
        <label className={configuration.labelClassNames} htmlFor={this.props.name}>
          {this.props.label}
          {configuration.required}
        </label>
        <div className='pt-form-content'>
          <div className={configuration.inputGroupClassNames}>
            {configuration.leftIcon}
            <input
              disabled={configuration.disabled}
              id={this.props.name}
              className={configuration.inputClassNames}
              type={configuration.type}
              placeholder={configuration.placeholder}
              name={this.props.name}
              value={this.props.getValue()}
              onChange={this.changeValue}
              onKeyDown={this.onKeyDown}
              onFocus={this.onFocus}
              onBlur={this.onBlur} />
            {configuration.rightElement}
          </div>
          {configuration.validationError}
        </div>
      </div>;
    } else {
      output = <div className={configuration.formGroupClassNames}>
        <div className='pt-form-content'>
          <div className={configuration.inputGroupClassNames}>
            {configuration.leftIcon}
            <input
              disabled={configuration.disabled}
              id={this.props.name}
              className={configuration.inputClassNames}
              type={configuration.type}
              placeholder={configuration.placeholder}
              name={this.props.name}
              value={this.props.getValue()}
              onChange={this.changeValue}
              onKeyDown={this.onKeyDown}
              onFocus={this.onFocus}
              onBlur={this.onBlur} />
            {configuration.rightElement}
          </div>
          {configuration.validationError}
        </div>
      </div>;
    }

    return (<div>
      {output}
    </div>);
  }
}

FormsyText.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  inline: PropTypes.bool,
  initialValue: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  leftIconName: PropTypes.string,
  rightElement: PropTypes.element,
  inputRef: PropTypes.element,
  fill: PropTypes.bool,
  disabled: PropTypes.bool
};

export default HOC(FormsyText);
