import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react'

const AsyncSection = ({dataSet: {data, error, fetching}, children}) => {
  if (fetching) {
    return (
      <React.Fragment>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </React.Fragment>
    );
  }
  if (error) {
    return (<p>{error.message}</p>);
  }
  if (Object.keys(data).length) {
    return (<React.Fragment>{children}</React.Fragment>);
  }
  return (
    <React.Fragment/>
  )
};

export default AsyncSection;
