import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo';
import Map from '../../components/Map'
import TextBlock from '../../components/TextBlock'
import BtnBottom from '../../components/BtnBottom'


import SocketIOClient from 'socket.io-client';

var distance = require('gps-distance')


export default class Sub1Screen extends Component {
  static navigationOptions = {
    title: 'Sub1'
  }
  constructor(props) {
    super(props)

    this.state = {
      date: '',
      time: '',
      carID: '',
      carSt: 'รถไม่เคลื่อนที่',
      kidStatus: 'เด็กไม่อยู่ในรถ',
      lat: 99.99, //8.637796473
      lng: 99.99, //99.89862454
      temp: 99.99
    }

    this.socket = SocketIOClient('https://kiddatabase.herokuapp.com/');

    var CheckConnect

    this.socket.on('carPost', (data) => {
      const { navigation } = this.props;
      const btAddr = navigation.getParam('btAddr', 'none bluetooth id');

      if(this.isHaveMacAddr(data.watch, btAddr)) {
        clearTimeout(CheckConnect);
        console.log('is found ', btAddr)
        console.log(data)
        this.setState({
          date: data.date,
          time: data.time,
          carID: data.id,
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lng),
          temp: data.temp,
          carSt: 'รถกำลังเคลื่อนที่',
          kidStatus: 'เด็กอยู่ในรถ',
        })
        CheckConnect = setTimeout(() => {
          this.setState({
            date: '',
            time: '',
            carID: '',
            carSt: 'รถไม่เคลื่อนที่',
            kidStatus: 'เด็กไม่อยู่ในรถ',
            lat: 99.99, //8.637796473
            lng: 99.99, //99.89862454
            temp: 99.99
          })
        }, 30000)
      }else {
        console.log('not found this addr:', btAddr)
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

  
  render() {
    const { navigate } = this.props.navigation
    const { navigation } = this.props;
    const btAddr = navigation.getParam('btAddr', 'none bluetooth id');

    let carStatusColor = ''
    if(this.state.carSt === 'รถไม่เคลื่อนที่') {
      carStatusColor = '#d9534f'
    }else if(this.state.carSt === 'รถกำลังเคลื่อนที่'){ 
      carStatusColor = '#5cb85c'
    }
    
    //console.log('data :', btAddr)
    return (
      <LinearGradient 
        start={[0.5,0]}
        end={[0.5,1]}
        colors={['#E30072', '#AD0EB2', '#5800F0']}
        style={styles.container}>

        <View style={styles.fieldText}>
          <Text style={[styles.textInField, {backgroundColor: carStatusColor}]}>สถานะ: {this.state.carSt}</Text>
        </View>

        <Map 
          lat={this.state.lat}
          lng={this.state.lng}
          title="Title"
          des="Description"
        />

        <TextBlock text={'สถานะ: '+this.state.kidStatus} />
        <TextBlock text={'อุณหภูมิ: '+this.state.temp+' องศา'} />

        <BtnBottom 
          Method={()=>{
            this.socket.removeAllListeners("carPost");
            navigate('Profile')
          }}
          text='ย้อนกลับ'
          />

      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },
  fieldText: {
    width: '100%', 
    paddingVertical: 4, 
    paddingHorizontal: 8, 
    alignItems: 'flex-end'
  },
  textInField: {
    marginHorizontal: 20, 
    borderRadius: 8, 
    borderColor: '#27ae60', 
    borderWidth: 2,  
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    textAlign: 'center', 
    fontSize: 24,
    color: '#fff', 
    backgroundColor: '#d9534f'
  },
});