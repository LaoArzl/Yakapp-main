import React from 'react';
import {View, Text, Image} from 'react-native';

const Splash = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{width: 120, height: 120}}
        source={require('../Assets/logo.png')}
      />
      <Text
        style={{fontFamily: 'Poppins-Bold', fontSize: 25, color: '#272727'}}>
        Yakapp
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: '#55555C',
          fontSize: 14,
        }}>
        Yakan Translation App
      </Text>
    </View>
  );
};

export default Splash;
