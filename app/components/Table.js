import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Spacing, Defaults} from '../styles';

const {
  View,
  Text,
  Component,
  PropTypes,
} = React;

let styles = Stylish.create({
  table: {
    borderWidth: Defaults.BORDER_WIDTH,
    borderColor: Defaults.BORDER_COLOR,
  },

  row: {
    padding: Spacing.HALVED,
    borderBottomWidth: Defaults.BORDER_WIDTH,
    borderBottomColor: Defaults.BORDER_COLOR,
  },
});

styles.variations({
  last: {
    row: {borderBottomWidth: 0},
  },
});

@Stylish.connect(styles)
export default class Table extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  renderRow(rowData, index) {
    return (
      <TableRow
        last={index === this.props.data.length - 1}
        data={rowData}
      />
    );
  }

  render() {
    let {data} = this.props;

    return (
      <View styled="table">
        {data.map(::this.renderRow)}
      </View>
    );
  }
}

@Stylish.connect(styles)
class TableRow extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    last: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    last: false,
  };

  render() {
    let {data} = this.props;

    return (
      <View styled="row">
        {Object.keys(data).map((cell) => <Text>{cell}: {data[cell] != null && data[cell].toString()}</Text>)}
      </View>
    );
  }
}
