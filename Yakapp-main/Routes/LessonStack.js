import React from 'react';
import Lesson from '../Screens/Lessons/Lesson';
import Chapter from '../Screens/Lessons/Chapter';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const LessonStack = ({route}) => {
  const {item} = route.params;
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Lesson" component={Lesson} />
        <Stack.Screen name="Chapter" component={Chapter} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default LessonStack;
