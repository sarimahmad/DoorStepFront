/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  BackHandler,
  Text,
  StatusBar,
  StyleSheet,
} from 'react-native';
import 'react-native-gesture-handler';
import HomeNavigation from './App/Navigations/homeNavigation';
import {Provider} from 'react-redux';
import store from './App/redux/store';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: true,
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    return true;
  }
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({isReady: true});
  }
  render() {
    return this.state.isReady ? (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar hidden={true} />

          <HomeNavigation />
        </View>
      </Provider>
    ) : (
      <View
        style={{
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={'#000000'} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
