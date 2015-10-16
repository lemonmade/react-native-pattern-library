import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Colors} from '../../styles';

const {
  Text,
  PropTypes,
  Component,
} = React;

let styles = Stylish.create({
  subdued: {
    color: Colors.GRAY_DARK,
  },
});

@Stylish.connect(styles)
export default class Subdued extends Component {
  static propTypes = {children: PropTypes.string.isRequired};

  render() {
    return <Text styled="subdued">{this.props.children}</Text>;
  }
}
