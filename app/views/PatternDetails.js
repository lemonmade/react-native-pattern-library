import React from 'react-native';
import Stylish from 'react-stylish/native';
import * as Redux from 'react-redux/native';
import {bindActionCreators} from 'redux';

import PropDetails from './PropDetails';
import {List, CodeBlock, Banner} from '../components';
import {Spacing, Colors} from '../styles';
import {resolve} from '../utilities/proptypes';
import * as actionCreators from '../store/actions';

const {
  View,
  PropTypes,
} = React;

let styles = Stylish.create({});

function stateToProps(state) {
  return {props: state.editor};
}

function actionsToProps(dispatch) {
  return {actions: bindActionCreators(actionCreators, dispatch)};
}

@Redux.connect(stateToProps, actionsToProps)
@Stylish.connect(styles)
export default class PatternDetails extends React.Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    Component: PropTypes.func.isRequired,
    defaultProps: PropTypes.object,
    props: PropTypes.object,
  };

  static defaultProps = {
    defaultProps: {},
    props: {},
  };

  constructor(props) {
    super(props);

    let dataSource = new List.DataSource({
      rowHasChanged(r1, r2) { return r1 !== r2; },
    });

    this.state = {dataSource};
  }

  componentWillMount() {
    let {actions} = this.props;
    actions.defaultProps(this.props.defaultProps);
  }

  renderRow(prop, section, row, highlight) {
    let {props, actions} = this.props;
    let storedValue = props[prop.name];
    let value = storedValue == null ? prop.default : storedValue;

    return (
      <List.Cell
        row={row}
        section={section}
        highlight={highlight}
      >
        <PropDetails
          prop={prop}
          onChange={actions.updateProp}
          value={value}
        />
      </List.Cell>
    );
  }

  renderHeader() {
    let {Component, props} = this.props;

    try {
      let rendered = React.createElement(Component, props);

      return (
        <View style={{padding: Spacing.DEFAULT, backgroundColor: Colors.WHITE}}>
          <View style={{marginBottom: Spacing.DEFAULT}}>
            {rendered}
          </View>

          <CodeBlock component={rendered} />
        </View>
      );
    } catch (error) {
      return <Banner error>There was an error while rendering: {error}</Banner>
    }
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
        renderRow={::this.renderRow}
      />
    );
  }
}

function convertPropTypesToData(Component) {
  let {propTypes = {}, defaultProps = {}} = Component;
  return Object.keys(propTypes).map((propType) => {
    return {
      name: propType,
      default: defaultProps[propType],
      ...resolve(propTypes[propType]),
    };
  });
}
