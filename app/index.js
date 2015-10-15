import React from 'react-native';

import {inject} from './utilities/proptypes';
inject();

import {Demo} from './components';
import {Button} from './documented';

const {
  AppRegistry,
  Component,
} = React;

class PatternLibrary extends Component {
  render() {
    return (
      <Demo Component={Button}>
        <Button>Hello!</Button>
      </Demo>
    );
  }
}

AppRegistry.registerComponent('PatternLibrary', () => PatternLibrary);
