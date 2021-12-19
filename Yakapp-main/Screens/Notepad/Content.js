import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Content = ({navigation, route}) => {
  const {content, setNotes, setState} = route.params;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    setTitle(content.title);
    setBody(content.body);
  }, []);

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

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) {
      notes = JSON.parse(result);
    }

    const newNotes = notes.filter(e => e.id !== content.id);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    setState('Deleted');
    setTimeout(() => setState(''), 500);
    navigation.goBack();
  };

  const editNote = async () => {
    setDropdown(false);
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) {
      notes = JSON.parse(result);
    }

    const newNotes = notes.filter(e => {
      if (e.id === content.id) {
        e.title = title;
        e.body = body;
        e.time = strTime + ' ' + dateNow;
      }
      return e;
    });
    setNotes(newNotes);
    setState('Updating....');
    setTimeout(() => setState(''), 1000);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    setSave(true);
    setTimeout(() => setSave(false), 5000);
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            height: 55,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              height: '100%',
              width: '10%',
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginRight: 10,
            }}>
            <Ionicons name="arrow-back" size={26} color="#407BFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              backgroundColor: dropdown ? '#eee' : '#fff',
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => setDropdown(!dropdown)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="#272727"
            />
          </TouchableOpacity>
        </View>
        <View>
          {dropdown && (
            <View
              style={{
                position: 'absolute',
                width: 150,
                height: 'auto',
                minHeight: 80,
                elevation: 8,
                backgroundColor: '#fff',
                right: 20,
                top: 0,
                borderRadius: 10,
                paddingLeft: 20,
                zIndex: 1000,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setConfirm(true);
                  setDropdown(false);
                }}
                style={{height: '50%', widt: '100%', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                  Delete
                </Text>
              </TouchableOpacity>
              {content.body !== body || content.title !== title ? (
                <TouchableOpacity
                  onPress={() => editNote()}
                  style={{
                    height: '50%',
                    widt: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontFamily: 'Poppins-Medium', color: '#272727'}}>
                    Save
                  </Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    height: '50%',
                    widt: '100%',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{fontFamily: 'Poppins-Medium', color: '#d3d3d3'}}>
                    Save
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        <ScrollView>
          <View style={{padding: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: 'grey',
                fontSize: 12,
                marginBottom: 20,
              }}>
              {strTime + ' ' + dateNow}
            </Text>
            <TextInput
              onChangeText={text => setTitle(text)}
              value={title}
              style={{
                fontSize: 20,
                fontFamily: 'Poppins-SemiBold',
              }}
              placeholder="Title"
              placeholderTextColor="#272727"
            />

            <TextInput
              onChangeText={text => setBody(text)}
              value={body}
              placeholder="Note something down"
              placeholderTextColor="#272727"
              multiline={true}
              textAlignVertical="top"
              numberOfLines={20}
              style={{
                marginBottom: 20,
                fontFamily: 'Poppins-Regular',
                zIndex: -1,
              }}
            />
          </View>
        </ScrollView>
        {confirm && (
          <View
            style={{
              paddingHorizontal: 20,
              alignItems: 'center',
              position: 'absolute',
              bottom: 20,
              height: 150,
              width: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#fff',
                elevation: 8,
                borderRadius: 15,
              }}>
              <View
                style={{
                  width: '100%',
                  height: '30%',
                  justifyContent: 'center',
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20,
                }}>
                <Text
                  style={{fontFamily: 'Poppins-SemiBold', color: '#272727'}}>
                  Delete Note
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: '30%',
                  justifyContent: 'center',
                  paddingLeft: 20,
                  paddingRight: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: '#d3d3d3',
                }}>
                <Text style={{fontFamily: 'Poppins-Regular', color: '#272727'}}>
                  Are you sure you want to delete this note?
                </Text>
              </View>
              <View
                style={{
                  height: '40%',
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  onPress={() => setConfirm(false)}
                  style={{
                    width: '50%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 16}}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteNote()}
                  style={{
                    width: '50%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: 'red',
                      fontSize: 16,
                    }}>
                    DELETE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {save && (
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
                borderRadius: 5,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#eee', fontFamily: 'Poppins-Regular'}}>
                Note updated.
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
        )}
      </SafeAreaView>
    </>
  );
};

export default Content;
