import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Screens/Home';
import Scan from '../Screens/Scan';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={Home}
      />
      <HomeStack.Screen
        options={{headerShown: false}}
        name="Dictionary"
        component={Dictionary}
      />
      <HomeStack.Screen name="Scan" component={Scan} />
      <HomeStack.Screen name="Translate" component={Translate} />
      {/* <HomeStack.Screen name="Profile" component={ProfileStackScreen} />
      <HomeStack.Screen name="BeginnerScreen" component={BeginnerStackScreen} />
      <HomeStack.Screen
        name="IntermediateScreen"
        component={IntermediateStackScreen}
      />
      <HomeStack.Screen name="AdvanceScreen" component={AdvanceStackScreen} /> */}
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
