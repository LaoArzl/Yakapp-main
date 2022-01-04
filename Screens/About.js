import React from 'react';
import {View, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import HeaderBack from '../Shared/HeaderBack';

const About = ({navigation}) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#272727'} />
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <HeaderBack title="About" nav={navigation} />
        <ScrollView>
          <View style={{padding: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: '#272727',
                fontSize: 20,
              }}>
              About the Yakapp{' '}
            </Text>
            <Text></Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default About;
