import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Expo from 'expo'

import HomeScreen from './Screen/HomeScreen'


const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
  }, {
    navigationOptions: {
      headerStyle: {
        
      }
    }
});

export default class App extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <NavigationApp />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: 'rgba(210, 37, 37, 0.74)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputPlace: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  
});