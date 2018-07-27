import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'

import HomeScreen from './Screen/HomeScreen'
import LoginScreen from './Screen/LoginScreen'
import ProfileScreen from './Screen/ProfileScreen'

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen }
  }, {
    navigationOptions: {
      headerStyle: {
        
      }
    }
});

export default class App extends Component {
  render() {
    return (
      <NavigationApp />
    )
  }
}