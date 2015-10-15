import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Defaults, Spacing, Colors} from '../styles';
import {resolve} from '../utilities/proptypes';
import CodeBlock from './CodeBlock';

const {
  View,
  Text,
  PropTypes,
  ListView,
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

    let dataSource = new ListView.DataSource({
      rowHasChanged(r1, r2) { return r1 !== r2; },
    });

    this.state = {dataSource};
  }

  renderSeparator() {
    return <View style={{borderBottomWidth: Defaults.BORDER_WIDTH, borderBottomColor: Defaults.BORDER_COLOR, marginLeft: Spacing.DEFAULT, marginRight: Spacing.DEFAULT}} />;
  }

  renderRow(propType) {
    return <PropTypeRow propType={propType} />;
  }

  renderHeader() {
    let {children} = this.props;

    return (
      <View style={{padding: Spacing.DEFAULT}}>
        {children}
        <CodeBlock component={children} />
      </View>
    );
  }

  renderSectionHeader() {
    return (
      <View style={{padding: Spacing.HALVED / 2, paddingLeft: Spacing.DEFAULT, paddingRight: Spacing.DEFAULT, backgroundColor: Colors.GRAY_LIGHT}}>
        <Text>Properties</Text>
      </View>
    );
  }

  renderFooter() {
    return (
      <View style={{borderBottomWidth: Defaults.BORDER_WIDTH, borderBottomColor: Defaults.BORDER_COLOR, marginTop: -1}} />
    );
  }

  render() {
    let {Component} = this.props;
    let data = convertPropTypesToData(Component);

    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(data)}
        renderHeader={::this.renderHeader}
        renderSeparator={this.renderSeparator}
        renderSectionHeader={this.renderSectionHeader.bind()}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
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

class PropTypeRow extends React.Component {
  render() {
    let {propType} = this.props;

    return (
      <View style={{padding: Spacing.DEFAULT, paddingBottom: Spacing.HALVED, paddingTop: Spacing.HALVED}}>
        {Object.keys(propType).map((detail) => <Text>{detail}: {propType[detail] != null && propType[detail].toString()}</Text>)}
      </View>
    );
  }
}
