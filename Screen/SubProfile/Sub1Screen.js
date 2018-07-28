import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import Map from '../../components/Map'
import TextBlock from '../../components/TextBlock'


export default class Sub1Screen extends Component {
  static navigationOptions = {
    title: 'Sub1'
  }
  constructor(props) {
    super(props)

    this.state = {
      carStatus: 'รถไม่เคลื่อนที่',
      kidStatus: 'เด็กไม่อยู่ในรถ',
      lat: 99.99, //8.637796473
      lng: 99.99, //99.89862454
      temp: 99.99
    }

  }

  render() {
    const { navigate } = this.props.navigation
    const { navigation } = this.props;
    const btAddr = navigation.getParam('btAddr', 'none bluetooth id');

    let carStatusColor = ''
    if(this.state.carStatus === 'รถไม่เคลื่อนที่') {
      carStatusColor = '#5cb85c'
    }else if(carStatus === 'รถกำลังเคลื่อนที่'){
      carStatusColor = '#d9534f'
    }
    
    console.log('data :', btAddr)
    return (
      <LinearGradient 
        start={[0.5,0]}
        end={[0.5,1]}
        colors={['#E30072', '#AD0EB2', '#5800F0']}
        style={styles.container}>

        <View style={styles.fieldText}>
          <Text style={[styles.textInField, {backgroundColor: carStatusColor}]}>สถานะ: {this.state.carStatus}</Text>
        </View>

        <Map 
          lat={this.state.lat}
          lng={this.state.lng}
          title="Title"
          des="Description"
        />

        <TextBlock text={'สถานะ: '+this.state.carStatus} />
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