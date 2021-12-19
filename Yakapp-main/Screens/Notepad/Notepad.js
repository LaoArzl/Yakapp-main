import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import HeaderBack from '../../Shared/HeaderBack';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Searchbar} from 'react-native-paper';

const Notepad = ({navigation}) => {
  const [data, setData] = useState([]);
  const [notes, setNotes] = useState([]);
  const [state, setState] = useState('');
  const [query, setQuery] = useState('');
  const [text, setText] = useState();
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('note');
      return jsonValue != null ? setData(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      setNotes(JSON.parse(result));
    }
  };

  useEffect(() => {
    findNotes();
  }, [state]);

  const handleSearchInput = text => {
    setQuery(text);

    if (!text.trim()) {
      setQuery('');
      findNotes();
    }
    const filteredNotes = notes.filter(e => {
      if (e.title.toLowerCase().includes(text.toLowerCase())) {
        return e;
      }
    });

    if (filteredNotes) {
      setNotes([...filteredNotes]);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <HeaderBack nav={navigation} title="Notes" background="#fff" />
        <View style={{paddingHorizontal: 20, paddingBottom: 10}}>
          <Searchbar
            onChangeText={text => handleSearchInput(text)}
            iconColor="#407BFF"
            autoFocus={true}
            placeholder="Search Notes"
            inputStyle={{
              fontFamily: 'Poppins-Regular',
              fontSize: 14,
              color: '#272727',
              paddingBottom: 5,
              paddingLeft: 0,
            }}
            style={{
              height: 40,
              width: '100%',
              borderWidth: 0,
              borderRadius: 100,
              elevation: 0,
              backgroundColor: '#f4f4f4',
            }}
          />
        </View>
        <ScrollView
          style={{
            padding: 20,
            paddingVertical: 10,
            backgroundColor: '#fff',
          }}>
          <View>
            {notes.map(e => {
              return (
                <TouchableOpacity
                  onLongPress={() => navigation.navigate('DeleteAll')}
                  onPress={() =>
                    navigation.navigate('Content', {
                      content: e,
                      setNotes,
                      setState,
                    })
                  }
                  style={{
                    backgroundColor: '#f4f4f4',
                    padding: 20,
                    borderRadius: 20,
                    marginBottom: 15,
                  }}
                  key={e.id}>
                  <Text
                    numberOfLines={1}
                    style={{fontFamily: 'Poppins-SemiBold', color: '#272727'}}>
                    {e.title ? e.title : '(No title)'}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#272727',
                      marginBottom: 15,
                    }}>
                    {e.body}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 12,
                    }}>
                    {e.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <TouchableOpacity
          // onPress={() => clearAll()}
          onPress={() =>
            navigation.navigate('Create', {notes, setNotes, setState})
          }
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: '#407BFF',
            position: 'absolute',
            right: 20,
            bottom: 30,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            elevation: 8,
          }}>
          <SimpleLineIcons name="note" size={20} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default Notepad;
