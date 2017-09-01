import React, { Component } from 'react';
import { HOC } from 'formsy-react';
import PropTypes from 'prop-types';

import { DateInput } from '@blueprintjs/datetime';
import moment from 'moment';

class FormsyDateInput extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: props.initialValue || moment().format(),
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

  changeValue (value) {
    const newValue = value;
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
      className: 'pt-label ',
      classNameInput: null,
      type: 'text',
      validationError: null,
      isPristine: this.props.isPristine(),
      errorMessage: this.props.getErrorMessage()
    };

    if (this.props.placeholder) { configuration.placeholder = this.props.placeholder; }
    if (this.props.type) { configuration.type = this.props.type; }
    if (this.props.inline) { configuration.className += 'pt-inline '; }

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
        configuration.validationError = <span style={{color: '#D9822B', fontSize: '0.75em'}}>*</span>;
      } else {
        configuration.validationError = <span style={{color: '#D9822B', fontSize: '0.75em'}}>*Required</span>;
      }
    }

    if (!this.state.focused && this.props.showError()) {
      configuration.classNameInput = 'pt-intent-danger ';
      if (this.props.inline) {
        configuration.validationError = <span style={{color: '#DB3737', fontSize: '0.75em'}}>!</span>;
      } else {
        configuration.validationError = <span style={{color: '#DB3737', fontSize: '0.75em'}}>*{this.getErrorMessage()}</span>;
      }
    }

    if (this.props.label) {
      output = <label className={configuration.className}>
        {this.props.label}
        {configuration.validationError}
        <DateInput
                   className={configuration.classNameInput}
                   disabled={configuration.disabled}
                   name={this.props.name}
                   maxDate={moment(this.props.maxDate).toDate() || moment().add(50, 'years').toDate()}
                   minDate={moment(this.props.maxDate).toDate() || moment().toDate()}
                   defaultValue={moment().format()}
                   value={this.props.getValue()}
                   onChange={this.changeValue}
                   onKeyDown={this.onKeyDown}
                   onFocus={this.onFocus}
                   onBlur={this.onBlur} />
      </label>;
    } else {
      output = <DateInput
        className={configuration.classNameInput}
        disabled={configuration.disabled}
        name={this.props.name}
        maxDate={moment(this.props.maxDate).toDate() || moment().add(50, 'years').toDate()}
        minDate={moment(this.props.maxDate).toDate() || moment().toDate()}
        defaultValue={moment().format()}
        value={this.props.getValue()}
        onChange={this.changeValue}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur} />;
    }

    return (<div>
      {output}
    </div>);
  }
}

FormsyDateInput.propTypes = {
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  inline: React.PropTypes.bool,
  initialValue: React.PropTypes.string,
  value: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  fill: React.PropTypes.bool,
  maxDate: React.PropTypes.string,
  minDate: React.PropTypes.string,
  disabled: React.PropTypes.bool
};

export default HOC(FormsyDateInput);
