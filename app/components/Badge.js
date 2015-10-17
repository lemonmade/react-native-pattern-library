import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Spacing, Defaults, Fonts, Colors} from '../styles';

const {
  Text,
  View,
  PropTypes,
  Component,
} = React;

let styles = Stylish.create({
  badge: {
    backgroundColor: Colors.GRAY_LIGHTER,
    borderRadius: Defaults.BORDER_RADIUS,
    padding: Fonts.Sizes.BADGE / 2,
    paddingTop: 2,
    paddingBottom: 3,
  },

  text: {
    color: Colors.GRAY_DARK,
    fontSize: Fonts.Sizes.BADGE,
    fontWeight: 'bold',
  },
});

styles.variations({
  leftSpacing: {
    badge: {marginLeft: Spacing.HALVED / 2},
  },
});

@Stylish.connect(styles)
export default class Badge extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    leftSpacing: PropTypes.bool,
  };

  static defaultProps = {
    children: '',
    leftSpacing: false,
  };

  render() {
    let {children} = this.props;

    return (
      <View styled="badge">
        <Text styled="text">{children.toUpperCase()}</Text>
      </View>
    );
  }
}
