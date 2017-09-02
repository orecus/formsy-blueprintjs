import React, { Component } from 'react';
import { HOC } from 'formsy-react';
import PropTypes from 'prop-types';

import { RadioGroup, Radio } from '@blueprintjs/core';

class FormsyRadioGroup extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: props.initialValue || 0,
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
    let configuration = {
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

    if (this.props.placeholder) { configuration.placeholder = this.props.placeholder; }
    if (this.props.inline) {
      configuration.formGroupClassNames += 'pt-inline ';
      configuration.radioItem += 'pt-inline ';
      configuration.radioStyle += {marginTop: '8px'};
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

    const radioButtons = this.props.children.map((option, i) => (
      <Radio
        key={option.value}
        value={option.value}
        label={option.label}
        className={configuration.radioItem}
        style={configuration.radioStyle} />
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
              <RadioGroup
                selectedValue={this.props.getValue()}
                className={configuration.inputClassNames}
                disabled={configuration.disabled}
                onChange={this.props.onChange || this.changeValue}
                style={this.props.inputStyle}
                onFocus={this.onFocus}
                onBlur={this.onBlur}>
                {radioButtons}
              </RadioGroup>
            </div>
            {configuration.validationError}
          </div>
        </div>
      </div>
    );
  }
}

FormsyRadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  initialValue: PropTypes.number,
  placeholder: PropTypes.string,
  leftIconName: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.bool,
  disabled: PropTypes.bool
};

export default HOC(FormsyRadioGroup);
