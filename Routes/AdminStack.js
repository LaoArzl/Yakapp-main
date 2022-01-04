import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Dashboard from '../Screens/Admin/Dashboard';

const AdminStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AdminStack;
