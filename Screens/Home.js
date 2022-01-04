import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Animated,
} from 'react-native';
import {Text} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {changeAppState} from '../features/appState';
import { updateLesson } from '../features/lessons';
import {Searchbar} from 'react-native-paper';
import axios from 'axios';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const Home = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [fonts, setFonts] = useState(null);
  

  const onRefresh = useCallback(() => {
    AsyncLessons();
    AsyncWords();
    setRefreshing(true);
    dispatch(changeAppState('updating'));
    wait(2000).then(() => {
      dispatch(changeAppState(''));
      setRefreshing(false);
    });
  }, []);

  const {width, height} = Dimensions.get('window');
  const lesson = useSelector(state => state.lesson.value);
  const appState = useSelector(state => state.appState.value);
  const [userValue, setUserValue] = useState('');
  const [night, setNight] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_details');
      if (value !== null) {
        setUserValue(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [appState]);

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

  const findWords = async () => {
    const result = await AsyncStorage.getItem('translations');
    if (result !== null) {
      dispatch(updateWord(JSON.parse(result)));
    } else {
      axios.get('https://yakapp.herokuapp.com/words').then(response => {
        AsyncStorage.setItem('translations', JSON.stringify(response.data));
        
      });
    }
  };

  const AsyncWords = () => {
    axios.get('https://yakapp.herokuapp.com/words').then(response => {
        AsyncStorage.setItem('translations', JSON.stringify(response.data));
        
      });
  }

  const AsyncLessons = () => {
    axios.get('https://yakapp.herokuapp.com/add-lesson').then(response => {
      AsyncStorage.setItem('lessons', JSON.stringify(response.data));
      
    });
  }

  const findLessons = async () => {
    const result = await AsyncStorage.getItem('lessons');
    if (result !== null) {
      dispatch(updateLesson(JSON.parse(result)));
    } else {
      axios.get('https://yakapp.herokuapp.com/add-lesson').then(response => {
        AsyncStorage.setItem('lessons', JSON.stringify(response.data));
        
      });
    }
  };


  useEffect(() => {
    findFonts();
    findNight();
    findWords();
    findLessons();
  }, [appState]);

  return (
    <>
      <SafeAreaView
        style={{backgroundColor: night ? '#272727' : '#fff', flex: 1}}>
        <StatusBar barStyle={night ? 'dark-content' : "light-content"} backgroundColor="#407BFF" />
        <LinearGradient
          colors={['#407BFF', '#40C6FF']}
          style={styles.headerBackground}>
          <Image
            style={{
              position: 'absolute',
              width: 150,
              height: 150,
              right: 55,
              top: -25,
              opacity: 0.6,
            }}
            source={require('../Assets/orange-triangle.png')}
          />

          <Image
            style={styles.pinkTriangle}
            source={require('../Assets/pink-triangle.png')}
          />

          <Image
            style={styles.headerPerson}
            source={require('../Assets/saly.png')}
          />

          <Text
            style={{
              color: night ? '#272727' : '#fff',
              fontSize: fonts === 12 ? 23 : fonts === 14 ? 25 : 27,
              marginBottom: 2,
              fontFamily: 'Poppins-Bold',
              zIndex: 4,
            }}>
            Hello User
          </Text>
          <Text
            style={{
              color: night ? '#272727' : '#fff',
              fontSize: fonts === 12 ? 14 : fonts === 14 ? 16 : 18,
              fontFamily: 'Poppins-Regular',
              marginTop: -5,
              zIndex: 4,
            }}>
            How are you today?
          </Text>
        </LinearGradient>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={['#407BFF']}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingTop: 20,
              backgroundColor: night ? '#272727' : '#fff',
            }}>
            <Text
              style={{
                color: night ? '#fff' : '#272727',
                fontSize: fonts === 12 ? 18 : fonts === 14 ? 20 : 22,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Categories
            </Text>
          </View>
          <View
            style={{
              backgroundColor: night ? '#272727' : '#fff',
              flexDirection: 'row',
              paddingVertical: 20,
              justifyContent: 'space-between',
            }}>
            <View style={styles.categoryDivider}>
              <TouchableOpacity
                onPress={() => navigation.navigate('DictionaryStackScreen')}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: night ? '#333' : '#ECF1F4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  marginBottom: 5,
                }}>
                <MaterialCommunityIcons
                  name="book-search"
                  size={22}
                  color="#407BFF"
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  marginTop: 10,
                  fontSize: fonts === 12 ? 10 : fonts === 14 ? 12 : 14,
                  color: night ? '#fff' : '#272727',
                }}>
                Dictionary
              </Text>
            </View>

            <View style={styles.categoryDivider}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Favorites')}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: night ? '#333' : '#ECF1F4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  marginBottom: 5,
                }}>
                <Ionicons name="heart" size={22} color="#407BFF" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  marginTop: 10,
                  fontSize: fonts === 12 ? 10 : fonts === 14 ? 12 : 14,
                  color: night ? '#fff' : '#272727',
                }}>
                Favorites
              </Text>
            </View>

            <View style={styles.categoryDivider}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotepadStack')}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: night ? '#333' : '#ECF1F4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  marginBottom: 5,
                }}>
                <Ionicons name="pencil" size={22} color="#407BFF" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  marginTop: 10,
                  fontSize: fonts === 12 ? 10 : fonts === 14 ? 12 : 14,
                  color: night ? '#fff' : '#272727',
                }}>
                Notes
              </Text>
            </View>

            <View style={styles.categoryDivider}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TranslateStack')}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: night ? '#333' : '#ECF1F4',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  marginBottom: 5,
                }}>
                <MaterialCommunityIcons
                  name="google-translate"
                  size={22}
                  color="#407BFF"
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  marginTop: 10,
                  fontSize: fonts === 12 ? 10 : fonts === 14 ? 12 : 14,
                  color: night ? '#fff' : '#272727',
                }}>
                Translate
              </Text>
            </View>
          </View>

          <View style={{padding: 20}}>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: night ? '#fff' : '#272727',
                  fontSize: fonts === 12 ? 18 : fonts === 14 ? 20 : 22,
                  fontFamily: 'Poppins-SemiBold',
                  marginBottom: 10,
                }}>
                Lessons for you
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SeeAll')}>
                <Text
                  style={{
                    color: '#407BFF',
                    fontFamily: 'Poppins-Medium',
                    fontSize: fonts,
                  }}>
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            <Animated.FlatList
              data={lesson}
              keyExtractor={item => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={280}
              decelerationRate={'fast'}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
              renderItem={({item, index}) => {
                const inputRange = [
                  (index - 1) * 280,
                  index * 280,
                  (index + 1) * 280,
                ];

                const translateX = scrollX.interpolate({
                  inputRange,
                  outputRange: [260, 0, -260],
                });

                const translateY = scrollX.interpolate({
                  inputRange,
                  outputRange: [260, 0, -260],
                });

                const translateY2 = scrollX.interpolate({
                  inputRange,
                  outputRange: [260, -90, -260],
                });

                const translateX2 = scrollX.interpolate({
                  inputRange,
                  outputRange: [260, -90, -260],
                });
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
                      width: 260,
                      borderRadius: 10,
                      marginRight: 20,
                    }}>
                    <Image
                      source={{uri: item.icon}}
                      style={
                        ([StyleSheet.absoluteFillObject],
                        {
                          resizeMode: 'cover',
                          width: '100%',
                          height: 200,
                          borderRadius: 10,
                        })
                      }
                    />

                    <Animated.View
                      style={{
                        width: '100%',
                        height: 'auto',
                        marginTop: 10,
                        paddingHorizontal: 10,
                        transform:
                          lesson.length === index + 1
                            ? [{translateX: translateX2}]
                            : [{translateX}],
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-SemiBold',
                          color: night ? '#fff' : '#272727',
                          fontSize: fonts === 12 ? 16 : fonts === 14 ? 18 : 20,
                        }}>
                        {item.lessonTitle}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: night ? '#fff' : '#272727',
                          marginTop: -4,
                          fontSize: fonts,
                        }}>
                        {item.chapters.length}{' '}
                        {item.chapters.length > 1 ? 'Lessons' : 'Lesson'}
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    marginBottom: 2,
    fontFamily: 'Poppins-Bold',
    zIndex: 4,
  },
  greetings: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginTop: -5,
    zIndex: 4,
  },

  headerBackground: {
    height: 150,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  headerImage: {
    position: 'absolute',
    width: 200,
    height: 200,
    opacity: 0.5,
    right: 0,
    zIndex: 3,
  },
  headerExtension: {
    height: 50,
    zIndex: -1,
  },

  categoryContainer2: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  categoryDivider: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    width: '25%',
  },

  categoryDividerDiactive: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    opacity: 0.2,
  },
  IconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#ECF1F4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 5,
  },
  IconLabel: {
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
    fontSize: 12,
    color: '#272727',
  },

  pinkTriangle: {
    position: 'absolute',
    width: 160,
    height: 160,
    right: -40,
    top: 70,
    opacity: 0.9,
  },

  headerPerson: {
    width: 150,
    height: 150,
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
});
