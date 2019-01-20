import React from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import { Form } from 'semantic-ui-react';

class ValidatorInput extends ValidatorComponent {

  render() {
    const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;

    return (
      <React.Fragment>
        <Form.Input
          {...rest}
        />
        {this.errorText()}
      </React.Fragment>
    );
  }

  errorText() {
    const { isValid } = this.state;

    if (isValid) {
      return null;
    }

    return (
      <div style={{ color: 'red', marginBottom: '12px', marginTop: '-12px' }}>
        {this.getErrorMessage()}
      </div>
    );
  }
}

export default ValidatorInput;