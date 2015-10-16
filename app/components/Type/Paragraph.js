import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Fonts} from '../../styles';

const {
  Text,
  PropTypes,
  Component,
} = React;

let styles = Stylish.create({
  paragraph: {
    fontSize: Fonts.Sizes.PARAGRAPH,
  },
});

@Stylish.connect(styles)
export default class Paragraph extends Component {
  static propTypes = {children: PropTypes.string.isRequired};

  render() {
    return <Text styled="paragraph">{this.props.children}</Text>;
  }
}
