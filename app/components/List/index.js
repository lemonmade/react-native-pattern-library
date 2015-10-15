import React from 'react-native';

import Border from './Border';
import Header from './Header';
import Cell from './Cell';

const {
  ListView,
} = React;

export default class List extends ListView {
  static defaultProps = {
    ...ListView.defaultProps,
    renderSectionHeader,
    renderSeparator,
    renderFooter,
  };

  static Cell = Cell;
  static Header = Header;
  static Border = Border;
}

function renderSectionHeader(section) {
  return <Header>{section}</Header>;
}

function renderFooter() {
  return <Border full nudge />;
}

function renderSeparator(section, row, adjacentRowHighlighted) {
  return <Border hidden={adjacentRowHighlighted} />;
}
