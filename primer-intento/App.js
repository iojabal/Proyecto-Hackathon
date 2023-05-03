import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, {
  UrlTile,
  PROVIDER_DEFAULT,
  Marker,
  Callout,
} from "react-native-maps";
import getLocation from "./getLocation";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import pcarga from "./assets/pantallacarga.png";
import Menu from "./menu";
import { FontAwesome } from '@expo/vector-icons'; 
import styles from './styles'


const fetchData = async () => {
  const url = "http://192.168.195.147:8000/api/reciclaje";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(response.status)
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    // Manejo del error
    return null;
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      loading: true,
      showMenu: false,
      datainBackend: [
        {
            "id": 1,
            "nombre_empresa": "Reciclamaniaco",
            "descripcion": "Empresa de venta de material reciclable",
            "horarios": "de 8:00 AM a 5:00 PM de lunes a viernes",
            "lat": -17.385855997214254,
            "long": -66.17990278650495
        },
        {
            "id": 2,
            "nombre_empresa": "Metal Tuyo",
            "descripcion": "Metal Tuyo es una empresa dedicada a la recuperación y reciclaje de metales ferrosos y no ferrosos en desuso, a la compra de cobre, bronce, aluminio, acero inoxidable, latas de aluminio, radiadores, ollas, baterías y chatarra en general, por kg y por toneladas. Nuestro compromiso con la naturaleza nos mueve a brindar la mejor experiencia a nuestros clientes, para que la recepción, pesaje y pago justo por los materiales acopiados se conviertan en una actividad permanente. Metal Tuyo tiene un centro de acopio mayorista ubicado en la Av. Villazon, Km 1, antes del primer puente, en la parte de posterior de la tienda de camiones “Mundo Automotor”. También cuenta con un servicio de recojo a domicilio o en el punto de entrega donde el cliente tenga el material acopiado.",
            "horarios": "De lunes a viernes de 8:00 a 12:00 y de 14:00 A 18:00 Y Sabado de 09:00 a 13:00",
            "lat": -17.373405654233448,
            "long": -66.1323429427175
        },
        {
            "id": 3,
            "nombre_empresa": "Recicladora Salvatierra",
            "descripcion": "RECICLADORA, ACOPIADORA DE METALES FERROSOS Y NO FERROSOS.",
            "horarios": "de lunes a viernes de 08:00 a 18:00 y sabados de 08:00 a 16:00",
            "lat": -17.399607731361627,
            "long": -66.20215760265259
        }
    ],
      modalVisible: false,
      selectedMarker: null,
    };
    this.mapRef = React.createRef();
    this.refs = this.state.datainBackend.map(() => React.createRef());
  }

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  onMarkerPress = (even, marker) => {
    this.setState({ selectedMarker: marker, modalVisible: true });
  };

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
    // const data = await fetchData();
    this.setState({
      latitude: coords[0],
      longitude: coords[1],
      loading: false,
      // datainBackend: data,
    });
    // console.log(this.state);
  }
  render() {
    // console.log("New");
    // console.log(this.state.datainBackend);
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <Image source={pcarga} style={styles.image} />
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
          {this.state.datainBackend.map((mark, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: mark.lat,
                longitude: mark.long,
              }}
              onPress={(event) => this.onMarkerPress(event, mark)}
            >
              <FontAwesome name="recycle" size={24} color="green" />
              <Callout>
                <View style={styles.calloutMarkers}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Nombre:
                  </Text>
                  <Text>{mark.nombre_empresa}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>Descripción:</Text>
                  <Text>{mark.descripcion}</Text>
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>Horarios:</Text>
                  <Text>{mark.horarios}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
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
            <Menu />
          </View>
        ) : null}
        <View style={styles.buttonBottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleCenterMap}
          >
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

