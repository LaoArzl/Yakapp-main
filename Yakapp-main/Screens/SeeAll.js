import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import HeaderBack from '../Shared/HeaderBack';
import {Searchbar} from 'react-native-paper';
import {useSelector} from 'react-redux';

const SeeAll = ({navigation}) => {
  const lesson = useSelector(state => state.lesson.value);
  const {width, height} = Dimensions.get('window');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HeaderBack nav={navigation} title="All Lessons" />
      <View style={{paddingHorizontal: 20}}>
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
            backgroundColor: '#f4f4f4',
            padding: 0,
            borderRadius: 100,
            marginBottom: 10,
          }}
          placeholder="Search lessons"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <FlatList
            data={lesson}
            keyExtractor={item => item.key}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Lesson', {
                      lessonId: item._id,
                      lesson: item,
                      color:
                        index % 3 === 0
                          ? 'rgba(30, 144, 255, 0.5)'
                          : index % 3 === 1
                          ? 'rgba(255, 127, 80, 0.5)'
                          : index % 3 === 2
                          ? 'rgba(255, 165, 2, 0.5)'
                          : 'rgba(46, 213, 115, 0.5)',
                    })
                  }
                  style={{
                    minHeight: 'auto',
                    width: width - 40,
                    borderRadius: 10,
                    marginBottom: 20,
                    borderWidth: 1,
                    borderColor: '#d3d3d3',
                    elevation: 1,
                    backgroundColor: '#fff',
                  }}>
                  <Image
                    source={{uri: item.icon}}
                    style={
                      ([StyleSheet.absoluteFillObject],
                      {
                        resizeMode: 'cover',
                        width: '100%',
                        height: 200,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      })
                    }
                  />

                  <View
                    style={{
                      width: '100%',
                      height: 'auto',
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        color: '#272727',
                        fontSize: 18,
                      }}>
                      {item.lessonTitle}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#272727',
                      }}>
                      {item.chapters.length}{' '}
                      {item.chapters.length > 1 ? 'Lessons' : 'Lesson'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Pronunciation')}
            style={{
              minHeight: 'auto',
              width: width - 40,
              borderRadius: 10,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: '#d3d3d3',
              elevation: 1,
              backgroundColor: '#fff',
            }}>
            <Image
              source={require('../Assets/mic.jpg')}
              style={
                ([StyleSheet.absoluteFillObject],
                {
                  resizeMode: 'cover',
                  width: '100%',
                  height: 200,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                })
              }
            />

            <View
              style={{
                width: '100%',
                height: 'auto',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: '#272727',
                  fontSize: 18,
                }}>
                Pronunciations
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#272727',
                }}>
                172 phrases and words
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeeAll;
