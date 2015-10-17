import React from 'react-native';
import Stylish from 'react-stylish/native';

import {Colors} from '../styles';

let styles = Stylish.create({
  listView: {backgroundColor: Colors.GRAY_LIGHTER},
});

class ScrollView extends React.ScrollView {}

Object.keys(ScrollView).forEach((key) => {
  Object.defineProperty(ScrollView, key, Object.getOwnPropertyDescriptor(React.ScrollView, key));
});

ScrollView.defaultProps = {
  ...React.ScrollView.defaultProps,
  style: styles.listView,
  automaticallyAdjustContentInsets: false,
  contentInset: {bottom: 400},
};

export default ScrollView;
