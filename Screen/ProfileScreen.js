import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile'
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
        start={[0,0]}
        end={[1,1]}
        colors={['#ED7EC4', '#ED7EC4', '#735CE6']}
        style={styles.container}>
        
        <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000', textAlign: 'center'}}>ระบบติดตามตำแหน่งเด็กนักเรียน</Text>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000', textAlign: 'center'}}>อนุบาลในรถโรงเรียน</Text>


      </LinearGradient>
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
});