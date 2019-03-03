import React, {Component} from 'react';
import {withCookies} from 'react-cookie';
import {Grid, Button, Form, Table, Container, Header} from 'semantic-ui-react';
import {withService} from '../Context/withService';
import {checkUser} from '../shared/utils';

class FindMyStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      selectedStore: ''
    };
    this.handleSelectStore = this.handleSelectStore.bind(this);
  }

  async componentDidMount() {
    await checkUser.call(this);
  }

  handleChange = (_, {value: zipCode}) => {
    this.setState({zipCode})
  };

  handleSubmit = () => {
    this.props._getStoresByZip(this.state.zipCode)
  };

  handleSelectStore = async store => {
    await this.props._updateStore(store, true);
    this.props.cancel();
  };

  render() {
    const {storesList, iconsOnly, cancel} = this.props;
    const {selectedStore} = this.state;
    return (
      <Grid style={{height: '100%', justifyContent: 'center'}} verticalAlign='top'>
        <Grid.Row style={{maxWidth: 450, marginTop: '2em'}}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label='5-Digit Zip Code'
              onChange={this.handleChange}
              focus
            />
            <Button content='Cancel' type='button' onClick={cancel} />
            <Button type='submit' color='teal' loading={storesList.fetching}>
              Search
            </Button>
          </Form>
        </Grid.Row>
        <Grid.Row>
          <Container className='store-list'>
            <React.Fragment>
              <Table basic='very' padded>
                <Table.Body>
                {
                  storesList.data.STORES &&
                  storesList.data.STORES.map((store) => (
                    <Table.Row
                      key={store.WASTORENUM}
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
                      {/*<Table.Cell style={{padding: '0'}}>*/}
                        {/*<Button*/}
                          {/*icon='map marker alternate'*/}
                          {/*content={iconsOnly ? '' : 'Map'}*/}
                          {/*size='tiny'*/}
                        {/*/>*/}
                      {/*</Table.Cell>*/}
                      <Table.Cell style={{padding: '0'}}>
                        <Button
                          icon='add'
                          color='teal'
                          circular
                          content={iconsOnly ? '' : 'Add'}
                          size='tiny'
                          onClick={() => this.handleSelectStore(store)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))
                }
                </Table.Body>
              </Table>
            </React.Fragment>
          </Container>
        </Grid.Row>
      </Grid>
    )
  }
}

export default withService(withCookies(FindMyStore));
