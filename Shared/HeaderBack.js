import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const HeaderBack = props => {
  const [night, setNight] = useState(null);
  const appState = useSelector(state => state.appState.value);
  const findNight = async () => {
    const result = await AsyncStorage.getItem('night');
    if (result !== null) {
      setNight(JSON.parse(result));
    }
  };
  useEffect(() => {
    findNight();
  }, [appState]);
  return (
    <View
      style={{
        height: 55,
        paddingHorizontal: 20,
        width: '100%',
        borderBottomWidth: props.border === true ? 0.5 : 0,
        borderBottomColor: '#d3d3d3',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: night ? '#272727' : props.background ? props.background : '#fff',
      }}>
      <TouchableOpacity
        onPress={() =>
          props.destination
            ? props.nav.navigate(props.destination)
            : props.nav.goBack()
        }
        style={{
          height: '100%',
          width: '10%',
          justifyContent: 'center',
          marginRight: 10,
        }}>
        <Ionicons
          name="arrow-back"
          size={26}
          color={props.color ? props.color : '#407BFF'}
        />
      </TouchableOpacity>
      <Text
        style={{
          marginTop: 4,
          color: night ? '#fff' : props.color ? props.color : '#272727',
          fontFamily: 'Poppins-Medium',
          fontSize: 18,
          textTransform: 'capitalize',
        }}>
        {props.title}
      </Text>
    </View>
  );
};

export default HeaderBack;
