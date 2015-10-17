import React from 'react-native';
import Stylish from 'react-stylish/native';
import reactToJSX from 'react-to-jsx';

import {Spacing, Colors, Defaults} from '../styles';

const {
  View,
  Text,
  Component,
  PropTypes,
} = React;

let styles = Stylish.create({
  container: {
    backgroundColor: Colors.GRAY_LIGHT,
    padding: Spacing.HALVED,
    borderRadius: Defaults.BORDER_RADIUS,
  },

  text: {
    fontFamily: 'Courier',
  },
});

@Stylish.connect(styles)
export default class CodeBlock extends Component {
  static propTypes = {component: PropTypes.element.isRequired};

  render() {
    let {component} = this.props;

    return (
      <View styled="container">
        <Text styled="text">{reactToJSX(component, {indent: '  '}).trim()}</Text>
      </View>
    );
  }
}
