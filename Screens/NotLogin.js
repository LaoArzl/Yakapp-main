import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const NotLogin = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff',
      }}>
      <Image
        style={{width: 150, height: 150}}
        source={require('../Assets/account.png')}
      />
      <Text style={{fontFamily: 'Poppins-Regular', marginBottom: 20}}>
        Your are currently not login
      </Text>

      <View style={{position: 'absolute', width: '100%', bottom: 20}}>
        <TouchableOpacity
          onPress={() => props.nav.navigate('Login')}
          style={{
            height: 45,
            backgroundColor: '#407BFF',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              color: '#fff',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 45,
            borderWidth: 1,
            borderColor: '#407BFF',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              color: '#407BFF',
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotLogin;
