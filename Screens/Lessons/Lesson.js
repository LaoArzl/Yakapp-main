import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import HeaderBack from '../../Shared/HeaderBack';
import Axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Lesson = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {lesson, color, lessonId} = route.params;
  const {width, height} = Dimensions.get('window');
  const [state, setState] = useState('');

  const submitUpdate = id => {
    Axios.put(`http://10.0.2.2:3001/${id}/completed`)
      .then(response => {
        if (response.data) {
          setState('sucess');
          setTimeout(() => setState(''), 500);
        }
      })
      .catch(e => console.log(e.response.data));
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
    findFonts();
    findNight();
  }, [appState]);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: night ? '#272727' : '#f4f4f4'}}>
        <StatusBar barStyle={night ? 'light-content' : "dark-content"} backgroundColor={night ? '#272727' : "#fff"} />
        <HeaderBack nav={navigation} background="#fff" border={night ? false : true} />

        <ScrollView>
          <View
            style={{
              paddingHorizontal: 20,
              height: 200,
              backgroundColor: '100%',
              paddingTop: 10,
              backgroundColor: night ? '#272727' : '#f4f4f4',
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
              <Image
                style={{width: '100%', height: '100%', resizeMode: 'cover'}}
                source={{uri: lesson.icon}}
              />
            </View>
          </View>
          <View
            style={{
              minHeight: 100,
              width: '100%',
              zIndex: 3,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: night ? '#fff' : '#272727',
                fontSize: fonts === 12 ? 18 : fonts === 14 ? 20 : 22,
                marginBottom: 8,
              }}>
              {lesson.lessonTitle}
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: night ? '#d3d3d3' : '#808080',
                fontSize: fonts,
                lineHeight: 24,
              }}>
              {lesson.description ? lesson.description : 'No description.'}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: night ? '#272727' :  '#f4f4f4',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              paddingTop: 10,
              zIndex: 2,
            }}>
            {lesson.chapters.map((e, key) => {
              return (
                <TouchableOpacity
                  key={e._id}
                  onPress={() => {
                    navigation.navigate('Chapter', {
                      chapter: e,
                      color: color,
                      key: key + 1,
                      lessonId,
                      chapterId: e._id,
                    });
                  }}
                  style={{
                    width: '100%',
                    height: 80,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: night ? '#333' : '#FFF',
                    marginBottom: 10,
                    borderRadius: 10,
                  }}>
                  <Entypo
                    style={{position: 'absolute', right: 10}}
                    name="chevron-small-right"
                    size={24}
                    color={night ? '#fff' : "#272727"}
                  />
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      backgroundColor: night ? '#272727' : '#eee',
                      marginRight: 15,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: '80%', height: '80%'}}
                      source={require('../../Assets/lessons.png')}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        marginRight: 10,
                        color: night ? '#d3d3d3' : '#808080',
                        fontSize: fonts === 12 ? 10 : fonts === 14 ? 12 : 14,
                      }}>
                      Lesson {key + 1}
                    </Text>

                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        marginRight: 5,
                        color: night ? '#fff' : '#272727',
                        fontSize: fonts
                      }}>
                      {e.title}
                    </Text>
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

export default Lesson;
