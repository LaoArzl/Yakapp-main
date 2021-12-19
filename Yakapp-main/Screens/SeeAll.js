import React from 'react';
import {View, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import HeaderBack from '../Shared/HeaderBack';
import {Searchbar} from 'react-native-paper';
import {useSelector} from 'react-redux';

const SeeAll = ({navigation}) => {
  const lesson = useSelector(state => state.lesson.value);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HeaderBack nav={navigation} title="All Lessons" />
      <ScrollView>
        <View style={{padding: 20}}>
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
              marginTop: -10,
            }}
            placeholder="Search lessons"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeeAll;
