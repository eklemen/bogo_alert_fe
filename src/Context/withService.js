import React from 'react'
import { ServiceContext } from './ServiceProvider'

export function withService(Component) {
  return function ThemeComponent(props) {
    return (
      <ServiceContext.Consumer>
        {(contexts) => <Component {...props} {...contexts} />
        }
      </ServiceContext.Consumer>
    )
  }
}
