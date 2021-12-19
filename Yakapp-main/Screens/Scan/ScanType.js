import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ProgressCircle from 'react-native-progress/Circle';
import TesseractOcr, {
  LANG_ENGLISH,
  useEventListener,
} from 'react-native-tesseract-ocr';
import {useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function ScanType({navigation}) {
  const word = useSelector(state => state.word.value);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  useEventListener('onProgressChange', p => {
    setProgress(p.percent / 100);
  });

  const recognizeTextFromImage = async path => {
    try {
      const tesseractOptions = {};
      const recognizedText = await TesseractOcr.recognize(
        path,
        LANG_ENGLISH,
        tesseractOptions,
      );

      setText(recognizedText);
      setTranslated(
        recognizedText
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
          .join(' '),
      );
    } catch (err) {
      console.error(err);
      setText('');
    }

    setIsLoading(false);
    setProgress(0);
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      setImgSrc({uri: image.path});
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
      setImgSrc({uri: image.path});
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#000" />
      <SafeAreaView
        style={{flex: 1, backgroundColor: imgSrc ? '#f4f4f4' : '#fff'}}>
        <View
          style={{
            height: 55,
            width: '100%',
            justifyContent: 'center',
            paddingHorizontal: 20,
            backgroundColor: '#fff',
          }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={26}
            color="#407BFF"
          />
        </View>
        <ScrollView>
          {imgSrc === null && (
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
          {imgSrc && (
            <>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={imgSrc} />
              </View>

              <View
                style={{
                  marginTop: 20,
                  width: '100%',
                  height: 'auto',
                  paddingHorizontal: 20,
                  paddingTop: 40,
                }}>
                {isLoading ? (
                  <ProgressCircle showsText progress={progress} />
                ) : (
                  <>
                    {/* <Text>Detected Word/s: {text.toLowerCase()}</Text> */}
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        color: '#272727',
                        fontSize: 16,
                        marginBottom: 10,
                      }}>
                      Detected Text
                    </Text>

                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#407BFF',
                        fontSize: 20,
                        marginBottom: 30,
                        marginLeft: 10,
                      }}>
                      {text}
                    </Text>

                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        color: '#272727',
                        fontSize: 16,
                        marginBottom: 10,
                      }}>
                      Translation
                    </Text>

                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#407BFF',
                        fontSize: 20,
                        marginLeft: 10,
                      }}>
                      {translated.length === 0
                        ? 'No translation 🙁'
                        : translated.replace(',', '/')}
                    </Text>

                    {/* <View
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
                            fontSize: 16,
                          }}>
                          Yakan
                        </Text>
                        <Ionicons
                          name="bookmark-outline"
                          size={24}
                          color="#fff"
                        />
                      </View>
                      <View style={{height: 100, paddingHorizontal: 20}}>
                        <ScrollView
                          showsVerticalScrollIndicator={false}></ScrollView>
                      </View>
                      <View
                        style={{
                          height: 50,
                          flexDirection: 'row',
                          paddingHorizontal: 20,
                          alignItems: 'center',
                          justifyContent: 'flex-end',
                        }}>
                        <AntDesign name="sound" size={20} color="#fff" />
                        <Feather
                          style={{marginLeft: 20}}
                          name="copy"
                          size={20}
                          color="#fff"
                        />
                      </View>
                    </View> */}
                  </>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

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
    backgroundColor: '#fff',
    elevation: 8,
  },
  image: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.5,
    width: '100%',
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

export default ScanType;
