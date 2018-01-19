import React, { Component } from 'react';
import { 
  Dimensions,
  Image,
  StyleSheet, 
  Text,
  TextInput, 
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import { Card, Button, List, ListItem, SearchBar } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Modal from "react-native-modal";
import CustomCallout from './CustomCallout';

let id = 0;
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const list = [
  {
    title: 'Target',
    address: '2675 Geary Blvd, San Francisco, CA 94118, USA',
    distance: '0.1m',
    icon: 'av-timer'
  },
  {
    title: 'Ulta Beauty',
    address: '2675 Geary Blvd, San Francisco, CA 94118, USA',
    distance: '0.1m',
    icon: 'av-timer'
  },
  {
    title: 'Trader Joe\'s',
    address: '2692 Geary Blvd, San Francisco, CA 94118, USA',
    distance: '0.2m',
    icon: 'av-timer'
  }
]

export default class Home extends React.Component {

  constructor(props) {
    console.log("Inside Constructor");
    super(props);

    this.state = {
      mapRegion: new MapView.AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }),
      visibleModal: null,
      markers: [
        {
          "coordinate": 
          {
            "latitude": 37.78200029999999,
            "longitude": -122.4467964,
          },
          "key": id++,
          "title": "Target",
          "address": ""
        },
      ],
    };
    this._renderMarker = this._renderMarker.bind(this);
    
  };


  _handleMapRegionChange = mapRegion => {
    console.log("### Inside _handleMapRegionChange");
    this.setState({ mapRegion });
  };

  componentDidMount() {
    console.log("Inside componentDidMount");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (this.map) {
          this.map.animateToRegion({
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          })
        }
      },
      (error) => alert('Error: Are location services on?'),
      { enableHighAccuracy: true }
    )
  }

  _createMarker = (details) => {
    console.log("**** _createMarker ");
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
          title: details.name,
          address: details.formatted_address
        },
      ],
    });
  };

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    this.setState({
        markers: nextProps.markers
    })
  }

  _renderMarker(){
    console.log("Render Marker Values = ", this.state.markers);
    return(
      this.state.markers.map(marker => (
        <MapView.Marker
          key={marker.key}
          coordinate={marker.coordinate}
          title={marker.title}
          >
          <MapView.Callout tooltip style={styles.customView}>
            <CustomCallout>
              <List containerStyle={{backgroundColor: '#ffffd8', marginTop: 0, paddingLeft: 0}}>
                {
                  list.map((item, i) => (
                    <ListItem
                      key={i}
                      title={
                        <Text style={{fontSize: 12, marginBottom: 0, paddingBottom: 0, fontWeight: 'bold',}}>{item.title}</Text>
                      }
                      subtitle={
                          <Text style={{fontSize: 8,}}>{item.address}</Text>
                      }  
                      rightTitle={item.distance}
                    />
                  ))
                }
              </List>
            </CustomCallout>
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
          //this.setState(this.state);
          //this._renderMarker();
        }}
        query={{
          
          language: 'en',
        }}
      />
    </View>
  );

  render() {
    console.log("Inside Render");
    return(
    <MapView.Animated
      style={styles.modal}
      //onPress={(e) => this.onMapPress(e)}
      region={this.state.mapRegion}
      provider={MapView.PROVIDER_GOOGLE}
      onRegionChange={this._handleMapRegionChange}
      mapType={"standard"}
      showsUserLocation={true}
      showsMyLocationButton={true}
      showsTraffic={true}
      zoomEnabled={true}
      followsUserLocation={true}
      showsBuildings={true}
      zoomControlEnabled={true}
      scrollEnabled={true}
      
    >
      <View>
      <SearchBar
        lightTheme
        containerStyle={{marginTop: 50}}
        onChangeText={() => this._renderModalContent}
        icon={{ type: 'font-awesome', name: 'search' }}
        placeholder='Type Here...' />
        {this._renderButton('Search for Free Parking Spot', () => this.setState({ visibleModal: 1 }))}
        <Modal isVisible={this.state.visibleModal === 1}>{this._renderModalContent()}</Modal>
        {this._renderMarker()}
        
      </View>
    </MapView.Animated>
    );
  }

  onMapPress(e) {
    console.log("%%%% Map pressed = ", e.nativeEvent);
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: 'black'
          
        },
      ],
    });
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
  customView: { 
    width: 210,
    height: 230,
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#ffffd8',
    alignSelf: 'center',
  },
  calloutview: {
    flexDirection: 'row',
  },
  calloutinfotitle: {
    width: 120,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#34495e',
  },
  calloutinfoaddr: {
    width: 120,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  calloutinfodistance: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#34495e',
  },
  image: {
    width: 50, 
    height: 50, 
  },
  subtitleView: {
    flexDirection: 'row',
    
  },
});