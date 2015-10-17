import React from 'react-native';
import Stylish from 'react-stylish/native';
import {Provider} from 'react-redux/native';

import {inject} from './utilities/proptypes';
inject();

import store from './store';

import {Colors} from './styles';
import {BarButton, Chooser, Toggle, Field, Banner, Badge} from './components';
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

    return <BarButton action={navigator.pop} />;
  },

  RightButton() {},
};

class App extends Component {
  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
  }

  renderScene(scene, navigator) {
    return (
      <scene.component navigator={navigator} {...scene.props} />
    );
  }

  render() {
    let components = [
      {Component: Button, props: {children: 'Hello!'}},
      {Component: Chooser, props: {options: ['Hello', 'Goodbye']}},
      {Component: Toggle},
      {Component: Field, props: {value: 'Text'}},
      {Component: Banner, props: {children: 'This is a banner.'}},
      {Component: Badge, props: {children: 'Sweet'}},
    ].sort((component1, component2) => component1.Component.displayName.localeCompare(component2.Component.displayName));

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
        renderScene={this.renderScene}
      />
    );
  }
}

class PatternLibrary extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}

AppRegistry.registerComponent('PatternLibrary', () => PatternLibrary);
