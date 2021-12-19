import React, {useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Create = ({navigation, route}) => {
  const {notes, setNotes, setState} = route.params;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [now, setNow] = useState('');
  const [save, setSave] = useState(false);

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

  const handleSubmit = async () => {
    const note = {id: Date.now(), title, body, time: strTime + ' ' + dateNow};
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    setState('Updating....');
    setTimeout(() => setState(''), 1000);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    setSave(true);
    setTimeout(() => setSave(false), 5000);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            height: 55,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
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
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 18,
              color: '#272727',
              marginTop: 4,
            }}>
            Create Note
          </Text>
          {body !== '' && (
            <TouchableOpacity
              onPress={() => {
                handleSubmit();
                Keyboard.dismiss();
              }}
              style={{position: 'absolute', right: 20}}>
              <Feather name="check" size={24} color="#272727" />
            </TouchableOpacity>
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
                backgroundColor: '#fff',
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
                backgroundColor: '#fff',
                marginBottom: 20,
                fontFamily: 'Poppins-Regular',
              }}
            />
          </View>
        </ScrollView>
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
                borderRadius: 100,
                paddingHorizontal: 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                elevation: 4,
              }}>
              <Text style={{color: '#eee', fontFamily: 'Poppins-Regular'}}>
                Note saved.
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

export default Create;
