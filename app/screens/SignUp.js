import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TextInput } from "react-native";
import { Card, Button, FormLabel, FormInput, SocialIcon, FormValidationMessage } from "react-native-elements";
import { onSignIn } from "../auth";

export default class SignUp extends React.Component {
  //export default ({ navigation }) => (
  
  render(){
    const { navigation } = this.props;
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            style={{
              flex: 1,
              
            }}
            source={require('../../assets/login-background.jpg')}
          />
        </View>

        <Text style={styles.title}>
          ZenParkin
        </Text>
        <Text style={styles.description}>
          Your neighbourhood parking finder
        </Text>
        <Image
          style={styles.image}
          source={require('../../assets/zenparkin_logo.png')}
        />

        <View style={styles.sociallogin}>
          <SocialIcon
            style={styles.socialicon}
            title='Facebook Login'
            button
            type='facebook'
            onPress={() => {
              onSignIn().then(() => navigation.navigate("SignedIn"));
            }}
          />
          <SocialIcon
            style={styles.socialicon}
            title='Google Login'
            button
            type='google-plus-official'
            onPress={() => {
              onSignIn().then(() => navigation.navigate("SignedIn"));
            }}
            raised={true}
          />
        </View>

        <View style={styles.otpbox}>
          <FormInput
            containerStyle={{ flex: 1, borderColor: 'gray' }}
            inputStyle={{ color: 'white', fontStyle: 'italic', fontSize: 18 }}
            value={'+1(805)895-2882'}
          />
          <Button
            backgroundColor="#03A9F4"
            title="OTP Login"
            onPress={() => {
              onSignIn().then(() => navigation.navigate("SignedIn"));
            }}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 100,
    marginBottom: 25,
    color: 'black',
    backgroundColor: 'transparent'
  },
  description: {
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 50,
    color: 'black',
    backgroundColor: 'transparent'
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'cover',
    marginBottom: 50 
  },
  otpbox: {
    flexDirection: 'row', 
    alignItems: 'flex-start',
    marginBottom: 200,
    marginTop: 100,
  },
  otpboxlabel: {
    backgroundColor: 'transparent'
  },
  formbutton: {
    
    
  },
  sociallogin: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 0
  },
  socialicon: {
    height: 50,
    width:150,
  },
  
})
