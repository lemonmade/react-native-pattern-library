import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Defaults, Spacing, Colors} from '../../styles';

const {
  Component,
  View,
  PropTypes,
} = React;

let styles = Stylish.create({
  border: {
    borderBottomWidth: Defaults.BORDER_WIDTH,
    borderBottomColor: Defaults.BORDER_COLOR,
    marginLeft: Spacing.DEFAULT,
    marginRight: Spacing.DEFAULT,
  },
});

styles.variations({
  hidden: {
    border: {borderBottomColor: Colors.CLEAR},
  },

  full: {
    border: {
      marginLeft: 0,
      marginRight: 0,
    },
  },

  nudge: {
    border: {top: -Defaults.BORDER_WIDTH},
  },
});

@Stylish.connect(styles)
export default class ListBorder extends Component {
  static propTypes = {
    full: PropTypes.bool,
    hidden: PropTypes.bool,
    nudge: PropTypes.bool,
  };

  static defaultProps = {
    full: false,
    hidden: false,
    nudge: false,
  };

  render() {
    return <View styled="border" />;
  }
}
