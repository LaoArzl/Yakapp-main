import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import HeaderBack from '../Shared/HeaderBack';

const Register = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <HeaderBack nav={navigation} destination="Profile" />
        <View
          style={{
            padding: 20,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Image
              style={{width: 100, height: 100}}
              source={require('../Assets/logo-light.png')}
            />
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                color: '#272727',
                fontSize: 20,
              }}>
              Yakapp
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                color: '#808080',
              }}>
              Sign in to continue
            </Text>
          </View>
          <TextInput
            style={{marginBottom: 10, backgroundColor: '#fff'}}
            outlineColor="#d3d3d3"
            mode="outlined"
            label="Username"
          />
          <TextInput
            style={{marginBottom: 20, backgroundColor: '#fff'}}
            secureTextEntry
            outlineColor="#d3d3d3"
            mode="outlined"
            label="Password"
          />
          <Button
            onPress={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 4000);
            }}
            loading={loading ? true : false}
            style={{
              height: 50,
              justifyContent: 'center',
              borderRadius: 3,
              marginBottom: 30,
            }}
            mode="contained">
            Sign In
          </Button>

          <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
            <Text style={{fontFamily: 'Poppins-Regular', color: '#407BFF'}}>
              Forgot Password?
            </Text>
            <Text style={{fontFamily: 'Poppins-Regular', color: '#407BFF'}}>
              Don't have an account? Register.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
