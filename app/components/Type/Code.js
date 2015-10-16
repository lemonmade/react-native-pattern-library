import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Fonts} from '../../styles';

const {
  Text,
  PropTypes,
  Component,
} = React;

let styles = Stylish.create({
  code: {
    fontFamily: Fonts.Families.MONOSPACE,
  },
});

@Stylish.connect(styles)
export default class Code extends Component {
  static propTypes = {children: PropTypes.string.isRequired};

  render() {
    return <Text styled="code">{this.props.children}</Text>;
  }
}
