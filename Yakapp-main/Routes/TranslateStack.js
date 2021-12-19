import React from 'react';
import Translate from '../Screens/Translate';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanType from '../Screens/Scan/ScanType';

const Stack = createNativeStackNavigator();

const TranslateStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Translate" component={Translate} />
        <Stack.Screen name="ScanType" component={ScanType} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default TranslateStack;
