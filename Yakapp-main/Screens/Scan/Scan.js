import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
} from 'react-native';
import HeaderBack from '../../Shared/HeaderBack';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import ProgressCircle from 'react-native-progress/Circle';
import {useEventListener} from 'react-native-tesseract-ocr';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Speech from 'expo-speech';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Scan = ({navigation}) => {
  const word = useSelector(state => state.word.value);
  const [loading, isLoading] = useState(false);
  const [image, setImage] = useState('');
  const [words, setWords] = useState('');
  const [progress, setProgress] = useState(0);
  const [translated, setTranslated] = useState('');
  const [clipboard, setClipboard] = useState(false);
  const [state, setState] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [save, setSave] = useState(false);
  useEventListener('onProgressChange', p => {
    setProgress(p.percent / 100);
  });

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

  const DEFAULT_HEIGHT = 500;
  const DEFAULT_WITH = 600;
  const defaultPickerOptions = {
    cropping: true,
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WITH,
  };

  const recognizeTextFromImage = async e => {
    const result = await TextRecognition.recognize(e);
    setWords(result.toString().replace(/,/g, ' '));
    setTranslated(
      result
        .toString()
        .replace(/,/g, ' ')
        .split(' ')
        .map(
          w =>
            w &&
            word
              .filter(
                e =>
                  e.English === w.toLocaleLowerCase() ||
                  e.Yakan === w.toLocaleLowerCase(),
              )
              .map(f => (w === f.Yakan ? f.English : f.Yakan)),
        )
        .map(empty => (empty.length !== 0 ? empty : ''))
        .filter(item => item)
        .toString()
        .replace(/,/g, ' '),
    );
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      setImage({uri: image.path});
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openCamera(options);
      setImage({uri: image.path});

      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  const textSpeech = () => {
    Speech.speak(translated);
  };

  const copyClipboard = () => {
    setClipboard(true);
    Clipboard.setString(translated);
    setTimeout(() => setClipboard(false), 5000);
  };

  const findFavorites = async () => {
    const result = await AsyncStorage.getItem('favorites');
    if (result !== null) {
      setFavorites(JSON.parse(result));
    }
  };

  useEffect(() => {
    findFavorites();
  }, [state]);

  const addFavorites = async () => {
    const favorite = {
      id: 'Text-recognition Translation' + translated,
      title: 'Text-recognition Translation',
      english: words,
      yakan: translated,
      time: strTime + ' ' + dateNow,
      image: image,
    };

    const updatedFavorites = [...favorites, favorite];
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setState('saving');
    setSave(true);
    setTimeout(() => setSave(false), 5000);
    setTimeout(() => setState(''), 1000);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView
        style={{flex: 1, backgroundColor: image ? '#f4f4f4' : '#fff'}}>
        <HeaderBack nav={navigation} />
        <ScrollView>
          {image === '' && (
            <View
              style={{
                paddingHorizontal: 20,
                alignItems: 'center',
                marginTop: 100,
              }}>
              <Text style={styles.instructions}>Choose image source:</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    recognizeFromCamera();
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#407BFF',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 15,
                    elevation: 8,
                  }}>
                  <Feather
                    style={{marginBottom: 5}}
                    name="camera"
                    size={30}
                    color="#fff"
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 12,
                    }}>
                    Camera
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    recognizeFromPicker();
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    backgroundColor: '#407BFF',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 8,
                  }}>
                  <Feather
                    style={{marginBottom: 5}}
                    name="image"
                    size={30}
                    color="#fff"
                  />
                  <Text
                    style={{
                      color: '#fff',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 12,
                    }}>
                    Gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {image !== '' && (
            <>
              <View style={styles.imageContainer}>
                <Image style={{width: '100%', height: '100%'}} source={image} />
              </View>

              <View
                style={{
                  marginTop: 20,
                  width: '100%',
                  height: 'auto',
                  paddingHorizontal: 20,
                  paddingTop: 40,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: '#272727',
                    fontSize: 16,
                    marginBottom: 10,
                  }}>
                  Detected Text
                </Text>

                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 20,
                    borderRadius: 10,
                    marginBottom: 20,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#407BFF',
                    }}>
                    {words}
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    color: '#272727',
                    fontSize: 16,
                    marginBottom: 10,
                  }}>
                  Translation
                </Text>

                <View
                  style={{
                    backgroundColor: '#407BFF',
                    padding: 20,
                    borderRadius: 10,
                    minHeight: 20,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#fff',
                    }}>
                    {translated.length === 0 || translated === ' '
                      ? 'No translation 🙁'
                      : translated.replace(/,/g, ' ')}
                  </Text>
                  {translated.length === 0 || translated === ' ' ? null : (
                    <View
                      style={{
                        width: '100%',
                        height: 50,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity onPress={() => textSpeech()}>
                        <AntDesign name="sound" size={20} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => copyClipboard()}
                        style={{marginLeft: 20}}>
                        <Feather name="copy" size={20} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => addFavorites()}
                        style={{marginLeft: 20}}>
                        <AntDesign name="hearto" size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </>
          )}
        </ScrollView>
        {clipboard && (
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
                backgroundColor: '#323232',
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
const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    backgroundColor: '#fff',
    elevation: 8,
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    color: '#272727',
    marginBottom: 20,
  },
});

export default Scan;
