import React from 'react';

class FormsyStub extends React.Component {

  getChildContext() {
    return {
      formsy: {
        attachToForm() { },
        detachFromForm() { },
        validate() { },
        isFormDisabled() { },
        isValidValue() { }
      }
    };
  }

  render() {
    return this.props.children();
  }
}

FormsyStub.childContextTypes = {
  formsy: React.PropTypes.object.isRequired
};

export default FormsyStub;
