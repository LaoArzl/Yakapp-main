import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HeaderBack from '../../Shared/HeaderBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const Favorites = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  const findFavorites = async () => {
    const result = await AsyncStorage.getItem('favorites');
    if (result !== null) {
      setFavorites(JSON.parse(result));
      console.log(JSON.parse(result));
    }
  };

  useEffect(() => {
    findFavorites();
  }, []);

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
      <SafeAreaView style={{flex: 1, backgroundColor: night ? '#272727' : '#fff'}}>
        <StatusBar barStyle={night ? 'light-content' : "dark-content"} backgroundColor={night ? '#272727' : '#fff'} />
        <HeaderBack nav={navigation} title="Favorites" background="#fff" />
        <ScrollView>
          <View style={{padding: 20}}>
            {favorites.map(e => {
              return (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    minHeight: 100,
                    backgroundColor: night ? '#333' : '#f4f4f4',
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: night ? '#fff' : '#272727',
                      marginBottom: 10,
                      fontSize: fonts
                    }}>
                    {e.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: night ? '#fff' : '#272727',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{fontFamily: 'Poppins-Medium', color: '#407BFF',  fontSize: fonts}}>
                      English:
                    </Text>{' '}
                    {e.english}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: night ? '#fff' : '#272727',
                      marginBottom: 10,
                      fontSize: fonts
                    }}>
                    <Text
                      style={{fontFamily: 'Poppins-Medium', color: '#407BFF',  fontSize: fonts}}>
                      Yakan:
                    </Text>{' '}
                    {e.yakan}
                  </Text>

                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: fonts === 12 ? 10 : fonts === 14 ? 12 : 14,
                      color: '#808080'
                    }}>
                    {e.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Favorites;
