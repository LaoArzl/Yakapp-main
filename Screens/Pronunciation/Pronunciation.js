import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {data} from './Data';
import HeaderBack from '../../Shared/HeaderBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sound = require('react-native-sound');

Sound.setCategory('Playback');

const Pronunciation = ({navigation}) => {
  const [ready, setReady] = useState(true);

  const playPause = item => {
    item.play(success => {
      if (success) {
        console.log('successfully finished playing');
        setReady(true);
      } else {
        console.log(item);
        setReady(true);
      }
    });
  };

  const play = item => {
    setReady(false);
    const ding = new Sound(item, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      playPause(ding);
    });
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
    <SafeAreaView style={{flex: 1, backgroundColor: night ? '#272727' : '#fff'}}>
      <HeaderBack nav={navigation} title="Pronunciations" />
      <View style={{padding: 20, paddingBottom: 60}}>
        <FlatList
          data={data}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  backgroundColor: night ? '#333' : '#fff',
                  marginBottom: 15,
                  height: 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  borderWidth: night ? 0 : 1,
                  borderColor: '#d3d3d3',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontFamily: 'Poppins-Medium', color: night ? '#fff' : '#272727', fontSize: fonts}}>
                  {item.name}
                </Text>

                {ready ? (
                  <TouchableOpacity onPress={() => play(item.path)}>
                    <AntDesign name="sound" size={fonts === 12 ? 18 : fonts === 14 ? 20 : 22} color="#407BFF" />
                  </TouchableOpacity>
                ) : (
                  <View style={{opacity: 0.5}}>
                    <AntDesign name="sound" size={fonts === 12 ? 18 : fonts === 14 ? 20 : 22} color="#407BFF" />
                  </View>
                )}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Pronunciation;
