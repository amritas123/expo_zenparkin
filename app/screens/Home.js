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
          "title": "Target"
        },
      ],
      events: [],
    };
    this._renderMarker = this._renderMarker.bind(this);
    
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _createMarker = (details) => {
    var e = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng
    }
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e,
          key: id++,
          title: details.name
        },
      ],
    });
  };

  _renderMarker(){
    console.log("_renderMarker");
    return(
      this.state.markers.map(marker => (
        <MapView.Marker
          key={marker.key}
          coordinate={marker.coordinate}
          title={marker.title}
          >
          <MapView.Callout>
            <Text style={styles.calloutText}>{marker.title}</Text>
        </MapView.Callout>
        </MapView.Marker>
      )
    )
    );
  };

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
          this.setState({ visibleModal: null });
          this._createMarker(details);
          //this._renderMarker();
          console.log("State Value = ", this.state);
        }}
        query={{
          
          language: 'en',
        }}
      />
    </View>
  );

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
        
      </View>
    </MapView>
    );
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
  },
  calloutText:{
    flex: 1,
    backgroundColor: '#fffa',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    width: 100,
    height: 25,
    fontSize: 16,
  },
});