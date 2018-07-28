import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import Map from '../../components/Map'

export default class Sub1Screen extends Component {
  static navigationOptions = {
    title: 'Sub1'
  }
  constructor(props) {
    super(props)

  }

  render() {
    const { navigate } = this.props.navigation
    const { navigation } = this.props;
    const btAddr = navigation.getParam('btAddr', 'none bluetooth id');
    console.log('data :', btAddr)
    return (
      <LinearGradient 
        start={[0.5,0]}
        end={[0.5,1]}
        colors={['#E30072', '#AD0EB2', '#5800F0']}
        style={styles.container}>

        <Map 
          lat={8.637796473}
          lng={99.89862454}
          title="Title"
          des="Description"
        />

      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(210, 37, 37, 0.74)',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
});