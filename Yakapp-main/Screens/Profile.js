import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
} from 'react-native';

const Profile = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [switchs, setSwitchs] = useState(false);
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
              color: '#fff',
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
                borderBottomWidth: 1,
                paddingVertical: 20,
                borderBottomColor: '#d3d3d3',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  color: '#272727',
                  marginBottom: 20,
                }}>
                CONTENT
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity>
                  <Text
                    style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                    Language
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    color: '#272727',
                    marginBottom: 20,
                  }}>
                  English
                </Text>
              </View>

              <TouchableOpacity>
                <Text style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                  Take the survey
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                paddingVertical: 20,
                borderBottomColor: '#d3d3d3',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  color: '#272727',
                  marginBottom: 20,
                }}>
                ACCESSIBILITY
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity>
                  <Text
                    style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                    Font size
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    color: '#272727',
                    marginBottom: 20,
                  }}>
                  Medium
                </Text>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity>
                  <Text
                    style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                    Night mode
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    color: '#272727',
                  }}>
                  Off
                </Text>
              </View>
            </View>

            <View
              style={{
                borderBottomWidth: 1,
                paddingVertical: 20,
                borderBottomColor: '#d3d3d3',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  color: '#272727',
                  marginBottom: 20,
                }}>
                ABOUT
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{marginBottom: 20}}>
                  <Text
                    style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                    About
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{marginBottom: 20}}>
                  <Text
                    style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                    Credits
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={{marginBottom: 20}}>
                <Text style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                  Terms & Privacy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{marginBottom: 20}}>
                <Text style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                  Privacy
                </Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
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
            <Text style={{fontFamily: 'Poppins-Regular'}}>
              App version v1.0.0
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Profile;
