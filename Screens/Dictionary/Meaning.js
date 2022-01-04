import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const Meaning = ({navigation, route}) => {
  const {item} = route.params;

  const textSpeech = () => {
    const word = item.Yakan;
    Speech.speak(word);
  };

  const [fonts, setFonts] = useState(null);
  const [night, setNight] = useState(null);
  const appState = useSelector(state => state.appState.value);

  const findFonts = async () => {
    const result = await AsyncStorage.getItem('fonts');
    if (result !== null) {
      setFonts(JSON.parse(result));
    }
  };

  const findNight = async () => {
    const result = await AsyncStorage.getItem('night');
    if (result !== null) {
      setNight(JSON.parse(result));
    }
  };

  useEffect(() => {
    findFonts();
    findNight();
  }, [appState]);
  return (
    <>
      <StatusBar backgroundColor="#407BFF" barStyle={night ? 'dark-content' : "light-content"}  />
      <SafeAreaView style={{backgroundColor: night ? '#272727' : '#fff', flex: 1}}>
        <LinearGradient
          colors={['#407BFF', '#407BFF']}
          start={{x: 0.0, y: 0.0}}
          end={{x: 1.0, y: 0.0}}
          style={{
            width: '100%',
            height: 60,
            flexDirection: 'row',

            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: '10%',
              position: 'absolute',
              left: 20,
            }}>
            <Ionicons name="arrow-back" size={26} color={night ? '#272727' : '#fff'} />
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#407BFF', '#40C6FF']}
          style={{
            width: '100%',
            height: 100,
            overflow: 'hidden',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: fonts === 12 ? 28 : fonts === 14 ? 30 : 32,
                textTransform: 'capitalize',
                color: night ? '#272727' : '#fff',
                marginRight: 15,
              }}>
              {item.Yakan}
            </Text>

            <TouchableOpacity onPress={() => textSpeech()}>
              <AntDesign
                name="sound"
                size={fonts === 12 ? 24 : fonts === 14 ? 26 : 28}
                color={night ? '#272727' : '#fff'}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <ScrollView>
          <View style={{padding: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: night ? '#d3d3d3' : '#808080',
                marginBottom: 40,
                fontSize: fonts === 12 ? 14 : fonts === 14 ? 16 : 18,
              }}>
              {item.Meaning}
            </Text>

            <Text
              style={{
                color: night ? '#fff' : '#272727',
                fontFamily: 'Poppins-Bold',
                fontSize: fonts === 12 ? 14 : fonts === 14 ? 16 : 18,
                marginBottom: 5,
              }}>
              English
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: night ? '#d3d3d3' : '#808080',
                marginBottom: 40,
                fontSize: fonts === 12 ? 14 : fonts === 14 ? 16 : 18,
                textTransform: 'capitalize',
              }}>
              {item.English}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Meaning;
