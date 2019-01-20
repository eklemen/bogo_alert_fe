import React from 'react'
import {
  Button,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ValidatorForm} from 'react-form-validator-core';
import {ValidatorInput} from '../shared/Form';
import {withService} from '../Context/withService';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  }

  handleChange = (e, field) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: e.target.value
      }
    })
  };

  submitRegistration = async () => {
    const {form: {email, password}} = this.state;
    const {_registerUser, userAuth, history} = this.props;
    await _registerUser({email, password});
    if (!userAuth.error) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth.data.token}`;
      history.push('/about/');
    }
  };
  //
  // handleBlur = (event) => {
  //   // set true as second parameter to onBlur required validation
  //   console.log(event);
  //   debugger
  //   // validate(event.target.value);
  // };

  render() {
    const {
      form: {
        email, password, confirmPassword
      }
    } = this.state;
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => (
      value === this.state.form.password
    ));
    return (
      <div className='login-form'>
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' color='teal' textAlign='center'>
              Sign up today, it's free!
            </Header>
            <ValidatorForm
              ref="form"
              className="ui form"
              instantValidate={false}
              onSubmit={this.submitRegistration}
            >
              <Segment stacked>
                <ValidatorInput
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Email address'
                  value={email}
                  name='email'
                  validators={['required', 'isEmail']}
                  errorMessages={['Email is required', 'Please enter a valid email']}
                  onChange={(e) => this.handleChange(e, 'email')}
                />
                <ValidatorInput
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  value={password}
                  name='password'
                  validators={[
                    'required',
                    'matchRegexp:^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
                  ]}
                  errorMessages={[
                    'Password is required',
                    'Must contain: capital and lowercase letter, number, and special character'
                  ]}
                  onChange={(e) => this.handleChange(e, 'password')}
                  type='password'
                />
                <ValidatorInput
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Re-enter Password'
                  value={confirmPassword}
                  name='confirmPassword'
                  validators={[
                    'required',
                    'isPasswordMatch'
                  ]}
                  errorMessages={[
                    'Confirm Password is required',
                    'Passwords do not match'
                  ]}
                  onChange={(e) => this.handleChange(e, 'confirmPassword')}
                  type='password'
                />
                <Button color='teal' fluid size='large' type='submit'>
                  Submit
                </Button>
              </Segment>
            </ValidatorForm>
            <Message>
              Already a member? <Link to='/'>Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default withService(Register);