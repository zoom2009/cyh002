import React, { Component } from 'react';
import * as firebase from 'firebase';
import { View, Text, StyleSheet, Alert } from 'react-native';

import  BtnFull  from './components/BtnFull'
import  BtnTransparent  from './components/BtnTransparent'
import  Input  from './components/Input'

var config = {
  apiKey: "AIzaSyBevRQtoQ6xc8qJ0EBImxZeCNB684IxBno",
  authDomain: "cyhfirebase.firebaseapp.com",
  databaseURL: "https://cyhfirebase.firebaseio.com",
  projectId: "cyhfirebase",
  storageBucket: "cyhfirebase.appspot.com",
  messagingSenderId: "333181013082"
};

export default class App extends Component {
  constructor(props) {
    super(props);

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

  SignIn() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(result => {
      //console.log('Sign In Successful')
      Alert.alert('Sign In Successful')
    })
    .catch(e => {
      //console.log(e.message)
      Alert.alert(e.message)
    })
  }

  SignUp() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(result => {
      //console.log('Sign Up Successful')
      Alert.alert('Sign Up Successful')
    })
    .catch(e => {
      //console.log(e.message)
      Alert.alert(e.message)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CYH</Text>

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
            signInMethod={this.SignIn.bind(this)}
              />

          <BtnTransparent 
            btnText="Sign Up"
            signUpMethod={this.SignUp.bind(this)}
            />
          
        </View>
      </View>
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
  title: {
    fontSize: 50, 
    fontWeight: 'bold', 
    color: '#fff',
    paddingVertical: 25
  },
  inputPlace: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  
});