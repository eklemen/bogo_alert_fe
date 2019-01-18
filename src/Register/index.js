import React from 'react'
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react'
import {Link} from 'react-router-dom';

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

  render() {
    const {
      form: {
        email, password, confirmPassword
      }
    } = this.state;
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
            <Form size='large' onSubmit={() => {
              console.log('register')
            }}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Email address'
                  value={ email }
                  onChange={ (e) => this.handleChange(e, 'email') }
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  value={ password }
                  onChange={ (e) => this.handleChange(e, 'password') }
                  type='password'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Re-enter Password'
                  value={ confirmPassword }
                  onChange={ (e) => this.handleChange(e, 'confirmPassword') }
                  type='password'
                />
                <Button color='teal' fluid size='large' type='submit'>
                  Submit
                </Button>
              </Segment>
            </Form>
            <Message>
              Already a member? <Link to='/'>Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Register