import React, { Component } from 'react';
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";

export default class Profile extends React.Component {
  //export default ({ navigation }) => (
  render(){
    const { navigation } = this.props;
    console.log("Navigation = ", navigation);
    return(
      <View style={{ paddingVertical: 20 }}>
        <Card title="Amrita Srivastava">
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>AS</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
          />
        </Card>
      </View>
    );
  }
}

