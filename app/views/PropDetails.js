import React from 'react-native';
import Stylish from 'react-stylish/native';

import PropEditor from './PropEditor';

import {Badge, Type} from '../components';
import {Spacing} from '../styles';

const {
  Component,
  View,
  PropTypes,
} = React;

let styles = Stylish.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  badges: {
    marginLeft: Spacing.HALVED / 2,
    flexDirection: 'row',
  },

  wrapper(component) {
    let {props: {prop}} = component;
    if (prop.type.toLowerCase() !== 'boolean') { return null; }

    return {
      flexDirection: 'row',
      alignItems: 'center',
    };
  },

  editor(component) {
    let {props: {prop}} = component;
    if (prop.type.toLowerCase() === 'boolean') { return null; }

    return {marginTop: Spacing.HALVED};
  },
});

@Stylish.connect(styles)
export default class PropDetails extends Component {
  static propTypes = {
    prop: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
  };

  renderBadges() {
    let {prop} = this.props;

    let typeBadge = <Badge>{prop.type}</Badge>;

    let requiredBadge = null;
    if (prop.required) {
      requiredBadge = <Badge leftSpacing>Required</Badge>;
    }

    return (
      <View styled="badges">
        {typeBadge}
        {requiredBadge}
      </View>
    );
  }

  render() {
    let {prop, value, onChange} = this.props;

    return (
      <View styled="wrapper">
        <View styled="header">
          <Type.Heading>{prop.name}</Type.Heading>
          {this.renderBadges()}
        </View>

        <View styled="editor">
          <PropEditor prop={prop} value={value} onChange={onChange} />
        </View>
      </View>
    );
  }
}
