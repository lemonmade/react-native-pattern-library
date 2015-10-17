import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Defaults, Spacing, Fonts, Colors} from '../styles';

const {
  Component,
  View,
  PropTypes,
  SwitchIOS,
} = React;

let styles = Stylish.create({});

@Stylish.connect(styles)
export default class Toggle extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => {},
    value: false,
  };

  render() {
    let {onChange, value} = this.props;

    return (
      <SwitchIOS onValueChange={onChange} value={value} />
    );
  }
}
