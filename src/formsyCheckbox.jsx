import React, { Component } from 'react';
import { HOC } from 'formsy-react';
import PropTypes from 'prop-types';

import { Checkbox } from '@blueprintjs/core';

class FormsyCheckbox extends Component {
  constructor (props) {
    super(props);

    this.state = { value: false };
    this.changeValue = this.changeValue.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount () {
    if (this.props.initialValue) {
      this.props.setValue(true);
    } else if (this.props.checked) {
      this.setState({ value: this.props.checked }, () => {
        this.props.setValue(this.state.value);
      });
    }
  }

  changeValue (event) {
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
      <Checkbox
        defaultChecked={this.props.getValue()}
        checked={this.props.getValue()}
        label={this.props.label}
        onChange={this.changeValue}
        disabled={configuration.disabled}
        className={configuration.className} />
    );
  }
}

FormsyCheckbox.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  inline: React.PropTypes.bool,
  initialValue: React.PropTypes.bool,
  fill: React.PropTypes.bool,
  disabled: React.PropTypes.bool
};

export default HOC(FormsyCheckbox);
