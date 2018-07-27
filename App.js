import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'

import HomeScreen from './Screen/HomeScreen'
import LoginScreen from './Screen/LoginScreen'
import ProfileScreen from './Screen/ProfileScreen'

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen, },
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen }
  }, {
    index: 0,
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
});


export default class App extends Component {
  render() {
    return (
      <NavigationApp />
    )
  }
}