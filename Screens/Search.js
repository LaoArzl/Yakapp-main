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
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {data} from './NotificationData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const Search = ({navigation}) => {
  const [fonts, setFonts] = useState(null);
  const [night, setNight] = useState(null);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState([]);

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

  // const handleSearchInput = text => {
  //   const filteredNotes = data.filter(e => {
  //     if (e.title.toLowerCase().includes(text.toLowerCase())) {
  //       return e;
  //     }

  //     if (filteredNotes) {
  //       setSearch(filteredNotes);
  //     }
  //   });
  // };

  const handleSearch = e => {
    if (e) {
      const newData = data.filter(item => {
        if (item.title.toLowerCase().includes(e.toLowerCase())) {
          return item;
        }
      });

      setSearch(newData);
      setQuery(e);
    } else {
      setQuery(e);
      setSearch([]);
    }
  };

  useEffect(() => {
    findFonts();
    findNight();
  }, [appState]);
  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: night ? '#272727' : '#fff'}}>
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
                onChangeText={text => handleSearch(text)}
                iconColor="#407BFF"
                placeholderTextColor={night ? '#d3d3d3' : '#808080'}
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

          <View style={{paddingHorizontal: 20}}>
            {search.map(e => {
              return (
                <TouchableOpacity
                  style={{
                    height: 45,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}
                  onPress={() => navigation.navigate(e.path)}>
                  <View style={{marginRight: 10}}>
                    <AntDesign name="search1" size={16} color="#272727" />
                  </View>
                  <Text
                    style={{color: '#272727', fontFamily: 'Poppins-Regular'}}>
                    {e.title}
                  </Text>

                  <View style={{position: 'absolute', right: 0}}>
                    <Feather name="arrow-up-right" size={20} color="#272727" />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Search;
