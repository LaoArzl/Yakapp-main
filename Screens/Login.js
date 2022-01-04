import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import HeaderBack from '../Shared/HeaderBack';
import {useDispatch, useSelector} from 'react-redux';
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeAppState} from '../features/appState';
import {login, user} from '../features/user';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const appState = useSelector(state => state.appState.value);
  const user = useSelector(state => state.user.value);
  const [ready, setReady] = useState(false);
  const [userValue, setUserValue] = useState({});

  useEffect(() => {
    getData();
  }, [appState]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_details');
      if (value !== null) {
        setUserValue(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user_details', jsonValue);
    } catch (e) {}
  };

  const handleLogin = () => {
    Axios.get('http://10.0.2.2:3001/login-user').then(response => {
      if (response) {
        storeData({isLoggedin: true, name: 'Arzl James', skipLogin: true});
        dispatch(
          login({isLoggedin: true, name: 'Arzl James', skipLogin: true}),
        );
        dispatch(changeAppState('State changes'));
        setTimeout(() => dispatch(changeAppState(''), 1000));
      }
    });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <Text
          onPress={() => {
            dispatch(login({skipLogin: true}));
            storeData({
              isLoggedin: true,
              name: 'Arzl James',
              skipLogin: true,
            });
          }}
          style={{
            position: 'absolute',
            right: 20,
            top: 20,
            fontFamily: 'Poppins-SemiBold',
            color: '#272727',
          }}>
          Skip
        </Text>

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
            onChangeText={text => {
              setUsername(text);
            }}
            style={{
              marginBottom: 10,
              backgroundColor: '#fff',
              height: 45,
              backgroundColor: '#f4f4f4',
            }}
            outlineColor="#eee"
            mode="outlined"
            label="Username"
          />
          <TextInput
            onChangeText={text => {
              setPassword(text);
            }}
            style={{
              marginBottom: 30,
              backgroundColor: '#fff',
              height: 45,
              backgroundColor: '#f4f4f4',
            }}
            secureTextEntry
            outlineColor="#eee"
            mode="outlined"
            label="Password"
          />
          <Button
            labelStyle={{
              fontFamily: 'Poppins-Medium',
              textTransform: 'capitalize',
              letterSpacing: 0,
              fontSize: 16,
            }}
            onPress={() => {
              handleLogin();

              setLoading(true);
              setTimeout(() => setLoading(false), 4000);
            }}
            loading={loading ? true : false}
            style={{
              height: 45,
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

export default Login;
