import React from 'react';
import {View, Text} from 'react-native';
import Dictionary from '../Screens/Dictionary/Dictionary';
import Meaning from '../Screens/Dictionary/Meaning';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const DictionaryStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Dictionary" component={Dictionary} />
        <Stack.Screen name="Meaning" component={Meaning} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default DictionaryStackScreen;
