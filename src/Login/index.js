import React from 'react'
import {
  Button,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {withCookies} from 'react-cookie';
import {ValidatorForm} from 'react-form-validator-core';
import {ValidatorInput} from '../shared/Form';
import {withService} from '../Context/withService';
import axios from "axios/index";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      form: {
        email: '',
        password: ''
      }
    };
    this.handleRememberMe = this.handleRememberMe.bind(this)
  }

  handleChange = (e, field) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: e.target.value
      }
    })
  };

  submitLogin = async () => {
    const {form: {email, password}} = this.state;
    const {_login, user, history, cookies} = this.props;
    try {
      const auth = await _login({email, password});
      axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
      cookies.set('bogoUserToken', user.token, {path: '/'});
      history.push('/dashboard/');
    } catch (err) {
      console.log("Unauthorized...", err)
    }
  };

  handleRememberMe = () => {
    this.setState({
      form: {
        ...this.state.form,
        rememberMe: !this.state.form.rememberMe
      }
    });
  };

  render() {
    const {form: {email, password}} = this.state;
    return (
      <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' color='teal' textAlign='center'>
            Log-in to your account
          </Header>
          <ValidatorForm
            ref="form"
            className="ui form"
            instantValidate={false}
            onSubmit={this.submitLogin}
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
                type='password'
                value={password}
                name='password'
                validators={['required']}
                errorMessages={['Password is required']}
                onChange={(e) => this.handleChange(e, 'password')}
              />
              <Button color='teal' fluid size='large' type='submit'>
                Login
              </Button>
            </Segment>
          </ValidatorForm>
          <Message>
            New to us? <Link to='/register'>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }
};

export default withService(withCookies(Login));