import { useEffect, useState } from "react";
import * as Location from 'expo-location'
import { Alert, View } from "react-native";

export default async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync()
    // console.log(status)
    if (status === 'granted'){
        let {coords} = await Location.getCurrentPositionAsync();
        let lat = coords.latitude;
        let long = coords.longitude
        // console.log(coords)
        return [lat, long]
    }else{
        Alert.alert("denegado");
        return;
    }
}
