import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Colors, Spacing, Fonts, Defaults} from '../styles';

const {
  Component,
  Text,
  TouchableHighlight,
  PropTypes,
} = React;

let styles = Stylish.create({
  button: {
    padding: Spacing.HALVED,
    paddingLeft: Spacing.DEFAULT,
    paddingRight: Spacing.DEFAULT,
    backgroundColor: Colors.BLUE,
    borderRadius: Defaults.BORDER_RADIUS,
  },

  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.Sizes.PARAGRAPH,
    color: Colors.WHITE,
  },
});

styles.variations({
  primary: {
    button: {backgroundColor: Colors.GREEN},
  },
});

let SIZES = [
  'medium',
  'large',
];

@Stylish.connect(styles)
export default class Button extends Component {
  static propTypes = {
    action: PropTypes.func,
    children: PropTypes.string.isRequired,
    primary: PropTypes.bool,
    size: PropTypes.oneOf(SIZES),
  }

  static defaultProps = {
    primary: false,
    size: SIZES[0],
  }

  render() {
    let {children, action, primary} = this.props;

    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={primary ? Colors.GREEN_DARK : Colors.BLUE_DARK}
        styled="button"
        onPress={action}
      >
        <Text styled="text">{children}</Text>
      </TouchableHighlight>
    );
  }
}
