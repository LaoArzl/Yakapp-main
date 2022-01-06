import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {Searchbar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dictionary = ({navigation}) => {

  const word = useSelector(state => state.word.value);
  const [masterData, setMasterData] = useState([]);
  const [filterData, setFileterDate] = useState([]);
  const [query, setQuery] = useState('');


  const handleSearch = e => {
    if (e) {
      const newData = masterData.filter(item => {
        const itemData = item.Yakan.toLowerCase();
        const textData = e.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });

      setFileterDate(newData);
      setQuery(e);
    } else {
      setQuery(e);
      setFileterDate(word);
    }
  };

  const handleSearchEnglish = e => {
    if (e) {
      const newData = masterData.filter(item => {
        const itemData = item.English.toLowerCase();
        const textData = e.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });

      setFileterDate(newData);
      setQuery(e);
    } else {
      setQuery(e);
      setFileterDate(word);
    }
  };

  useEffect(() => {
    setFileterDate(word);
    setMasterData(word);
  }, []);

  const [on, setOn] = useState(true);

  const [lang, setLang] = useState('yakan');


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
      <SafeAreaView style={{flex: 1, backgroundColor:  night ? '#333' : '#f4f4f4',}}>
        <StatusBar barStyle={night ? 'light-content' : 'dark-content'} backgroundColor={night ? '#272727' : '#fff'} />
        {on && (
          <View
            style={{
              height: 55,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: night ? '#272727' : '#fff',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                height: '100%',
                width: '10%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginRight: 10,
              }}>
              <Ionicons name="arrow-back" size={26} color="#407BFF" />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 18,
                color: night ? '#fff' : '#272727',
                marginTop: 4,
              }}>
              Dictionary
            </Text>
            {on && (
              <TouchableOpacity
                onPress={() => {
                  setOn(false);
                }}
                style={{
                  height: '100%',
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  position: 'absolute',
                  right: 20,
                }}>
                <Feather name="search" size={20} color={night ? '#fff' : '#272727'} />
              </TouchableOpacity>
            )}
          </View>
        )}

        {on === false && (
          <View
            style={{
              height: 55,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: night ? '#272727' : '#fff',
            }}>
            <View style={{width: '80%'}}>
              <Searchbar
                iconColor="#407BFF"
                onChangeText={e =>
                  lang === 'yakan' ? handleSearch(e) : handleSearchEnglish(e)
                }
                autoFocus={true}
                placeholder="Search word"
                placeholderTextColor={night ? '#d3d3d3' : '#808080'}
                inputStyle={{
                  fontSize: 14,
                  color: night ? '#fff' : '#272727',
                  fontFamily: 'Poppins-Regular',
                  paddingBottom: 5,
                }}

                style={{
                  height: 40,
                  width: '100%',
                  borderWidth: 0,
                  borderRadius: 100,
                  elevation: 0,
                  backgroundColor: night ? '#333' : '#f4f4f4',
                  
                }}
              />
            </View>
            <View
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                minWidth: 70,
              }}>
              <Text
                onPress={() => {
                  setOn(true);
                  setQuery('');
                  setFileterDate(word);
                }}
                style={{
                  color: '#407BFF',
                  fontFamily: 'Poppins-Regular',

                  paddingTop: 4,
                  fontSize: 13,
                }}>
                Cancel
              </Text>
            </View>
          </View>
        )}

        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: night ? '#272727' : '#fff',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => setLang('yakan')}
            style={{
              width: '50%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 2,
              borderBottomColor: lang === 'yakan' ? '#407BFF' : '#f4f4f4',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: lang === 'yakan' ? '#407BFF' : '#808080',
                fontSize: fonts
              }}>
              YAKAN 
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setLang('english')}
            style={{
              width: '50%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 2,
              borderBottomColor: lang === 'english' ? '#407BFF' : '#f4f4f4',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: lang === 'english' ? '#407BFF' : '#808080',
                fontSize: fonts,
              }}>
              ENGLISH
            </Text>
          </TouchableOpacity>
        </View>

        {lang === 'yakan' && (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={filterData}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Meaning', {item})}
                style={{
                  height: 50,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingLeft: 20,
                  backgroundColor: night ? '#333' : '#f4f4f4',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    textTransform: 'capitalize',
                    color: night ? '#fff' : '#272727',
                    fontSize: fonts
                  }}>
                  {item.Yakan}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

        {lang === 'english' && (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={filterData}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Meaning', {item})}
                style={{
                  height: 50,
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingLeft: 20,
                  backgroundColor: night ? '#333' : '#f4f4f4',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    textTransform: 'capitalize',
                    color: night ? '#fff' : '#272727',
                    fontSize: fonts
                  }}>
                  {item.English}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default Dictionary;
