import React, {Component} from 'react';
import {Grid, Header, Segment, Container, Label} from 'semantic-ui-react';
import {withCookies} from 'react-cookie';
import {withService} from '../Context/withService';
import axios from "axios/index";

class Dashboard extends Component {
  componentDidMount() {
    const {user, _getUser, history, cookies} = this.props;
    const token = cookies.get('bogoUserToken');
    if (!user.data.token) {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        _getUser();
      } else {
        history.push('/login');
      }
    }
  }

  render() {
    const {user: {data}, user} = this.props;
    console.log(data);
    return (
      <Grid style={{height: '100%', justifyContent: 'center'}} verticalAlign='top'>
        <Grid.Row>
          <Header as='h2'>Dashboard</Header>
        </Grid.Row>
        <Grid.Row>
          <Container>
            <Segment loading={user.fetching} padded='very'>
              <Label attached='top' content='My Store' />
              <p>123 Main Street</p>
              <p>lake mary FL</p>
            </Segment>
          </Container>
        </Grid.Row>
      </Grid>
    )
  }
};

export default withService(withCookies(Dashboard));
