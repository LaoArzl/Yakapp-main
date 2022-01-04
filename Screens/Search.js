import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = () => {
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
        <View
          style={{
            width: '100%',
            height: 55,
            paddingLeft: 20,
            justifyContent: 'center',
            backgroundColor: '#407BFF',
          }}>
          <Text
            style={{
              marginTop: 4,
              color: night ? '#272727' : '#fff',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 20,
            }}>
            Search
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '100%'}}>
              <Searchbar
                iconColor="#407BFF"
                placeholderTextColor={night ? '#fff' : '#272727'}
                inputStyle={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: night ? '#fff' : '#272727',
                  paddingBottom: 5,
                  paddingLeft: 0,
                }}
                style={{
                  elevation: 0,
                  height: 40,
                  backgroundColor: night ? '#333' : '#f4f4f4',
                  padding: 0,
                  borderRadius: 100,
                }}
                placeholder="Search and discover things"
              />
            </View>
          </View>
          {/* {focus === false && (
            <LinearGradient
              colors={['#407BFF', '#40C6FF']}
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.0, y: 0.0}}
              style={{height: 200}}></LinearGradient>
          )} */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Search;
