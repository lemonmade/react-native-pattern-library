import React from 'react-native';
import Stylish from 'react-stylish/native';

import PropDetails from './PropDetails';
import {List, CodeBlock} from '../components';
import {Spacing, Colors} from '../styles';
import {resolve} from '../utilities/proptypes';

const {
  View,
  PropTypes,
} = React;

let styles = Stylish.create({});

@Stylish.connect(styles)
export default class PatternDetails extends React.Component {
  static propTypes = {
    Component: PropTypes.instanceOf(React.Component).isRequired,
    props: PropTypes.object,
  };

  static defaultProps = {
    props: {},
  };

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
        <PropDetails prop={propType} />
      </List.Cell>
    );
  }

  renderHeader() {
    let {Component, props} = this.props;
    let rendered = React.createElement(Component, props);

    return (
      <View style={{padding: Spacing.DEFAULT, backgroundColor: Colors.WHITE}}>
        <View style={{marginBottom: Spacing.DEFAULT}}>
          {rendered}
        </View>

        <CodeBlock component={rendered} />
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
