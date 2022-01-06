import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import HeaderBack from '../Shared/HeaderBack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Terms = ({navigation}) => {
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
      <StatusBar
        barStyle={night ? 'light-content' : 'dark-content'}
        backgroundColor={night ? '#272727' : '#fff'}
      />
      <SafeAreaView
        style={{flex: 1, backgroundColor: night ? '#272727' : '#fff'}}>
        <HeaderBack nav={navigation} />
        <ScrollView>
          <View style={{padding: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: night ? '#fff' : '#272727',
                fontSize: fonts === 12 ? 18 : fonts === 14 ? 20 : 22,
                marginBottom: 20,
              }}>
              Terms & Conditions
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: night ? '#fff' : '#272727',
                marginBottom: 20,
                fontSize: fonts,
              }}>
              Welcome to Yakapp! These terms and conditions outline the rules
              and regulations for the use of Yakapp. By using this app we assume
              you accept these terms and conditions. Do not continue to use
              Yakapp if you do not agree to take all of the terms and conditions
              stated on this page. {'\n'}
              {'\n'}
              The following terminology applies to these Terms and Conditions,
              Privacy Statement and Disclaimer Notice and all Agreements:
              "Client", "You" and "Your" refers to you, the person log on this
              website and compliant to the Company’s terms and conditions. "The
              Company", "Ourselves", "We", "Our" and "Us", refers to our
              Company. "Party", "Parties", or "Us", refers to both the Client
              and ourselves. All terms refer to the offer, acceptance and
              consideration of payment necessary to undertake the process of our
              assistance to the Client in the most appropriate manner for the
              express purpose of meeting the Client’s needs in respect of
              provision of the Company’s stated services, in accordance with and
              subject to, prevailing law of Netherlands. Any use of the above
              terminology or other words in the singular, plural, capitalization
              and/or he/she or they, are taken as interchangeable and therefore
              as referring to same. Our Terms and Conditions were created with
              the help of the App Terms and Conditions Generator from
              App-Privacy-Policy.com
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: night ? '#fff' : '#272727',
                fontSize: fonts === 12 ? 18 : fonts === 14 ? 20 : 22,
                marginBottom: 20,
              }}>
              License
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: night ? '#fff' : '#272727',
                marginBottom: 20,
                fontSize: fonts,
              }}>
              Unless otherwise stated, Yakapp and/or its licensors own the
              intellectual property rights for all material on Yakapp. All
              intellectual property rights are reserved. You may access this
              from Yakapp for your own personal use subjected to restrictions
              set in these terms and conditions. {'\n'}
              {'\n'}You must not: {'\n'} {'\n'}- Republish material from Yakapp{' '}
              {'\n'}- Sell, rent or sub-license material from Yakapp {'\n'}-
              Reproduce, duplicate or copy material from Yakapp {'\n'}-
              Redistribute content from Yakapp {'\n'}
              {'\n'}
              This Agreement shall begin on the date hereof.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Terms;
