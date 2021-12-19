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
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

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

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#f4f4f4'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <HeaderBack nav={navigation} background="#fff" />
        <View
          style={{
            paddingHorizontal: 20,
            height: 200,
            backgroundColor: '100%',
            paddingTop: 10,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: color,
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
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              color: '#272727',
              fontSize: 20,
              marginBottom: 8,
            }}>
            {lesson.lessonTitle}
          </Text>

          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: '#838383',
              fontSize: 14,
              lineHeight: 24,
            }}>
            {lesson.description ? lesson.description : 'No description.'}
          </Text>
        </View>

        <ScrollView>
          <View
            style={{
              backgroundColor: '#fff',
              width: '120%',
              height: 50,
              position: 'absolute',
              left: 0,
              top: 0,
              zIndex: -4,
            }}></View>
          <View
            style={{
              backgroundColor: '#f4f4f4',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
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
                    height: 50,
                    paddingHorizontal: 10,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      marginRight: 10,
                      color: '#272727',
                    }}>
                    {key + 1}.
                  </Text>

                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      marginRight: 5,
                      color: '#272727',
                    }}>
                    {e.title}
                  </Text>
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
