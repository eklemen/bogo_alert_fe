import React from 'react'
import {
  Button,
  Grid,
  Header,
  Message,
  Segment,
  Checkbox,
  Form,
  Transition,
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {withCookies} from 'react-cookie';
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
        confirmPassword: '',
        phone: '',
        emailOptIn: false,
        textOptIn: false
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
    const {form} = this.state;
    const formData = {...form};
    delete formData.confirmPassword;
    const {_registerUser, history, cookies} = this.props;
    const user = await _registerUser(formData);
    if (!user.error && user.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
      cookies.set('bogoUserToken',
        user.token,
        {path: '/'});
      history.push('/dashboard/');
    }
  };

  handleCheck = (_, {name, checked}) => {
    const {form} = this.state;
    this.setState({
      form: {
        ...form,
        [name]: checked
      }
    })
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
        email, password, confirmPassword, emailOptIn, textOptIn, phone
      }
    } = this.state;
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => (
      value === this.state.form.password
    ));
    return (
      <Grid textAlign='center' style={{height: '100%'}} verticalAlign='top'>
        <Grid.Column style={{maxWidth: 450, marginTop: '5em'}}>
          <Header as='h2' color='teal' textAlign='center'>
            Sign up today, it's free!
          </Header>
          <ValidatorForm
            ref="form"
            className="ui form"
            instantValidate={false}
            onSubmit={this.submitRegistration}
          >
            <Segment stacked textAlign='left'>
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
              <Form.Field>
                <Checkbox
                  toggle
                  label='Email me Bogo Alerts'
                  onChange={this.handleCheck}
                  checked={emailOptIn}
                  name='emailOptIn'
                />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  toggle
                  label='Text me Bogo Alerts'
                  onChange={this.handleCheck}
                  name='textOptIn'
                />
              </Form.Field>
              <Transition.Group animation='slide down' duration={500}>
                {
                  textOptIn &&
                  <ValidatorInput
                    fluid
                    icon='phone'
                    iconPosition='left'
                    placeholder='555-555-5555'
                    value={phone}
                    name='phone'
                    validators={[
                      'required',
                      'matchRegexp:^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$'
                    ]}
                    errorMessages={[
                      'Phone is required',
                      'Please enter a valid phone number'
                    ]}
                    onChange={(e) => this.handleChange(e, 'phone')}
                  />
                }
              </Transition.Group>

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
    )
  }
}

export default withService(withCookies(Register));