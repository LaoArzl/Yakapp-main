import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notepad from '../Screens/Notepad/Notepad';
import Content from '../Screens/Notepad/Content';
import Create from '../Screens/Notepad/Create';
import DeleteAll from '../Screens/Notepad/DeleteAll';
const Stack = createNativeStackNavigator();

const NotepadStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Notepad" component={Notepad} />
        <Stack.Screen name="Content" component={Content} />
        <Stack.Screen name="Create" component={Create} />
        <Stack.Screen name="DeleteAll" component={DeleteAll} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NotepadStack;
