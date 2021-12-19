import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import HeaderBack from '../../Shared/HeaderBack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  const findFavorites = async () => {
    const result = await AsyncStorage.getItem('favorites');
    if (result !== null) {
      setFavorites(JSON.parse(result));
      console.log(JSON.parse(result));
    }
  };

  useEffect(() => {
    findFavorites();
  }, []);
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <HeaderBack nav={navigation} title="Favorites" background="#fff" />
        <ScrollView>
          <View style={{padding: 20}}>
            {favorites.map(e => {
              return (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    minHeight: 100,
                    backgroundColor: '#f4f4f4',
                    borderRadius: 20,
                    padding: 20,
                    marginBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-SemiBold',
                      color: '#272727',
                      marginBottom: 10,
                    }}>
                    {e.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#272727',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{fontFamily: 'Poppins-Medium', color: '#407BFF'}}>
                      English:
                    </Text>{' '}
                    {e.english}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: '#272727',
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{fontFamily: 'Poppins-Medium', color: '#407BFF'}}>
                      Yakan:
                    </Text>{' '}
                    {e.yakan}
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
    </>
  );
};

export default Favorites;
