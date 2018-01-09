import React from "react";
import { View, Image } from "react-native";
import { Card, Button, FormLabel, FormInput, SocialIcon } from "react-native-elements";
import { onSignIn } from "../auth";

export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
    <Card
      image = {require('../../assets/san_francisco.jpg')}>
      
      <SocialIcon
        title='Sign In With Facebook'
        button
        type='facebook'
        onPress={() => {
          onSignIn().then(() => navigation.navigate("SignedIn"));
        }}
      />
      
      <SocialIcon
        title='Sign In With Goole'
        button
        type='google-plus-official'
        onPress={() => {
          onSignIn().then(() => navigation.navigate("SignedIn"));
        }}
        raised={true}
      />
    </Card>
  </View>
);
