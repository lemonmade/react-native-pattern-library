import React from 'react-native';

import Border from './Border';
import Header from './Header';
import Cell from './Cell';

import ScrollView from '../ScrollView';

const {
  ListView,
} = React;

export default class List extends ListView {
  static defaultProps = {
    ...ListView.defaultProps,
    renderScrollComponent,
    renderSeparator,
    renderFooter,
  };

  static Cell = Cell;
  static Header = Header;
  static Border = Border;
}

function renderScrollComponent(props) {
  return <ScrollView {...props} />;
}

function renderSeparator(section, row, adjacentRowHighlighted) {
  return <Border hidden={adjacentRowHighlighted} />;
}

function renderFooter() {
  return <Border full nudge />;
}
