import React from 'react';
import {Segment, Label, Button, Placeholder, Header} from 'semantic-ui-react';
import {withService} from '../../Context/withService';
import FindMyStore from '../../FindMyStore';

class MyStore extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
    };
  }

  toggleEdit = () => {
    this.setState({isEditing: !this.state.isEditing});
  };

  render() {
    const {loading, data} = this.props;
    const {isEditing} = this.state;
    return (
      <Segment
        loading={loading}>
        <Label
          attached='top'
          content='My Store'
          color='blue'
        />
        {loading && <Placeholder>
          <Placeholder.Paragraph>
            <Placeholder.Line/>
            <Placeholder.Line/>
            <Placeholder.Line/>
            <Placeholder.Line/>
          </Placeholder.Paragraph>
        </Placeholder>}
        <div style={{minHeight: '80px'}}>
          {
            !loading && data.store && !isEditing &&
            <div className='store-address'>
              <Header as='h3'>{data.store.name}</Header>
              <Header as='h3'>{`${data.store.address}, ${data.store.state}`}</Header>
              <Button
                className='btn-link'
                style={{alignSelf: 'flex-end'}}
                onClick={this.toggleEdit}
              >
                Edit
              </Button>
            </div>
          }
          {
            isEditing &&
            <FindMyStore {...this.props} iconsOnly cancel={this.toggleEdit} />
          }
        </div>
      </Segment>
    )
  }
}

export default withService(MyStore);
