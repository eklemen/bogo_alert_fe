import React, {Component} from 'react';
import {Grid, Header, Segment, Label, Input, Button, Placeholder} from 'semantic-ui-react';
import {withCookies} from 'react-cookie';
import {withService} from '../Context/withService';
import {checkUser} from '../shared/utils';
import MyStore from "./components/MyStore";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: props.user.data.terms || [],
      editingTerm: '',
      editTermValue: '',
      touched: false,
    };
  }

  async componentDidMount() {
    if(checkUser.call(this)) {
      const {terms} = await this.props._getUser();
      terms && this.setState({terms});
    };
  }

  // Selects the term to edit
  editTerm = (term) => {
    this.setState({
      editingTerm: term,
      editTermValue: term,
      touched: true
    });
  };

  // enter will save term
  handleEnter = e => {
    if (e.key === 'Enter') {
      this.saveEditTerm();
    }
  };

  // updates value of input of term being edited
  handleTermEdit = (_, data) => {
    this.setState({editTermValue: data.value})
  };

  closeEditTerm = () => {
    const filtered = this.state.terms.filter(t => t !== '');
    this.setState({
      terms: filtered,
      editingTerm: '', editingTermValue: ''
    });
  };

  saveEditTerm = () => {
    const terms = [...this.state.terms];
    const i = terms.indexOf(this.state.editingTerm);
    terms[i] = this.state.editTermValue;
    this.setState({terms, touched: true}, () => this.closeEditTerm());
  };

  removeEditTerm = (term) => {
    const filtered = this.state.terms.filter(t => term !== t);
    this.setState({terms: filtered, touched: true})
  };

  // cancel all changes
  cancelChanges = () => {
    this.setState({terms: this.props.user.data.terms})
  };

  // submit term to api
  submitChanges = () => {
    this.props._updateUserTerms(this.state.terms);
  };

  // add new term
  addTerm = () => {
    if (!this.state.terms.includes('')) {
      this.setState({
        terms: [...this.state.terms, ''],
        editingTerm: '',
        editTermValue: ''
      })
    }
  };

  render() {
    const {user: {data}, user} = this.props;
    const {terms} = this.state;
    const loading = (user.fetching || !Object.keys(user.data).length) && !user.error;
    return (
      <Grid style={{height: '100%', justifyContent: 'center'}} verticalAlign='top'>
        <Grid.Row>
          <Header as='h2'>Dashboard</Header>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column mobile={16} computer={8}>
            <MyStore loading={loading} data={data} />

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
              <div style={{minHeight: '50px'}}>
                {
                  !loading &&
                  <ul className='term-list'>
                    {
                      terms.map(term => {
                        return (
                          term === this.state.editingTerm
                            ? (
                              <div className='term-li' key={term}>
                                <Input
                                  focus
                                  value={this.state.editTermValue}
                                  onChange={this.handleTermEdit}
                                  onKeyPress={this.handleEnter}
                                  onBlur={this.closeEditTerm}
                                />
                                <div className='term-btns links' style={{visibility: 'unset'}}>
                                  <Button
                                    size='mini'
                                    onClick={this.closeEditTerm}>Cancel</Button>
                                  <Button
                                    size='mini'
                                    color='blue'
                                    onClick={this.saveEditTerm}>Save</Button>
                                </div>
                              </div>
                            )
                            : (
                              <li className='term-li' key={term}>
                                <span>{term}</span>
                                <div className='term-btns'>
                                  <Button
                                    circular
                                    size='mini'
                                    icon='close'
                                    onClick={() => this.removeEditTerm(term)}/>
                                  <Button
                                    circular
                                    size='mini'
                                    icon='edit outline'
                                    onClick={() => this.editTerm(term)}
                                  />
                                </div>
                              </li>
                            )
                        );
                      })
                    }
                  </ul>
                }
                <Button icon='add' content='Add Item' circular onClick={this.addTerm} />
              </div>
              {
                (this.state.touched && !this.state.terms.includes(''))
                ? (
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                      size='mini'
                      onClick={this.cancelChanges}>Cancel Changes</Button>
                    <Button
                      size='mini'
                      onClick={this.submitChanges} color='blue'>Save List</Button>
                  </div>
                ) : (<div style={{height: '29px'}} />)
              }
            </Segment>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
};

export default withService(withCookies(Dashboard));
