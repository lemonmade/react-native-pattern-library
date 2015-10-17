import React from 'react-native';
import Stylish from 'react-stylish/native';

import PatternDetails from './PatternDetails';
import {List, Type} from '../components';

const {
  PropTypes,
  Navigator,
} = React;

let styles = Stylish.create({});

@Stylish.connect(styles)
export default class PatternList extends React.Component {
  static propTypes = {
    components: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigator: PropTypes.instanceOf(Navigator),
  }

  constructor(props) {
    super(props);

    let dataSource = new List.DataSource({
      rowHasChanged(r1, r2) { return r1 !== r2; },
    });

    this.state = {dataSource};
  }

  renderRow(component, section, row, highlight) {
    let {navigator} = this.props;
    let title = component.title || component.Component.displayName;

    return (
      <List.Cell
        row={row}
        section={section}
        highlight={highlight}
        action={() => navigator.push({
          component: PatternDetails,
          title,
          props: {
            defaultProps: component.props,
            Component: component.Component,
          },
        })}
      >
        <Type.Paragraph>{title}</Type.Paragraph>
      </List.Cell>
    );
  }

  render() {
    let {components} = this.props;

    return (
      <List
        dataSource={this.state.dataSource.cloneWithRows(components)}
        renderRow={::this.renderRow}
      />
    );
  }
}
