import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Defaults, Spacing, Fonts, Colors} from '../styles';

const {
  Component,
  View,
  Text,
  PropTypes,
  TouchableHighlight,
} = React;

let styles = Stylish.create({
  item: {
    backgroundColor: Colors.GRAY_LIGHT,
    padding: Spacing.HALVED,
    borderRadius: Defaults.BORDER_RADIUS,
    marginTop: Spacing.HALVED,
  },

  itemText: {
    textAlign: 'center',
    color: Colors.BLACK,
    fontSize: Fonts.Sizes.HEADING,
    fontWeight: 'bold',
  },
});

styles.variations({
  selected: {
    item: {backgroundColor: Colors.BLUE},
    itemText: {color: Colors.WHITE},
  },

  first: {
    item: {marginTop: 0},
  },
});

@Stylish.connect(styles)
class Item extends Component {
  static propTypes = {
    first: PropTypes.bool,
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,
    selected: PropTypes.bool,
  };

  static defaultProps = {
    first: false,
    onChange: () => {},
    selected: false,
  };

  handlePress() {
    let {selected, children, onPress} = this.props;
    if (selected) { return; }
    onPress(children);
  }

  render() {
    let {children, selected} = this.props;

    return (
      <TouchableHighlight
        underlayColor={selected ? Colors.BLUE_DARK : Colors.GRAY}
        styled="item"
        onPress={::this.handlePress}
        activeOpacity={1}
      >
        <Text styled="itemText">{children}</Text>
      </TouchableHighlight>
    );
  }
}

@Stylish.connect(styles)
export default class Chooser extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selected: PropTypes.number,
  };

  static defaultProps = {
    onChange: () => {},
    options: [],
    selected: 0,
  };

  renderItem(option, index) {
    let first = (index === 0);
    let {onChange, selected} = this.props;
    selected = (index === selected);

    return <Item first={first} selected={selected} onPress={onChange}>{option}</Item>;
  }

  render() {
    let {options} = this.props;
    return <View styled="container">{options.map(::this.renderItem)}</View>;
  }
}
