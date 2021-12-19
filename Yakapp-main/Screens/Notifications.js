import React from 'react';
import {View, Text, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Notifications = () => {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            height: 55,
            justifyContent: 'center',
            paddingLeft: 20,
            justifyContent: 'center',
            backgroundColor: '#407BFF',
          }}>
          <Text
            style={{
              marginTop: 4,
              color: '#fff',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 20,
            }}>
            Notifications
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Notifications;
