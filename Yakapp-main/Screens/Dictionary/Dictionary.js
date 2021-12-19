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

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#f4f4f4'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        {on && (
          <View
            style={{
              height: 55,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#fff',
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
                color: '#272727',
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
                <Feather name="search" size={20} color="#272727" />
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
              backgroundColor: '#fff',
            }}>
            <View style={{width: '80%'}}>
              <Searchbar
                iconColor="#407BFF"
                onChangeText={e =>
                  lang === 'yakan' ? handleSearch(e) : handleSearchEnglish(e)
                }
                autoFocus={true}
                placeholder="Search word"
                inputStyle={{
                  fontSize: 14,
                  marginBottom: -2,
                }}
                style={{
                  height: 40,
                  width: '100%',
                  borderWidth: 0,
                  borderRadius: 100,
                  elevation: 0,
                  backgroundColor: '#f4f4f4',
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
            backgroundColor: '#fff',
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
                color: lang === 'yakan' ? '#407BFF' : 'lightgrey',
                fontSize: 13,
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
                color: lang === 'english' ? '#407BFF' : 'lightgrey',
                fontSize: 13,
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
                  backgroundColor: '#f4f4f4',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    textTransform: 'capitalize',
                    color: '#272727',
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
                  backgroundColor: '#f4f4f4',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    textTransform: 'capitalize',
                    color: '#272727',
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
