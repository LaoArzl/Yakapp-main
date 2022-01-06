import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import HeaderBack from '../Shared/HeaderBack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import * as Speech from 'expo-speech';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Translate = ({navigation}) => {
  const Vocabulary = useSelector(state => state.word.value);
  const [word, setWord] = useState('');
  const [translated, setTranslated] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isClipboard, setClipboard] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [save, setSave] = useState(false);
  const [state, setState] = useState('');

  let date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM ' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let dateNow =
    monthNames[date.getMonth()] +
    ' ' +
    date.getDate() +
    ', ' +
    date.getFullYear();

  const findFavorites = async () => {
    const result = await AsyncStorage.getItem('favorites');
    if (result !== null) {
      setFavorites(JSON.parse(result));
    }
  };

  useEffect(() => {
    findFavorites();
  }, [state]);

  const textSpeech = () => {
    Speech.speak(translated);
  };

  const copyClipboard = () => {
    setClipboard(true);
    Clipboard.setString(translated);
    setTimeout(() => setClipboard(false), 5000);
  };

  const addFavorites = async () => {
    const favorite = {
      id: 'Text Translation' + translated,
      title: 'Text Translation',
      english: word,
      yakan: translated,
      time: strTime + ' ' + dateNow,
    };

    const updatedFavorites = [...favorites, favorite];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setState('saving');
    setSave(true);
    setTimeout(() => setSave(false), 5000);
    setTimeout(() => setState(''), 1000);
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
    findNight();
    findFonts();
  }, [appState]);

  return (
    <>
      <SafeAreaView
        style={{backgroundColor: night ? '#333' : '#F4F4F4', flex: 1}}>
        <StatusBar
          barStyle={night ? 'light-content' : 'dark-content'}
          backgroundColor={night ? '#272727' : '#fff'}
        />
        <HeaderBack nav={navigation} title="Translate" background="#fff" />
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View
            style={{
              height: 'auto',
              backgroundColor: night ? '#272727' : '#fff',
              overflow: 'hidden',
              marginBottom: 20,
              elevation: 4,
            }}>
            <View
              style={{
                height: 50,
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingHorizontal: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#272727',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: fonts === 12 ? 14 : fonts === 14 ? 16 : 18,
                  color: night ? '#fff' : '#272727',
                }}>
                English
              </Text>
            </View>
            <View
              style={{
                height: 130,
                paddingHorizontal: 20,
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TextInput
                  value={word}
                  onChangeText={ee => {
                    setWord(ee);
                    setTranslated(
                      ee
                        .split(' ')
                        .map(
                          word =>
                            word &&
                            Vocabulary.filter(
                              e =>
                                e.English === word.toLocaleLowerCase() ||
                                e.English === word.toLocaleLowerCase() + 's' ||
                                e.English + 's' === word.toLocaleLowerCase(),
                            ).map(f => f.Yakan),
                        )
                        .map(empty => (empty.length !== 0 ? empty : ''))
                        .filter(item => item)
                        .toString()
                        .replace(/,/g, ' ') +
                        '\n' +
                        '\n' +
                        ee
                          .split(' ')
                          .map(
                            word =>
                              word &&
                              Vocabulary.filter(
                                e =>
                                  e.English === word.toLocaleLowerCase() ||
                                  e.English ===
                                    word.toLocaleLowerCase() + 's' ||
                                  e.English + 's' === word.toLocaleLowerCase(),
                              ).map(f => f.Yakan + ' - ' + f.English),
                          )
                          .map(empty => (empty.length !== 0 ? empty : ''))
                          .filter(item => item)
                          .toString()
                          .replace(/,/g, '\n'),
                    );
                  }}
                  autoFocus={true}
                  maxLength={30}
                  multiline={true}
                  placeholder="Input text here"
                  placeholderTextColor={night ? '#fff' : '#272727'}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: night ? '#fff' : '#272727',
                    height: 'auto',
                    fontSize: fonts === 12 ? 14 : fonts === 14 ? 16 : 18,
                  }}
                />
              </ScrollView>
            </View>
            <View
              style={{
                height: 50,
                paddingHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('Scan')}>
                <FontAwesome
                  name="camera"
                  size={fonts === 12 ? 18 : fonts === 14 ? 20 : 22}
                  color="#407BFF"
                />
              </TouchableOpacity>

              <Text
                style={{
                  color: '#808080',
                  marginLeft: 20,
                  fontFamily: 'Poppins-Regular',
                  fontSize: fonts,
                }}>
                {word.length === 0 || word.length === undefined
                  ? '0/30'
                  : word.length + '/30'}
              </Text>
            </View>
          </View>

          {translated.length === 0 ? null : (
            <View style={{paddingHorizontal: 20}}>
              <View
                style={{
                  height: 'auto',
                  borderRadius: 5,
                  overflow: 'hidden',
                  marginBottom: 20,
                  backgroundColor: '#407BFF',
                }}>
                <View
                  style={{
                    height: 50,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-SemiBold',
                      fontSize: fonts === 12 ? 14 : fonts === 14 ? 16 : 18,
                    }}>
                    Yakan
                  </Text>
                  <TouchableOpacity onPress={() => addFavorites()}>
                    <AntDesign
                      name="hearto"
                      size={fonts === 12 ? 18 : fonts === 14 ? 20 : 22}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
                <View style={{height: 100, paddingHorizontal: 20}}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#fff',
                        fontSize: fonts === 12 ? 14 : fonts === 14 ? 16 : 18,
                      }}>
                      {translated}
                    </Text>
                  </ScrollView>
                </View>
                <View
                  style={{
                    height: 50,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity onPress={() => textSpeech(translated)}>
                    <AntDesign
                      name="sound"
                      size={fonts === 12 ? 18 : fonts === 14 ? 20 : 22}
                      color="#fff"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => copyClipboard()}>
                    <Feather
                      style={{marginLeft: 20}}
                      name="copy"
                      size={fonts === 12 ? 18 : fonts === 14 ? 20 : 22}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {isClipboard && (
          <View
            style={{
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 20,
              width: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: 45,
                backgroundColor: '#323232',
                borderRadius: 100,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                elevation: 4,
              }}>
              <Text style={{color: '#eee', fontFamily: 'Poppins-Regular'}}>
                Copied to clipboard.
              </Text>
              <Text
                onPress={() => setClipboard(false)}
                style={{
                  color: '#407BFF',
                  fontFamily: 'Poppins-Medium',
                }}>
                CLOSE
              </Text>
            </View>
          </View>
        )}

        {save ? (
          <View
            style={{
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 20,
              width: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: 45,
                backgroundColor: '#333',
                borderRadius: 100,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                elevation: 4,
              }}>
              <Text style={{color: '#eee', fontFamily: 'Poppins-Regular'}}>
                Added to your favorites.
              </Text>
              <Text
                onPress={() => setSave(false)}
                style={{
                  color: '#407BFF',
                  fontFamily: 'Poppins-Medium',
                }}>
                CLOSE
              </Text>
            </View>
          </View>
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default Translate;
