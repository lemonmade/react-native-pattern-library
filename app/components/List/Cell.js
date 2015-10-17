import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Spacing, Colors} from '../../styles';

const {
  Component,
  View,
  TouchableHighlight,
  PropTypes,
} = React;

let styles = Stylish.create({
  container: {
    backgroundColor: Colors.WHITE,
  },

  cell: {
    padding: Spacing.DEFAULT,
    paddingTop: Spacing.HALVED,
    paddingBottom: Spacing.HALVED,
  },
});

@Stylish.connect(styles)
export default class ListCell extends Component {
  static propTypes = {
    action: PropTypes.func,
    children: PropTypes.node,
    row: PropTypes.any,
    section: PropTypes.any,
    highlight: PropTypes.func,
  };

  static defaultProps = {};

  handlePressStart() {
    let {row, section, highlight} = this.props;
    if (!highlight) { return; }

    highlight(section, row);
  }

  handlePressEnd() {
    let {highlight} = this.props;
    if (!highlight) { return; }

    highlight(null);
  }

  render() {
    let {children, action} = this.props;

    if (!action) {
      return (
        <View styled="container">
          <View styled="cell">{children}</View>
        </View>
      );
    }

    return (
      <TouchableHighlight
        underlayColor={Colors.CLEAR}
        onPressIn={::this.handlePressStart}
        onPressOut={::this.handlePressEnd}
        onPress={action}
        activeOpacity={1}
        styled="container"
      >
        <View styled="cell">{children}</View>
      </TouchableHighlight>
    );
  }
}
