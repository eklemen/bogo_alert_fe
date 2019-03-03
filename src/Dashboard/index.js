import React, {Component} from 'react';
import {Grid, Header, Segment, Label, List, Button, Placeholder, Container} from 'semantic-ui-react';
import {withCookies} from 'react-cookie';
import {withService} from '../Context/withService';
import {checkUser} from '../shared/utils';
import MyStore from "./components/MyStore";
import AsyncCreatable from 'react-select/lib/AsyncCreatable';

const unescape = require('lodash.unescape');

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editTerms: false,
      terms: props.user.data.terms || [],
      editingTerm: '',
      editTermValue: '',
      touched: false,
    };
    this.submitChanges = this.submitChanges.bind(this);
  }

  async componentDidMount() {
    if (checkUser.call(this)) {
      const {terms} = await this.props._getUser();
      terms && this.setState({terms});
    };
  }

  toggleEditTerms = () => {
    this.setState({editTerms: !this.state.editTerms})
  };

  handleChange = (e) => {
    const updated = e.map(t => t.label);
    this.setState({terms: updated});
  };

  // cancel all changes
  cancelChanges = () => {
    this.setState({terms: this.props.user.data.terms})
  };

  // submit term to api
  submitChanges = () => {
    this.props._updateUserTerms(this.state.terms);
    this.toggleEditTerms();
  };

  handleTypeAhead = async (e) => {
    if(e.length) {
      const suggestions = await this.props._getTypeAhead(e);
      return suggestions.map(s => ({
        label: unescape(s),
        value: unescape(s)
      }))
    }
  };

  render() {
    const {user: {data}, user} = this.props;
    const {terms} = this.state;
    const loading = (user.fetching || !Object.keys(user.data).length) && !user.error;
    const options = [{
      label: 'bread',
      value: 'bread'
    },{
      label: 'eggs',
      value: 'eggs'
    },{
      label: 'milk',
      value: 'milk'
    }];
    const dropdownVals = terms.map(t => ({label: t, value: t}));

    return (
      <Grid style={{height: '100%', justifyContent: 'center'}} verticalAlign='top'>
        <Grid.Row>
          <Header as='h2'>Dashboard</Header>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} computer={8}>
            <MyStore loading={loading} data={data}/>
          </Grid.Column>
          <Grid.Column mobile={16} computer={8}>
            <Segment loading={loading} textAlign='left'>
              <Label
                attached='top'
                content='My Search Terms'
                style={{textAlign: 'center'}}
                color='olive'
              />
              {loading && <Placeholder>
                <Placeholder.Paragraph>
                  <Placeholder.Line/>
                  <Placeholder.Line/>
                  <Placeholder.Line/>
                  <Placeholder.Line/>
                </Placeholder.Paragraph>
              </Placeholder>}
              <Container style={{minHeight: '80px'}}>
                {
                  !loading &&
                  (this.state.editTerms
                      ?
                      <>
                        <AsyncCreatable
                          cacheOptions
                          isMulti
                          value={dropdownVals}
                          onChange={this.handleChange}
                          loadOptions={this.handleTypeAhead}
                          defaultOptions={options}
                        />
                        <Grid.Row style={{textAlign: 'right', paddingTop: '0.6em'}}>
                          <Button
                            className='link padded'
                            onClick={this.toggleEditTerms}
                          >Cancel</Button>
                          <Button
                            className='link padded'
                            onClick={this.submitChanges}
                          >
                            Save
                          </Button>
                        </Grid.Row>
                      </>
                      :
                      <>
                        {
                          terms.length
                            ? <List items={terms} size='big' divided horizontal className='terms-list'/>
                            : <Header as='h3' textAlign='center'>Click below to get started</Header>
                        }
                        <Grid.Row style={{textAlign: 'right'}}>
                          <Button
                            className='link padded'
                            onClick={this.toggleEditTerms}
                          >
                            {terms.length ? 'Edit' : 'Add Terms'}
                          </Button>
                        </Grid.Row>
                      </>
                  )
                }
              </Container>
              {
                (this.state.touched && !this.state.terms.includes(''))
                && (
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                      size='mini'
                      onClick={this.cancelChanges}>Cancel Changes</Button>
                    <Button
                      size='mini'
                      onClick={this.submitChanges} color='blue'>Save List</Button>
                  </div>
                )
              }
            </Segment>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
};

export default withService(withCookies(Dashboard));
