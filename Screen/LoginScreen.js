import React, { Component } from 'react';
import * as firebase from 'firebase';
import { View, StyleSheet, Alert, Image } from 'react-native';

import  BtnFull  from '../components/BtnFull'
import  BtnTransparent  from '../components/BtnTransparent'
import  Input  from '../components/Input'
import  Title  from '../components/Title'

import { LinearGradient } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import Logocyh from '../components/Logocyh';

var config = {
  apiKey: "AIzaSyBevRQtoQ6xc8qJ0EBImxZeCNB684IxBno",
  authDomain: "cyhfirebase.firebaseapp.com",
  databaseURL: "https://cyhfirebase.firebaseio.com",
  projectId: "cyhfirebase",
  storageBucket: "cyhfirebase.appspot.com",
  messagingSenderId: "333181013082"
};

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  }
  constructor(props) {
    super(props);

    this.state = {
      waitLogin: false
    }

    firebase.initializeApp(config);

    this.state = {
      email: '',
      password: ''
    }
  }

  SetEmailVal(val) {
    this.setState({
      email: val
    })
  }

  SetPasswordVal(val) {
    this.setState({
      password: val
    })
  }

  StopWait() {
    this.setState({
      waitLogin: false
    })
  }


  SignIn() {
    this.setState({waitLogin: true})
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(result => {
      //console.log('Sign In Successful')
      //Alert.alert('Sign In Successful')
      const { navigate } = this.props.navigation

      stopWait = () => {
        this.setState({
          waitLogin: false
        })
      }

      var database = firebase.database();
        database.ref('users/'+result.user.uid).once('value').then(function(snapshot){
            console.log(snapshot.val().btAddr)
            //is logined
            stopWait()
            navigate('Profile', { btAddr: snapshot.val().btAddr })
        })
      
    })
    .catch(e => {
      //fail to login
      this.setState({waitLogin: false})
      Alert.alert(e.message)
    })
  }
/*
  SignUp() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(result => {
      let usersRef = firebase.database().ref().child("users")
      usersRef.child(result.user.uid).set({
        id: result.user.uid,
        email: this.state.email,
        btAddr: ''
      })
      //console.log(result.user.uid)
      Alert.alert('Sign Up Successful')
    })
    .catch(e => {
      //console.log(e.message)
      Alert.alert(e.message)
    })
  }
  */

  render() {
    const { navigate } = this.props.navigation
    return (
      <LinearGradient 
        start={[0.5,0]}
        end={[0.5,1]}
        colors={['#E30072', '#AD0EB2', '#5800F0']}
        style={styles.container}>

        <Spinner 
          cancelable={true}
          visible={this.state.waitLogin} 
          textContent={"Loading..."} 
          overlayColor='rgba(0,0,0,0.25)'
          textStyle={{color: '#FFF'}} />
      
        <Logocyh />
        {/* <Title text="CYH" />*/} 
        
        <View style={styles.inputPlace}>
          
          <Input 
            name='email-outline'
            type='material-community'
            size={42}
            textChange={this.SetEmailVal.bind(this)}
            holder='Email'
            isPassword={false}
            />

          <Input 
            name='lock-outline'
            type='material-community'
            size={42}
            textChange={this.SetPasswordVal.bind(this)}
            holder='Password'
            isPassword={true}
            />

          <BtnFull
            btnText="Sign In" 
            Method={this.SignIn.bind(this)}
            />

          {/*
          <BtnTransparent 
            btnText="Sign Up"
            signUpMethod={this.SignUp.bind(this)}
            />
          */} 
          
        </View>
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
  inputPlace: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  
});