import React from 'react-native';
import Stylish from 'react-stylish/native';

import {inject} from './utilities/proptypes';
inject();

import {Colors} from './styles';
import {BarButton} from './components';
import PatternList from './views/PatternList';

import {Button} from './documented';

const {
  AppRegistry,
  Component,
  Navigator,
  Text,
  View,
  StatusBarIOS,
} = React;

let components = [
  {Component: Button, props: {children: 'Hello!'}},
];

const {NavigationBar} = Navigator;

let styles = Stylish.create({
  navigatorScene: {
    position: 'absolute',
    left: 0,
    top: NavigationBar.Styles.General.TotalNavHeight,
    right: 0,
    bottom: 0,
  },

  navigationBar: {backgroundColor: Colors.BLACK},

  navigationBarContainer: {
    height: NavigationBar.Styles.General.NavBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navigationBarText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

let RouteMapper = {
  Title({title = 'Pattern Library'}) {
    return (
      <View style={styles.navigationBarContainer}>
        <Text style={styles.navigationBarText}>{title}</Text>
      </View>
    );
  },

  LeftButton(route, navigator, index) {
    if (!index) { return null; }

    return <BarButton action={::navigator.pop} />;
  },

  RightButton() {},
};

class PatternLibrary extends Component {
  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  }

  renderScene(scene, navigator) {
    return (
      <scene.component navigator={navigator} {...scene.props} />
    );
  }

  render() {
    return (
      <Navigator
        ref="nav"
        navigationBar={
          <NavigationBar
            routeMapper={RouteMapper}
            style={styles.navigationBar}
          />
        }
        sceneStyle={styles.navigatorScene}
        initialRoute={{
          component: PatternList,
          title: 'Pattern Library',
          props: {components},
        }}
        renderScene={::this.renderScene}
      />
    );
  }
}

AppRegistry.registerComponent('PatternLibrary', () => PatternLibrary);
