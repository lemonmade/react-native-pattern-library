import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Spacing} from '../../styles';

const {
  Component,
  View,
  TouchableHighlight,
  PropTypes,
} = React;

let styles = Stylish.create({
  cell: {
    padding: Spacing.DEFAULT,
    paddingTop: Spacing.HALVED,
    paddingBottom: Spacing.HALVED,
  },
});

@Stylish.connect(styles)
export default class ListCell extends Component {
  static propTypes = {
    children: View.propTypes.children,
    row: PropTypes.any,
    section: PropTypes.any,
    highlight: PropTypes.func,
  };

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
    let {children} = this.props;

    return (
      <TouchableHighlight
        underlayColor={'clear'}
        onPressIn={::this.handlePressStart}
        onPressOut={::this.handlePressEnd}
        activeOpacity={1}
      >
        <View styled="cell">{children}</View>
      </TouchableHighlight>
    );
  }
}
