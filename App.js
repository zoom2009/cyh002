import React, { Component } from 'react';
import * as firebase from 'firebase';
import { View, Text, StyleSheet, TextInput, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements'

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

  SignIn() {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(result => {
      console.log(result)
    })
    .catch(e => {
      console.log(e)
    })
  }

  SignUp() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(result => {
      console.log(result)
    })
    .catch(e => {
      console.log(e)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>CYH</Text>

        <View style={styles.inputPlace}>
          
          <View style={styles.inputPanel}>
            <Icon
              style={styles.inputIcon}
              size={42}
              name='email-outline'
              type='material-community'
              />
            <TextInput style={styles.input} 
              onChangeText={(text)=>{this.setState({
                email: text
              })}}
              underlineColorAndroid="rgba(0,0,0,0)" 
              placeholder="Email" 
              />
          </View>

           <View style={styles.inputPanel}>
            <Icon
              style={styles.inputIcon}
              size={42}
              name='lock-outline'
              type='material-community'
              />
            <TextInput style={styles.input} 
              onChangeText={(text)=>{this.setState({
                password: text
              })}}
              underlineColorAndroid="rgba(0,0,0,0)" 
              placeholder="Password"
              secureTextEntry={true}
              />
          </View>

          <TouchableHighlight 
            onPress={this.SignIn.bind(this)}
            underlayColor = "#ccc"
            style={styles.touch}
            >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight 
            onPress={this.SignUp.bind(this)}
            underlayColor = "#fff"
            style={styles.touch}>
            <View style={styles.buttonOutline}>
              <Text style={styles.buttonTextOutline}>Sign Up</Text>
            </View>
          </TouchableHighlight>

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
    fontSize: 40, 
    fontWeight: 'bold', 
    color: '#fff',
    paddingVertical: 25
  },
  input: {
    width: '80%',
    textAlign: 'left',
    fontSize: 24,
    color: '#fff',
    paddingLeft: 14
  },
  inputIcon: {
    width: '20%',
    alignSelf: 'center'
  },
  inputPanel: {
    flexDirection: 'row', 
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 10,
    backgroundColor: 'rgba(33,33,33,0.8)',
    borderRadius: 14
  },
  inputPlace: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  button: {
    borderRadius: 14,
    paddingVertical: 8,
    marginVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: '100%',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center'
  },
  buttonOutline: {
    borderRadius: 14,
    paddingVertical: 8,
    marginVertical: 8,
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
  },
  buttonTextOutline: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#fff',
    textAlign: 'center'
  },
  touch: {
    borderRadius: 14,
    width: '75%', 
    justifyContent: 'center', 
    alignItems: 'center'
   
  }
});