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

export default class Home extends React.Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    visibleModal: null,
    markers: [],
  };
  
  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  render() {
    return(
    <MapView
      style={styles.container}
      region={this.state.mapRegion}
      provider={MapView.PROVIDER_GOOGLE}
      onRegionChange={this._handleMapRegionChange}
    >
      
      <View>
        {this._renderButton('Search for Free Parking Spot', () => this.setState({ visibleModal: 1 }))}
        <Modal isVisible={this.state.visibleModal === 1}>{this._renderModalContent()}</Modal>
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.key}
            coordinate={marker.coordinate}
            pinColor={marker.color}
          />
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>Tap to create a marker of random color</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MapView>
    );
  }

  _renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  _renderModalContent = () => (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Search for Free Parking Spot'
        minLength={2} 
        autoFocus={false}
        returnKeyType={'search'} 
        listViewDisplayed='auto'   
        fetchDetails={true}
        renderDescription={row => row.description} 
        onPress={(data, details = null) => { 
          console.log(details.geometry.location);
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
    console.log("Helllooooo", location.lat);
    var e = {
      latitude: location.lat,
      longitude: location.lng
    }
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e,
          key: '1',
        },
      ],
    });
    console.log(this.state.markers);
    
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor(),
        },
      ],
    });
  }
  _openSearchModal = (text) => {
    this.setState({ visibleModal: 1 });
    return(
      <Modal isVisible={this.state.visibleModal === 1}>{this._renderModalContent()}</Modal>
    );
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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