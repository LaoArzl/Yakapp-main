import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Linking,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Modal, Portal, RadioButton, Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeAppState} from '../features/appState';

const Profile = ({navigation}) => {
  const fontSizes = useSelector(state => state.fontSize.value);
  const appState = useSelector(state => state.appState.value);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [fontVisible, setFontVisible] = useState(false);
  const [language, setLanguage] = useState('english');
  const [fonts, setFonts] = useState(14);
  const hideModal = () => setVisible(false);
  const [night, setNight] = useState(false);
  const containerStyle = {
    padding: 20,
  };

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

  const handleSubmit = async e => {
    setFonts(e);
    dispatch(changeAppState(e));
    await AsyncStorage.setItem('fonts', JSON.stringify(e));
    setTimeout(() => dispatch(changeAppState('')), 500);
  };

  const NightMode = async e => {
    setNight(e);
    dispatch(changeAppState(e));
    await AsyncStorage.setItem('night', JSON.stringify(e));
    setTimeout(() => dispatch(changeAppState('')), 500);
    console.log(night);
  };

  useEffect(() => {
    findFonts();
    findNight();
  }, [appState]);

  const openWeb = () => {
    Linking.openURL('https://forms.gle/Vjn6SHWtLc1Fkzeo7');
  };
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
            More Settings
          </Text>
        </View>

        <ScrollView>
          <View style={{padding: 20}}>
            <View
              style={{
                borderBottomWidth: night ? 0 : 1,
                paddingVertical: 20,
                borderBottomColor: '#d3d3d3',
                paddingHorizontal: night ? 20 : 0,
                backgroundColor: night ? '#333' : null,
                borderRadius: night ? 10 : 0,
                marginBottom: night ? 20 : 0,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  color: night ? '#fff' : '#272727',
                  marginBottom: 10,
                  fontSize: fonts,
                }}>
                CONTENT
              </Text>
              <TouchableOpacity
                onPress={() => setVisible(true)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 50,
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color: night ? '#fff' : '#272727',
                      fontSize: fonts,
                    }}>
                    Language
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    color: night ? '#fff' : '#272727',
                    fontSize: fonts,
                  }}>
                  English
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => openWeb()}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 50,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: night ? '#fff' : '#272727',
                    fontSize: fonts,
                  }}>
                  Take the survey
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomWidth: night ? 0 : 1,
                paddingVertical: 20,
                borderBottomColor: '#d3d3d3',
                paddingHorizontal: night ? 20 : 0,
                backgroundColor: night ? '#333' : null,
                borderRadius: night ? 10 : 0,
                marginBottom: night ? 20 : 0,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  color: night ? '#fff' : '#272727',
                  marginBottom: 10,
                  fontSize: fonts,
                }}>
                ACCESSIBILITY
              </Text>
              <TouchableOpacity
                onPress={() => setFontVisible(true)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 50,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: night ? '#fff' : '#272727',
                    fontSize: fonts,
                  }}>
                  Font size
                </Text>

                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    color: night ? '#fff' : '#272727',
                    fontSize: fonts,
                  }}>
                  {fonts === 12 ? 'Small' : fonts === 14 ? 'Medium' : 'Large'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setNight(!night)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 50,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: night ? '#fff' : '#272727',
                    fontSize: fonts,
                  }}>
                  Night mode
                </Text>

                <Switch
                  trackColor={{false: '#d3d3d3', true: '#407BFF'}}
                  thumbColor={night ? '#fff' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={value => NightMode(value)}
                  value={night}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingVertical: 20,
                borderBottomWidth: night ? 0 : 1,
                paddingVertical: 20,
                borderBottomColor: '#d3d3d3',
                paddingHorizontal: night ? 20 : 0,
                backgroundColor: night ? '#333' : null,
                borderRadius: night ? 10 : 0,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  color: night ? '#fff' : '#272727',
                  marginBottom: 20,
                  fontSize: fonts,
                }}>
                ABOUT
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('About')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 50,
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color: night ? '#fff' : '#272727',
                      fontSize: fonts,
                    }}>
                    About
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: 50,
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color: night ? '#fff' : '#272727',
                      fontSize: fonts,
                    }}>
                    Credits
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 50,
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: night ? '#fff' : '#272727',
                    fontSize: fonts,
                  }}>
                  Terms & Privacy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 50,
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: night ? '#fff' : '#272727',
                    fontSize: fonts,
                  }}>
                  Copyrights
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: 50,

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: fonts,
                color: night ? '#fff' : '#272727',
              }}>
              App version v1.0.0
            </Text>
          </View>
        </ScrollView>
        <Provider>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}>
              <View
                style={{
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  backgroundColor: night ? '#333' : '#fff',
                }}>
                <RadioButton.Group
                  onValueChange={value => setLanguage(value)}
                  value={language}>
                  <RadioButton.Item
                    accessibilityLabel="red"
                    labelStyle={{
                      fontFamily: 'Poppins-Regular',
                      color: night ? '#fff' : '#272727',
                      fontSize: 14,
                    }}
                    style={{
                      justifyContent: 'space-between',
                      borderRadius: 5,
                      width: '80%',
                      paddingVertical: 10,
                    }}
                    color="#407BFF"
                    label="English"
                    value="english"
                  />
                </RadioButton.Group>
              </View>
            </Modal>

            <Modal
              visible={fontVisible}
              onDismiss={() => setFontVisible(false)}
              contentContainerStyle={containerStyle}>
              <View
                style={{
                  borderRadius: 10,
                  width: '100%',
                  overflow: 'hidden',
                  backgroundColor: night ? '#333' : '#fff',
                }}>
                <RadioButton.Group
                  onValueChange={value => handleSubmit(value)}
                  value={fonts}>
                  <RadioButton.Item
                    labelStyle={{
                      fontFamily: 'Poppins-Regular',
                      color: night ? '#fff' : '#272727',
                      fontSize: 12,
                    }}
                    style={{
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                    color="#407BFF"
                    label="Small"
                    value={12}
                  />

                  <RadioButton.Item
                    labelStyle={{
                      fontFamily: 'Poppins-Regular',
                      color: night ? '#fff' : '#272727',
                      fontSize: 14,
                    }}
                    style={{
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                    color="#407BFF"
                    label="Medium"
                    value={14}
                  />

                  <RadioButton.Item
                    labelStyle={{
                      fontFamily: 'Poppins-Regular',
                      color: night ? '#fff' : '#272727',
                      fontSize: 16,
                    }}
                    style={{
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                    color="#407BFF"
                    label="Large"
                    value={16}
                  />
                </RadioButton.Group>
              </View>
            </Modal>
          </Portal>
        </Provider>
      </SafeAreaView>
    </>
  );
};

export default Profile;
