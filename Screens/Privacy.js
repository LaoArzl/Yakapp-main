import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import HeaderBack from '../Shared/HeaderBack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Privacy = ({navigation}) => {
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
              Privacy Policy
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: night ? '#fff' : '#272727',
                marginBottom: 20,
                fontSize: fonts,
              }}>
              Last updated: January 05, 2022 {'\n'} {'\n'}
              This Privacy Policy describes Our policies and procedures on the
              collection, use and disclosure of Your information when You use
              the Service and tells You about Your privacy rights and how the
              law protects You. {'\n'} {'\n'}
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of
              information in accordance with this Privacy Policy. This Privacy
              Policy has been created with the help of the Privacy Policy
              Template.
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: night ? '#fff' : '#272727',
                fontSize: fonts === 12 ? 18 : fonts === 14 ? 20 : 22,
                marginBottom: 20,
              }}>
              Retention of Your Personal Data
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: night ? '#fff' : '#272727',
                marginBottom: 20,
                fontSize: fonts,
              }}>
              The Company will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will
              retain and use Your Personal Data to the extent necessary to
              comply with our legal obligations (for example, if we are required
              to retain your data to comply with applicable laws), resolve
              disputes, and enforce our legal agreements and policies. {'\n'}
              {'\n'}
              The Company will also retain Usage Data for internal analysis
              purposes. Usage Data is generally retained for a shorter period of
              time, except when this data is used to strengthen the security or
              to improve the functionality of Our Service, or We are legally
              obligated to retain this data for longer time periods.
            </Text>

            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: night ? '#fff' : '#272727',
                fontSize: fonts === 12 ? 18 : fonts === 14 ? 20 : 22,
                marginBottom: 20,
              }}>
              Transfer of Your Personal Data
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: night ? '#fff' : '#272727',
                marginBottom: 20,
                fontSize: fonts,
              }}>
              Your information, including Personal Data, is processed at the
              Company's operating offices and in any other places where the
              parties involved in the processing are located. It means that this
              information may be transferred to — and maintained on — computers
              located outside of Your state, province, country or other
              governmental jurisdiction where the data protection laws may
              differ than those from Your jurisdiction. {'\n'}
              {'\n'}
              Your consent to this Privacy Policy followed by Your submission of
              such information represents Your agreement to that transfer.{' '}
              {'\n'}
              {'\n'}
              The Company will take all steps reasonably necessary to ensure
              that Your data is treated securely and in accordance with this
              Privacy Policy and no transfer of Your Personal Data will take
              place to an organization or a country unless there are adequate
              controls in place including the security of Your data and other
              personal information.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Privacy;
