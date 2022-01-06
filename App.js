import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DictionaryStackScreen from './Routes/DictionaryStack';
import Login from './Screens/Login';
import TabNavScreen from './Routes/TabNavScreen';
import All from './Screens/Lessons/All';
import AdminStack from './Routes/AdminStack';
import TranslateStack from './Routes/TranslateStack';
import NotLogin from './Screens/NotLogin';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import {updateLesson} from './features/lessons';
import NotepadStack from './Routes/NotepadStack';
import Scan from './Screens/Scan/Scan';

import OnBoardingScreen from './Shared/OnBoardingScreen';
import Lesson from './Screens/Lessons/Lesson';
import Chapter from './Screens/Lessons/Chapter';
import {updateWord} from './features/words';
import Splash from './Shared/Splash';
import Favorites from './Screens/Favorites/Favorites';
import SeeAll from './Screens/SeeAll';
import Pronunciation from './Screens/Pronunciation/Pronunciation';
import About from './Screens/About';
import {changeSize} from './features/FontSize';
import axios from 'axios';
import {changeAppState} from './features/appState';
import Terms from "./Screens/Terms";
import Privacy from "./Screens/Privacy";

const Stack = createNativeStackNavigator();

function App() {
  const dispatch = useDispatch();
  const fontSizes = useSelector(state => state.fontSize.value);
  const [onBoard, setOnBoard] = useState(true);
  const user = useSelector(state => state.user.value);
  const appState = useSelector(state => state.appState.value);
  const [userValue, setUserValue] = useState([]);
  const [splash, setSplash] = useState(true);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('onBoarding');
      if (value !== null) {
        setOnBoard(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  // useEffect(() => {
  //   Axios.get('https://yakapp.herokuapp.com/add-lesson')
  //     .then(response => {
  //       dispatch(updateLesson(response.data));
  //     })
  //     .catch(e => console.log(e));
  // }, [appState]);

  // useEffect(() => {
  //   Axios.get('https://yakapp.herokuapp.com/words')
  //     .then(response => {
  //       dispatch(updateWord(response.data));
  //     })
  //     .catch(e => console.log(e));
  // }, [appState]);

  const findFonts = async () => {
    const result = await AsyncStorage.getItem('fonts');
    if (result !== null) {
      dispatch(changeSize(JSON.parse(result)));
    }
  };

  const handleSubmit = async () => {
    const result = await AsyncStorage.getItem('translations');
    if (result !== null) {
      dispatch(updateWord(JSON.parse(result)));
    } else {
      axios.get('https://yakapp.herokuapp.com/words').then(response => {
        AsyncStorage.setItem('translations', JSON.stringify(response.data));
        dispatch(changeAppState('updating'));
        wait(2000).then(() => {
          dispatch(changeAppState(''));
        });
      });
    }
  };

  const findLessons = async () => {
    const result = await AsyncStorage.getItem('lessons');
    if (result !== null) {
      dispatch(updateLesson(JSON.parse(result)));
    } else {
      axios.get('https://yakapp.herokuapp.com/add-lesson').then(response => {
        AsyncStorage.setItem('lessons', JSON.stringify(response.data));
        dispatch(changeAppState('updating'));
        wait(2000).then(() => {
          dispatch(changeAppState(''));
        });
      });
    }
  };

  useEffect(() => {
    findFonts();
    handleSubmit();
    findLessons();
  }, [appState, fontSizes]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {onBoard !== 'no' && (
          <Stack.Screen
            options={{headerShown: false}}
            name="OnBoardingScreen"
            component={OnBoardingScreen}
          />
        )} */}
        <Stack.Screen
          options={{headerShown: false}}
          name="TabScreen"
          component={TabNavScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="DictionaryStackScreen"
          component={DictionaryStackScreen}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="All"
          component={All}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="TranslateStack"
          component={TranslateStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Scan"
          component={Scan}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AdminStack"
          component={AdminStack}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Lesson"
          component={Lesson}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Chapter"
          component={Chapter}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="NotepadStack"
          component={NotepadStack}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Favorites"
          component={Favorites}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="SeeAll"
          component={SeeAll}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Pronunciation"
          component={Pronunciation}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="About"
          component={About}
        />

<Stack.Screen
          options={{headerShown: false}}
          name="Privacy"
          component={Privacy}
        />

<Stack.Screen
          options={{headerShown: false}}
          name="Terms"
          component={Terms}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
