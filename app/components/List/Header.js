import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Spacing, Colors} from '../../styles';

const {
  Component,
  View,
  Text,
} = React;

let styles = Stylish.create({
  backing: {
    padding: Spacing.DEFAULT,
    paddingTop: Spacing.HALVED / 2,
    paddingBottom: Spacing.HALVED / 2,
    backgroundColor: Colors.GRAY_LIGHT,
  },
});

@Stylish.connect(styles)
export default class ListHeader extends Component {
  static propTypes = {
    children: Text.propTypes.children,
  };

  render() {
    let {children} = this.props;

    return (
      <View styled="backing">
        <Text>{children}</Text>
      </View>
    );
  }
}
