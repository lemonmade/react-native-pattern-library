import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Spacing} from '../styles';
import {resolve} from '../utilities/proptypes';
import List from './List';
import CodeBlock from './CodeBlock';

const {
  View,
  Text,
  PropTypes,
} = React;

let styles = Stylish.create({});

@Stylish.connect(styles)
export default class Demo extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    Component: PropTypes.instanceOf(React.Component).isRequired,
  }

  constructor(props) {
    super(props);

    let dataSource = new List.DataSource({
      rowHasChanged(r1, r2) { return r1 !== r2; },
    });

    this.state = {dataSource};
  }

  renderRow(propType, section, row, highlight) {
    return (
      <List.Cell
        row={row}
        section={section}
        highlight={highlight}
      >
        {Object.keys(propType).map((detail) => <Text>{detail}: {propType[detail] != null && propType[detail].toString()}</Text>)}
      </List.Cell>
    );
  }

  renderHeader() {
    let {children} = this.props;

    return (
      <View style={{padding: Spacing.DEFAULT}}>
        <View style={{marginBottom: Spacing.DEFAULT}}>
          {children}
        </View>

        <CodeBlock component={children} />
      </View>
    );
  }

  renderSectionHeader() {
    return <List.Header>Properties</List.Header>;
  }

  render() {
    let {Component} = this.props;
    let data = convertPropTypesToData(Component);

    return (
      <List
        dataSource={this.state.dataSource.cloneWithRows(data)}
        renderHeader={::this.renderHeader}
        renderSectionHeader={this.renderSectionHeader}
        renderRow={this.renderRow}
      />
    );
  }
}

function convertPropTypesToData(Component) {
  let {propTypes = {}, defaultProps = {}} = Component;
  return Object.keys(propTypes).map((propType) => {
    return {
      prop: propType,
      ...resolve(propTypes[propType]),
      default: defaultProps[propType],
    };
  });
}
