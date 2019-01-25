import React, {Component} from 'react';
import {withCookies} from 'react-cookie';
import {Grid, Button, Form, Table, Container, Header} from 'semantic-ui-react';
import {withService} from '../Context/withService';
import axios from "axios/index";
import AsyncSection from "../shared/AsyncSection";

class FindMyStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      selectedStore: ''
    };
  }

  async componentDidMount() {
    const {user, _getUser, history, cookies} = this.props;
    const token = cookies.get('bogoUserToken');

    if (!user.data.token) {
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          await _getUser();
        } catch (err) {
          axios.defaults.headers.common['Authorization'] = '';
          history.push('/login');
        }
      } else {
        history.push('/login');
      }
    }
  }

  handleChange = (_, {value: zipCode}) => {
    this.setState({zipCode})
  };

  handleSubmit = () => {
    this.props._getStoresByZip(this.state.zipCode)
  };

  handleSelectStore = store => async () => {
    const update = await this.props._updateZip(store);
    if (update && update.store) {
      this.props.history.push('/about/');
    }
  };

  render() {
    const {storesList} = this.props;
    const {selectedStore} = this.state;
    return (
      <Grid style={{height: '100%', justifyContent: 'center'}} verticalAlign='top'>
        <Grid.Row style={{maxWidth: 450, marginTop: '5em'}}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label='5-Digit Zip Code'
              onChange={this.handleChange}
              focus
            />
            <Button type='submit'>
              Search
            </Button>
          </Form>
        </Grid.Row>
        <Grid.Row>
          <Container style={{minHeight: '300px'}}>
            <AsyncSection dataSet={storesList}>
              <Table basic='very' padded>
                <Table.Body>
                {
                  storesList.data.STORES &&
                  storesList.data.STORES.map((store) => (
                    <Table.Row
                      key={store.WASTORENUM}
                      onClick={this.handleSelectStore(store)}
                      active={store.WASTORENUM === selectedStore}
                    >
                      <Table.Cell style={{paddingLeft: '2em'}}>
                        <Header as='h4'>
                          <Header.Content>
                            {store.NAME}
                            <Header.Subheader>
                              {
                                `${store.ADDR}
                                ${store.CITY} ${store.STATE}`
                              }
                            </Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>
                        <Button icon='map marker alternate' content='Map'/>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          icon='add'
                          content='Add'
                          onClick={this.handleSelectStore(store.WASTORENUM)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))
                }
                </Table.Body>
              </Table>
            </AsyncSection>
          </Container>
        </Grid.Row>
      </Grid>
    )
  }
}

export default withService(withCookies(FindMyStore));
