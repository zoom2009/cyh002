import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import Map from '../../components/Map'
import TextBlock from '../../components/TextBlock'

var distance = require('gps-distance')


export default class Sub1Screen extends Component {
  static navigationOptions = {
    title: 'Sub1'
  }
  constructor(props) {
    super(props)

    this.state = {
      timeCount: 0,
      carSt: 'รถไม่เคลื่อนที่',
      kidStatus: 'เด็กไม่อยู่ในรถ',
      curDistance: 0,
      lat: 99.99, //8.637796473
      lng: 99.99, //99.89862454
      temp: 99.99
    }

    setInterval(() => {
      this.getData()
    }, 10000)

  }

  

  getData() {
    let { navigation } = this.props;
    let oldData = {
      lat: this.state.lat,
      lng: this.state.lng,
    }
    let btAddr = navigation.getParam('btAddr', 'none bluetooth id');

    timeUp = () => {
      console.log('timeUp')
      this.setState((old) => {
        return {timeCount: old.timeCount+1}
      })
      if(this.state.timeCount >= 30) {
        //not move
        this.setState({
          carSt: 'รถไม่เคลื่อนที่',
        })
      }
    }

    resetTime = () => {
      console.log('resetTime')
      this.setState({
        timeCount: 0,
        carSt: 'รถกำลังเคลื่อนที่'
      })
    }

    setVal = (data) => {
      console.log('setVal')
      this.setState({
        lat: data.lat,
        lng: data.lng,
        temp: data.temp,

      })
    }

    fetch('https://kiddatabase.herokuapp.com/watch/'+btAddr+'/getlast', {
         method: 'GET',
         headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'who': 'parent',
          'secret_key': 'cyhggt'
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if(responseJson) {
          let d = distance(oldData.lat, oldData.lng, responseJson.lat, responseJson.lng)
          setVal(responseJson)
          if(d<=20) {
            timeUp()
          }else {
            resetTime()    
          }
        }
      })
      .catch((error) => {
         console.error(error);
      });
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
    
    console.log('data :', btAddr)
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