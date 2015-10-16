import React from 'react-native';
import Stylish from 'react-stylish/native';

import TypeDetails from './TypeDetails';
import {Badge, Type} from '../components';
import {Spacing} from '../styles';
import {stringify, proptypes} from '../utilities';

const {
  Component,
  View,
  PropTypes,
} = React;

let styles = Stylish.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  badges: {
    marginLeft: Spacing.HALVED / 2,
    flexDirection: 'row',
  },

  detail: {
    paddingTop: Spacing.HALVED / 2,
    padingBottom: Spacing.HALVED / 2,
    flexDirection: 'row',
  },

  detailLabel: {
    marginRight: Spacing.HALVED,
    width: 50,
  },

  detailValue: {
    flex: 1,
    alignSelf: 'center',
  },
});

@Stylish.connect(styles)
export default class PropDetails extends Component {
  static propTypes = {
    prop: PropTypes.object.isRequired,
  };

  renderBadges() {
    let {prop} = this.props;
    let hasSimpleType = proptypes.isSimpleType(prop.type);

    let typeBadge = null;
    if (hasSimpleType) {
      typeBadge = <Badge>{prop.type}</Badge>;
    }

    let requiredBadge = null;
    if (prop.required) {
      requiredBadge = <Badge leftSpacing={hasSimpleType}>Required</Badge>;
    }

    return (
      <View styled="badges">
        {typeBadge}
        {requiredBadge}
      </View>
    );
  }

  renderType() {
    let {prop} = this.props;

    if (proptypes.isSimpleType(prop.type)) { return null; }

    return (
      <View styled="detail">
        <View styled="detailLabel">
          <Type.Subdued>Type</Type.Subdued>
        </View>

        <View styled="detailValue">
          <TypeDetails type={prop.type} shape={prop.shape} />
        </View>
      </View>
    );
  }

  renderDefault() {
    let {prop} = this.props;

    if (prop.default == null) { return null; }

    return (
      <View styled="detail">
        <View styled="detailLabel">
          <Type.Subdued>Default</Type.Subdued>
        </View>

        <View styled="detailValue">
          <Type.Code>{stringify(prop.default)}</Type.Code>
        </View>
      </View>
    );
  }

  render() {
    let {prop} = this.props;

    return (
      <View>
        <View styled="header">
          <Type.Heading>{prop.prop}</Type.Heading>
          {this.renderBadges()}
        </View>

        {this.renderType()}
        {this.renderDefault()}
      </View>
    );
  }
}
