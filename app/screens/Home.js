import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text,
  TextInput, 
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import { Card, Button } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from "react-native-modal";

let id = 0;
let ide = 0;

export default class Home extends React.Component {

  constructor(props) {
    console.log("Inside Constructor");
    super(props);

    this.state = {
      mapRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      },
      visibleModal: null,
      markers: [
        {
          "coordinate": 
          {
            "latitude": 37.78200029999999,
            "longitude": -122.4467964,
          },
          "key": id++,
          "title": "Amrita"
        },
      ],
      events: [],
    };
    this._renderMarker = this._renderMarker.bind(this);
    this._renderCallout = this._renderCallout.bind(this);
  };

  makeEvent(e, name) {
    return {
      id: ide++,
      name,
      data: e.nativeEvent ? e.nativeEvent : e,
    };
  }

  recordEvent(name) {
    return e => {
      this.setState(prevState => ({
        events: [
          this.makeEvent(e, name),
          ...prevState.events.slice(0, 10),
        ],
      }));
    };
  }

  _renderMarker(){
    return(
      this.state.markers.map(marker => (
        <MapView.Marker
          key={marker.key}
          coordinate={marker.coordinate}
        />
        
      )
      
    )
    );
  };
  
  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    
    return(
    <MapView
      style={styles.modal}
      region={this.state.mapRegion}
      provider={MapView.PROVIDER_GOOGLE}
      onRegionChange={this._handleMapRegionChange}
    >
      <View>
        {this._renderButton('Search for Free Parking Spot', () => this.setState({ visibleModal: 1 }))}
        <Modal isVisible={this.state.visibleModal === 1}>{this._renderModalContent()}</Modal>
        {this._renderMarker()}
        {this._renderCallout()}
      </View>
    </MapView>
    );
  }

  _renderCallout() {
    console.log("Inside Callout");
    return (
      <MapView.Callout
        >
        <Text>Amrita</Text>
      </MapView.Callout>
    )
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.modal}>
      <GooglePlacesAutocomplete
        placeholder='Search for Free Parking Spot'
        minLength={2} 
        autoFocus={false}
        returnKeyType={'search'} 
        listViewDisplayed='auto'   
        fetchDetails={true}
        renderDescription={row => row.description} 
        onPress={(data, details = null) => { 
          console.log("Search Location = ", details.formatted_address);
          this.setState({ visibleModal: null });
          this._createMarker(details.geometry.location);
        }}
        query={{
          key: 'AIzaSyBTw2kt66WnBFtbxLjcuy1R7444_X_t-eQ',
          language: 'en',
        }}
      />
     
      
    </View>
  );

  _createMarker = (location) => {
    var e = {
      latitude: location.lat,
      longitude: location.lng
    }
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e,
          key: id++,
          title: "Amrita"
        },
      ],
    });
    console.log("State Value = ", this.state);
    {this._renderMarker()};
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  modal: {
    flex: 1,
    backgroundColor: '#ecf0f1',
   
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
  },
  textInput: {
    marginTop: 50,
    marginLeft: 10,
    height: 40,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'flex-end',
    textAlign: 'center',
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'gray',
    marginTop: 50,
    marginLeft: 10,
    height: 40,
    width: 350,
    borderWidth: 1,
    
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: 50
  }
});