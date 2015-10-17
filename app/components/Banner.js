import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Defaults, Spacing, Fonts, Colors} from '../styles';

const {
  Component,
  Text,
  PropTypes,
} = React;

let styles = Stylish.create({
  banner: {
    borderWidth: Defaults.BORDER_WIDTH,
    borderColor: Defaults.BORDER_COLOR,
    borderRadius: Defaults.BORDER_RADIUS,
    backgroundColor: Colors.GRAY_LIGHTER,
    color: Colors.GRAY_DARK,
    padding: Spacing.HALVED,
    fontSize: Fonts.Sizes.HEADING,
    textAlign: 'center',
    overflow: 'hidden',
  },
});

styles.variations({
  error: {
    banner: {
      borderColor: Colors.RED,
      backgroundColor: Colors.RED_LIGHT,
      color: Colors.RED_DARK,
    },
  },
});

@Stylish.connect(styles)
export default class Banner extends Component {
  static propTypes = {
    children: PropTypes.string,
    error: PropTypes.bool,
  };

  static defaultProps = {
    error: false,
  };

  render() {
    let {children} = this.props;
    return <Text styled="banner">{children}</Text>;
  }
}
