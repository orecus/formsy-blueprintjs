import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import PropTypes from 'prop-types';

import { Switch } from '@blueprintjs/core';

class FormsySwitch extends Component {
  constructor (props) {
    super(props);

    this.state = { value: props.checked || props.initialValue || false };

    this.changeValue = this.changeValue.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount () {
    const { initialValue, setValue } = this.props;

    if (initialValue) { this.props.setValue(initialValue); }
  }

  changeValue(event) {
    const newValue = event.currentTarget.value;
    const oldValue = this.props.getValue();

    if (newValue === 'on' && oldValue === true) {
      this.setState({ value: false }, () => {
        this.props.setValue(this.state.value);
      });
    } else {
      this.setState({ value: true }, () => {
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
    if (this.props.inline) { configuration.className += 'pt-inline '; }
    if (!this.state.focused && this.props.showRequired()) { configuration.className = 'pt-intent-warning '; }
    if (!this.state.focused && this.props.showError()) { configuration.className = 'pt-intent-danger '; }
    if (this.props.fill) { configuration.className += 'pt-fill '; }

    return (
      <Switch
        defaultChecked={this.props.initialValue}
        checked={this.props.getValue()}
        label={this.props.label}
        onChange={this.changeValue}
        disabled={configuration.disabled}
        className={configuration.className} />
    );
  }
}

FormsySwitch.propTypes = {
  label: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  initialValue: PropTypes.string,
  fill: PropTypes.bool,
  disabled: PropTypes.bool
};

export default withFormsy(FormsySwitch);
