import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import Logocyh from '../components/Logocyh'
import BtnNormal from '../components/BtnNormal'
import BtnFull from '../components/BtnFull'

import { inject, observer } from 'mobx-react'

import SocketIOClient from 'socket.io-client';

class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile'
  }
  constructor(props) {
    super(props)

    var { CarState } = this.props

    //======================= Socket.io ===========================

    this.socket = SocketIOClient('https://kiddatabase.herokuapp.com/');  

    this.socket.on('alert', (mac_address) => {
      if(CarState.mac_address == mac_address) {
        Alert.alert('ฉุกเฉิน! ลูกของคุณกำลังติดอยู่ในรถ')
      }
    })

    this.socket.on('finish school', (mac_address) => {
      if(CarState.mac_address == mac_address) {
        Alert.alert('ลูกของคุณเดินทางถึง โรงเรียนแล้ว')
      }
    })

    this.socket.on('finish home', (mac_address) => {
      if(CarState.mac_address == mac_address) {
        Alert.alert('ลูกของคุณเดินทางถึง บ้านแล้ว')
      }
    })

    //=============================================================

    var CheckConnect

    this.socket.on('carPost', (data) => {
      if(this.isHaveMacAddr(data.watch, CarState.mac_address)) {
        clearTimeout(CheckConnect);
        console.log('is found ', CarState.mac_address)
        console.log(data)
        
        data = {
          date: data.date,
          time: data.time,
          carID: data.id,
          lat: data.lat,
          lng: data.lng,
          temp: data.temp,
          carStatus: 'รถกำลังเคลื่อนที่',
          kidStatus: 'เด็กอยู่ในรถ'
        }
        CarState.setCarState(data)

        CheckConnect = setTimeout(() => {
          data = {
            date: '',
            time: '',
            carID: '',
            lat: 99.99,
            lng: 99.99,
            temp: 99.99,
            carStatus: 'ไม่พบสัญญาณ',
            kidStatus: 'ไม่พบสัญญาณ',
            carStatusColor: '#000',
            carStatusColor: '#d9534f'
          }
          Alert.alert('ไม่พบสัญญาณ')
          CarState.setCarState(data)
        }, 30000)
      }else {
        console.log('not found this addr:', CarState.mac_address)
        console.log("data is", data)
      }
    })  
  }

  isHaveMacAddr (data, macAddr) {
    for(let i=0;i<data.length;i++) {
      if(data[i].mac_address == macAddr) {
        return true
      }
    }
    return false
  }

  moveTo(target, data) {
    const { navigate } = this.props.navigation
    navigate(target, data)
  }

  render() {
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
          Method={() => {
            this.moveTo('Sub1', {btAddr})
          }}
          />

        <BtnNormal
          btnText="ข้อมูลนักเรียน" 
          Method={() => {
            this.moveTo('Sub2', {btAddr})
          }}
          />

        <BtnNormal
          btnText="ติดต่อคนขับรถ" 
          Method={() => {
            this.moveTo('Sub3', {btAddr})
          }}
          />

        <BtnFull
          btnText="ติดต่อขอความช่วยเหลือ" 
          Method={() => {
            this.moveTo('Sub4', {btAddr})
          }}
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

export default inject('CarState')(observer(ProfileScreen))