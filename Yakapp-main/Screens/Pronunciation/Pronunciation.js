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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
                  backgroundColor: '#fff',
                  marginBottom: 15,
                  height: 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#d3d3d3',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                  {item.name}
                </Text>

                {ready ? (
                  <TouchableOpacity onPress={() => play(item.path)}>
                    <AntDesign name="sound" size={20} color="#407BFF" />
                  </TouchableOpacity>
                ) : (
                  <View style={{opacity: 0.5}}>
                    <AntDesign name="sound" size={20} color="#407BFF" />
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
