import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Badge, Type, BulletedList} from '../components';
import {Spacing} from '../styles';
import {stringify, proptypes} from '../utilities';

const {
  Component,
  View,
  PropTypes,
} = React;

export default class TypeDetails extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    shape: PropTypes.any,
  }

  renderOneOf(category, options) {
    return (
      <View>
        <Type.Paragraph>Expects one of the following {category}:</Type.Paragraph>

        <BulletedList>
          {options.map((option) => <BulletedList.Item>{option}</BulletedList.Item>)}
        </BulletedList>
      </View>
    );
  }

  render() {
    let {type, shape} = this.props;

    if (proptypes.isSimpleType(type)) { return null; }
    if (type === 'oneOf') {
      return this.renderOneOf('values', shape[0].map((value) => {
        return <Type.Code>{stringify(value)}</Type.Code>;
      }));
    }

    return <Type.Paragraph>{type}</Type.Paragraph>;
  }
}
