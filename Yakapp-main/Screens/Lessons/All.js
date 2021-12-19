import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import HeaderBack from '../../Shared/HeaderBack';
import {Searchbar} from 'react-native-paper';

const All = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <HeaderBack nav={navigation} title="Lessons" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 20}}>
          <View style={{marginBottom: 20}}>
            <Searchbar
              iconColor="#407BFF"
              inputStyle={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                color: '#272727',
                paddingBottom: 5,
                paddingLeft: 0,
              }}
              style={{
                elevation: 0,
                height: 40,
                backgroundColor: '#eee',
                padding: 0,
                borderRadius: 100,
              }}
              placeholder="Search for a lesson"
            />
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{width: 'auto', height: 'auto', marginBottom: 20}}>
            <TouchableOpacity
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
                backgroundColor: '#407BFF',
                borderRadius: 100,
                marginRight: 10,
              }}>
              <Text style={{fontFamily: 'Poppins-Medium', color: '#fff'}}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
                backgroundColor: '#eee',
                borderRadius: 100,
                marginRight: 10,
              }}>
              <Text style={{fontFamily: 'Poppins-Regular', color: '#808080'}}>
                Beginner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
                backgroundColor: '#eee',
                borderRadius: 100,
                marginRight: 10,
              }}>
              <Text style={{fontFamily: 'Poppins-Regular', color: '#808080'}}>
                Intermediate
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                paddingVertical: 5,
                paddingHorizontal: 20,
                backgroundColor: '#eee',
                borderRadius: 100,
                marginRight: 10,
              }}>
              <Text style={{fontFamily: 'Poppins-Regular', color: '#808080'}}>
                Advance
              </Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity
            style={{
              width: '100%',
              height: 200,
              backgroundColor: '#fff',
              borderRadius: 10,
              overflow: 'hidden',
              marginBottom: 20,
            }}>
            {/* <ImageBackground
              resizeMode="cover"
              style={{
                height: '100%',
              }}
              source={require('../../Assets/BG/1.png')}
            /> */}
            <View
              style={{
                height: '35%',
                justifyContent: 'center',
                paddingLeft: 20,
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#000',
                width: '100%',
                opacity: 0.4,
              }}></View>
            <View
              style={{
                borderRadius: 10,
                height: '35%',
                justifyContent: 'center',
                paddingLeft: 20,
                position: 'absolute',
                bottom: 0,
                width: '100%',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: '#FFF',
                  fontSize: 18,
                }}>
                Beginner
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  marginTop: -5,
                  color: '#FFF',
                }}>
                7 Chapters - 20 mins
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '100%',
              height: 200,
              backgroundColor: '#fff',
              borderRadius: 10,
              overflow: 'hidden',
              marginBottom: 20,
            }}>
            {/* <ImageBackground
              resizeMode="cover"
              style={{
                height: '100%',
              }}
              source={require('../../Assets/BG/2.png')}
            /> */}
            <View
              style={{
                height: '35%',
                justifyContent: 'center',
                paddingLeft: 20,
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#000',
                width: '100%',
                opacity: 0.4,
              }}></View>
            <View
              style={{
                height: '35%',
                justifyContent: 'center',
                paddingLeft: 20,
                position: 'absolute',
                bottom: 0,
                width: '100%',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: '#FFF',
                  fontSize: 18,
                }}>
                Beginner
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  marginTop: -5,
                  color: '#FFF',
                }}>
                7 Chapters - 20 mins
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '100%',
              height: 200,
              backgroundColor: '#fff',
              borderRadius: 10,
              overflow: 'hidden',
              marginBottom: 20,
            }}>
            {/* <ImageBackground
              resizeMode="cover"
              style={{
                height: '100%',
              }}
              source={require('../../Assets/BG/3.jpg')}
            /> */}
            <View
              style={{
                height: '35%',
                justifyContent: 'center',
                paddingLeft: 20,
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#000',
                width: '100%',
                opacity: 0.4,
              }}></View>
            <View
              style={{
                height: '35%',
                justifyContent: 'center',
                paddingLeft: 20,
                position: 'absolute',
                bottom: 0,
                width: '100%',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: '#FFF',
                  fontSize: 18,
                }}>
                Beginner
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  marginTop: -5,
                  color: '#FFF',
                }}>
                7 Chapters - 20 mins
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default All;
