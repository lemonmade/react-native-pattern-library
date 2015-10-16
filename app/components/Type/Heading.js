import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Fonts} from '../../styles';

const {
  Text,
  PropTypes,
  Component,
} = React;

let styles = Stylish.create({
  heading: {
    fontSize: Fonts.Sizes.HEADING,
    fontWeight: 'bold',
  },
});

@Stylish.connect(styles)
export default class Heading extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
  };

  render() {
    return <Text styled="heading">{this.props.children}</Text>;
  }
}
