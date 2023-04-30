import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, { UrlTile, PROVIDER_DEFAULT } from "react-native-maps";
import getLocation from "./getLocation";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import pcarga from './assets/pantallacarga.png'
import Menu from './menu'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      loading: true,
      showMenu: false
    };
    this.mapRef = React.createRef();
  }

  toggleMenu= () =>{
    this.setState({
      showMenu: !this.state.showMenu,
    });
  }

  handleCenterMap = () => {
    this.mapRef.current.animateToRegion({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  async componentDidMount() {
    // await request_location();    console.log(coords)
    let coords = await getLocation();
    this.setState({
      latitude: coords[0],
      longitude: coords[1],
      loading: false,
    });
    // console.log(typeof this.state)
  }
  render() {
    console.log("New");
    console.log(this.state);
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Image source={pcarga} style={styles.image}/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <MapView
          ref={this.mapRef}
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <UrlTile
            urlTemplate="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
          />
        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.toggleMenu}>
            <Entypo name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {this.state.showMenu ? (
          <View style={styles.menuContainer}>
            <Menu/>
        </View>
        ): null}
        <View style={styles.buttonBottom}>
          <TouchableOpacity style={styles.button} onPress={this.handleCenterMap}>
            <MaterialCommunityIcons
              name="crosshairs-gps"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Buscar..." />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    width: 400,
    height: 200
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#72cad9'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    fontSize: 50,
  },
  buttonContainer: {
    position: "absolute",
    top: 20,
    left: 10,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  button: {
    width: 60,
    height: 50,
    borderRadius: 10,
    overflow: "hidden", // Esto es para que los bordes redondeados se apliquen correctamente
    backgroundColor: "#014224",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBottom: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 80,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#f6f7f7",
    borderRadius: 12,
  },
  inputContainer: {
    position: "absolute",
    top: 20,
    left: 35,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
