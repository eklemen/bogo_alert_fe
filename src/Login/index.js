import React from 'react'
import {
  Button,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
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
    const {_login, userAuth, history} = this.props;
    await _login({email, password});
    if (!userAuth.error) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${userAuth.data.token}`;
      history.push('/about/');
    }
  };

  render() {
    const {form: {email, password}} = this.state;
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
      </div>
    )
  }
};

export default withService(Login)