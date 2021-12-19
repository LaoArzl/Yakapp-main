import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteAll = ({navigation}) => {
  const [item, setItem] = useState([]);
  const [notes, setNotes] = useState([]);
  const [state, setState] = useState('');

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    if (result !== null) {
      setNotes(JSON.parse(result));
    }
  };

  useEffect(() => {
    findNotes();
  }, [state]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          height: 55,
          paddingHorizontal: 20,
          width: '100%',
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
            marginRight: 10,
          }}>
          <Ionicons name="arrow-back" size={26} color="#407BFF" />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 4,
            color: '#272727',
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            textTransform: 'capitalize',
          }}>
          {item.length} {item.length > 1 ? 'items' : 'item'} selected
        </Text>
      </View>
      <ScrollView>
        <View style={{padding: 20}}>
          {notes.map(e => {
            return (
              <TouchableOpacity
                onPress={() => setItem([...item, {id: e.id}])}
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
    </SafeAreaView>
  );
};

export default DeleteAll;
