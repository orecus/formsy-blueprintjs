import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';

import { DateTimePicker } from '@blueprintjs/datetime';

class FormsyDateTimePicker extends Component {
  constructor (props) {
    super(props);

    this.state = { value: this.props.defaultValue || Date.now };
    this.changeValue = this.changeValue.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount () {
    if (this.props.defaultValue) {
      this.props.setValue(this.state.value);
    } else {
      this.setState({ value: this.props.value || Date.now }, () => {
        this.props.setValue(this.state.value);
      });
    }
  }

  changeValue (event) {
    const newValue = event.currentTarget.value;
    const oldValue = this.props.getValue();

    if (newValue !== oldValue) {
      this.setState({ value: newValue }, () => {
        this.props.setValue(this.state.value);
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
      className: '',
      validationError: null,
      isPristine: this.props.isPristine(),
      errorMessage: this.props.getErrorMessage()
    };

    if (this.props.disabled) {
      configuration.className += 'pt-disabled ';
      configuration.disabled = true;
    }
    if (!this.state.focused && this.props.showRequired()) { configuration.className = 'pt-intent-warning '; }
    if (!this.state.focused && this.props.showError()) { configuration.className = 'pt-intent-danger '; }

    return (
      <DateTimePicker
        defaultValue={this.props.defaultValue}
        value={this.props.getValue()}
        onChange={this.changeValue}
        disabled={configuration.disabled}
        className={configuration.className} />
    );
  }
}

FormsyDateTimePicker.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool
};

export default withFormsy(FormsyDateTimePicker);
