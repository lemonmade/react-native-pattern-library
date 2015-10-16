import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Paragraph} from './Type';
import {Spacing} from '../styles';

const {
  View,
  PropTypes,
  Component,
} = React;

let styles = Stylish.create({
  list: {
    paddingLeft: Spacing.HALVED,
  },
});

class BulletedListItem extends Component {
  static propTypes = {children: PropTypes.node.isRequired};

  render() {
    let {children} = this.props;

    return (
      <Paragraph>• {children}</Paragraph>
    );
  }
}

@Stylish.connect(styles)
export default class BulletedList extends Component {
  static propTypes = {children: PropTypes.node.isRequired};
  static Item = BulletedListItem;

  render() {
    let {children} = this.props;

    return (
      <View styled="list">
        {children}
      </View>
    );
  }
}
