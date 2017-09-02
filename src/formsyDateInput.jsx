import React, { Component } from 'react';
import { HOC } from 'formsy-react';
import PropTypes from 'prop-types';

import { DateInput } from '@blueprintjs/datetime';
import moment from 'moment';

class FormsyDateInput extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: moment().format(),
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
      format: this.props.format || 'YYYY-MM-DD',
      isPristine: this.props.isPristine(),
      errorMessage: this.props.getErrorMessage(),
      minDate: moment().format('YYYY-MM-DD'),
      maxDate: moment().add(100, 'years').format('YYYY-MM-DD')
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
        configuration.validationError = <span style={{color: '#D9822B'}}> *</span>;
      } else {
        configuration.validationError = <span style={{color: '#D9822B'}}> *Required</span>;
      }
    }

    if (!this.state.focused && this.props.showError()) {
      configuration.classNameInput = 'pt-intent-danger ';
      if (this.props.inline) {
        configuration.validationError = <span style={{color: '#DB3737'}}> !</span>;
      } else {
        configuration.validationError = <span style={{color: '#DB3737'}}> {this.getErrorMessage()}</span>;
      }
    }

    if (this.props.maxDate) { configuration.maxDate = moment(this.props.maxDate).format(configuration.format); }
    if (this.props.minDate) { configuration.minDate = moment(this.props.minDate).format(configuration.format); }

    if (this.props.label) {
      output = <label className={configuration.className}>
        {this.props.label}
        {configuration.validationError}
        <DateInput
          format={configuration.format}
          className={configuration.classNameInput}
          disabled={configuration.disabled}
          name={this.props.name}
          maxDate={configuration.maxDate}
          minDate={configuration.minDate}
          defaultValue={moment().format()}
          value={this.props.getValue()}
          onChange={this.changeValue}
          onKeyDown={this.onKeyDown}
          onFocus={this.onFocus}
          onBlur={this.onBlur} />
      </label>;
    } else {
      output = <DateInput
        format={configuration.format}
        className={configuration.classNameInput}
        disabled={configuration.disabled}
        name={this.props.name}
        maxDate={configuration.maxDate}
        minDate={configuration.minDate}
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
  label: PropTypes.string,
  name: PropTypes.string,
  inline: PropTypes.bool,
  format: PropTypes.string,
  initialValue: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  fill: PropTypes.bool,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  disabled: PropTypes.bool
};

export default HOC(FormsyDateInput);
