import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect,useRef } from 'react';
import { StyleSheet, Text, Modal, View, TouchableOpacity,BackHandler } from 'react-native';
import { Octicons,MaterialIcons,FontAwesome5,Ionicons  } from '@expo/vector-icons'; 
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function Menu() {

  const [modalVisible, setModalVisible] = useState(false);
  const botonRef = useRef(null);
  const [botonPosicion, setBotonPosicion] = useState(null);

  useEffect(() => {
    const backAction = () => {
      setModalVisible(false);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onBotonLayout = () => {
    botonRef.current.measure((x, y, width, height, pageX, pageY) => {
      setBotonPosicion({ x: pageX, y: pageY, width, height });
    });
  };

  const onCerrarModal = () => {
    setModalVisible(false);
    setBotonPosicion(null);
  };

  const modalContenido = (
    <Text></Text>
  );





  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <View style={styles.container}>

      <View style={styles.menu} >
        <View style={styles.opciones} >
          <Octicons style={{margin:10}}  name="three-bars" size={30} color="white" />
          <Text style={{fontFamily: 'Poppins_400Regular',color:'white',flex: 1,fontSize:20}}>OPCIONES</Text>
        </View>

        <TouchableOpacity style={styles.opciones2}  >
          <MaterialIcons style={{margin:10}}  name="house" size={35} color="#004225" />
          <Text style={{fontFamily: 'Poppins_400Regular',color:'#004225',flex: 1,fontSize:20}}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opciones2}  >
          <FontAwesome5  style={{margin:10}}  name="map-marked-alt" size={30} color="#004225" />
          <Text style={{fontFamily: 'Poppins_400Regular',color:'#004225',flex: 1,fontSize:20}}>Mapa Contaminación del aire</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opciones2}  >
          <FontAwesome5  style={{margin:10}}  name="map-marked-alt" size={30} color="#004225" />
          <Text style={{fontFamily: 'Poppins_400Regular',color:'#004225',flex: 1,fontSize:20}}>Mapa Contamianción Acústica</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.opciones2}  >
          <Ionicons  style={{margin:10}}  name="newspaper" size={30} color="#004225" />
          <Text style={{fontFamily: 'Poppins_400Regular',color:'#004225',flex: 1,fontSize:20}}>Noticias</Text>
        </TouchableOpacity>

        <View>
          <TouchableOpacity style={styles.opciones2}
        onPress={() => {
          setModalVisible(true);
        }}
        onLayout={onBotonLayout}
        ref={botonRef}
      >
         <Octicons  style={{margin:10}}  name="question" size={30} color="#004225" />
            <Text style={{fontFamily: 'Poppins_400Regular',color:'#004225',flex: 1,fontSize:20}}>Acerca de</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" onRequestClose={onCerrarModal}>
        {modalContenido}
      </Modal>
      {modalVisible && botonPosicion && (
        <TouchableOpacity
          style={[
            styles.cerrarBoton,
            { top: botonPosicion.y, left: botonPosicion.x + botonPosicion.width + 10 }
          ]}
          onPress={onCerrarModal}
        >
          <Text style={styles.cerrarBotonTexto}>X</Text>
        </TouchableOpacity>
      )}
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 40,
    
  },
  menu: {
    width:300,
    height:500,
    borderWidth:1,
    borderRadius: 10,
  },
  opciones: {
    width:299,
    height:70,
    borderRadius: 10,
    backgroundColor:'#004225',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opciones2: {
    width:299,
    height:70,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button:
  {
    backgroundColor: '#2d572c',
    marginTop: 10, 
    paddingVertical:20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  title:
  {
    
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom:60
  }
});
