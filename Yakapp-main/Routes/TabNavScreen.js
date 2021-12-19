import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Home from '../Screens/Home';
import Notifications from '../Screens/Notifications';
import Profile from '../Screens/Profile';
import Search from '../Screens/Search';

const Tab = createMaterialBottomTabNavigator();

const TabNavScreen = () => {
  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName="Home"
      barStyle={{
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#dedede',
        height: 55,
      }}
      activeColor="#407BFF"
      inactiveColor="#808080">
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => {
            let iconName = 'md-home';
            return (
              <Ionicons
                name={iconName}
                size={focused ? 18 : 22}
                color={color}
              />
            );
          },
          headerShown: false,
          tabBarLabel: 'Home',
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => {
            let iconName = 'bell';
            return (
              <FontAwesome
                name={iconName}
                size={focused ? 18 : 22}
                color={color}
              />
            );
          },
          headerShown: false,
        }}
        name="Notifications"
        component={Notifications}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => {
            let iconName = 'search';
            return (
              <FontAwesome
                name={iconName}
                size={focused ? 18 : 22}
                color={color}
              />
            );
          },
          headerShown: false,
        }}
        name="Search"
        component={Search}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, focused}) => {
            let iconName = 'menu';
            return (
              <Ionicons
                name={iconName}
                size={focused ? 22 : 24}
                color={color}
              />
            );
          },
          headerShown: false,
        }}
        name="More"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabNavScreen;
