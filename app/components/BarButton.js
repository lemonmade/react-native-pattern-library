import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Colors, Spacing} from '../styles';

const {
  Text,
  TouchableHighlight,
  Navigator,
  PropTypes,
  Component,
} = React;

let styles = Stylish.create({
  button: {
    height: Navigator.NavigationBar.Styles.General.NavBarHeight,
    justifyContent: 'center',
    paddingLeft: Spacing.DEFAULT,
  },

  icon: {
    color: Colors.WHITE,
  },
});

@Stylish.connect(styles)
export default class BarButton extends Component {
  static propTypes = {
    action: PropTypes.func.isRequired,
  };

  static defaultProps = {
    action: () => {},
  };

  render() {
    let {action} = this.props;

    return (
      <TouchableHighlight
        styled="button"
        underlayColor={Colors.CLEAR}
        activeOpacity={1}
        onPress={action}
      >
        <Text styled="icon">Back</Text>
      </TouchableHighlight>
    );
  }
}
