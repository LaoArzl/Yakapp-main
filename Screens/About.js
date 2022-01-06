import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import HeaderBack from '../Shared/HeaderBack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const About = ({navigation}) => {
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
      <StatusBar
        barStyle={night ? 'light-content' : 'dark-content'}
        backgroundColor={night ? '#272727' : '#fff'}
      />
      <SafeAreaView
        style={{flex: 1, backgroundColor: night ? '#272727' : '#fff'}}>
        <HeaderBack nav={navigation} />
        <ScrollView>
          <View style={{padding: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: night ? '#fff' : '#272727',
                fontSize: fonts === 12 ? 18 : fonts === 14 ? 20 : 22,
                marginBottom: 20,
              }}>
              About Yakapp
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: night ? '#fff' : '#272727',
                marginBottom: 20,
                fontSize: fonts,
              }}>
              The Yakapp Mobile is a learning application that allows people to
              learn the rich language of Yakan.
              {'\n'}
              {'\n'}
              The application provides a self-learning modules that they can use
              to study and learn the yakan vocabulary. It also comes with three
              (3) different levels, starting from beginner up to advance.
              {'\n'}
              {'\n'}
              Aside from the the self-learning modules, Yakapp also provides a
              text and a scan translation feature.
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: night ? '#d3d3d3' : '#808080',
                marginBottom: 20,
                fontSize: fonts,
              }}>
              Application name: Yakapp {'\n'}
              Version: 1.0.0
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default About;
