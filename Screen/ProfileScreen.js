import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import Logocyh from '../components/Logocyh'
import BtnNormal from '../components/BtnNormal'
import BtnFull from '../components/BtnFull'

export default class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile'
  }
  constructor(props) {
    super(props)

  }

  hello() {
    Alert.alert('Hello')
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

        <Logocyh />

         <BtnNormal
            btnText="สถานะนักเรียน" 
            Method={this.hello}
            />

         <BtnNormal
            btnText="ข้อมูลนักเรียน" 
            Method={this.hello}
            />

         <BtnNormal
            btnText="ติดต่อคนขับรถ" 
            Method={this.hello}
            />

         <BtnFull
            btnText="ติดต่อขอความช่วยเหลือ" 
            Method={this.hello}
            />


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