import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Spacing, Colors} from '../../styles';

const {
  Component,
  Text,
  PropTypes,
} = React;

let styles = Stylish.create({
  heading: {
    padding: Spacing.DEFAULT,
    paddingTop: Spacing.HALVED,
    paddingBottom: Spacing.HALVED / 2,
    backgroundColor: Colors.GRAY_LIGHTER,
  },
});

@Stylish.connect(styles)
export default class ListHeader extends Component {
  static propTypes = {
    children: PropTypes.string,
  };

  render() {
    let {children} = this.props;

    return <Text styled="heading">{children}</Text>;
  }
}
