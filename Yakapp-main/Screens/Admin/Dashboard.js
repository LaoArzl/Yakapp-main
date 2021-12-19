import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HeaderBack from '../../Shared/HeaderBack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Dashboard = ({navigation}) => {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    setLoading(true);
    Axios.get('http://10.0.2.2:3001/add-lesson')
      .then(response => {
        if (response.data) {
          console.log(response.data);
          setLoading(false);
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        } else {
          setWord('None');
        }
      })
      .catch(e => console.log(e));
  }, []);

  if (loading) {
    return (
      <>
        <HeaderBack nav={navigation} title="Admin Dashboard" />
        <SkeletonPlaceholder backgroundColor="#fff" highlightColor="#eee">
          <View style={{padding: 20}}>
            <View
              style={{
                width: '100%',
                height: 'auto',
                marginBottom: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  width: '48%',
                  height: 200,
                  backgroundColor: '#407BFF',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'white',
                    borderRadius: 100,
                    position: 'absolute',
                    left: 10,
                    top: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: '48%',
                  height: 200,
                  backgroundColor: '#E47FF4',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'white',
                    borderRadius: 100,
                    position: 'absolute',
                    left: 10,
                    top: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}></View>
              </TouchableOpacity>
            </View>
          </View>
        </SkeletonPlaceholder>
      </>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderBack nav={navigation} title="Admin Dashboard" />
      <ScrollView style={{padding: 20}} showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            height: 'auto',
            marginBottom: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              width: '48%',
              height: 200,
              backgroundColor: '#407BFF',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: '#fff',
                fontSize: 50,
              }}>
              6537
            </Text>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 100,
                position: 'absolute',
                left: 10,
                top: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="format-letter-case"
                size={24}
                color="#407BFF"
              />
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#fff',
                position: 'absolute',
                bottom: 10,
                left: 10,
              }}>
              Total Words
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '48%',
              height: 200,
              backgroundColor: '#E47FF4',
              borderRadius: 10,
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'white',
                borderRadius: 100,
                position: 'absolute',
                left: 10,
                top: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="book" size={24} color="#E47FF4" />
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                color: '#fff',
                fontSize: 50,
              }}>
              3
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#fff',
                position: 'absolute',
                bottom: 10,
                left: 10,
              }}>
              Total Lessons
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            color: '#272727',
            fontSize: 20,
          }}>
          Registered Users {word}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
