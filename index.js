import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/user';
import appStateReducer from './features/appState';
import lessonReducer from './features/lessons';
import wordReducer from './features/words';
import filterWordReducer from './features/filterWord';
import masterWordReducer from './features/masterWord';
import fontReducer from "./features/FontSize"

const store = configureStore({
  reducer: {
    user: userReducer,
    appState: appStateReducer,
    lesson: lessonReducer,
    word: wordReducer,
    filterWord: filterWordReducer,
    masterWord: masterWordReducer,
    fontSize: fontReducer
  },
});

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#407BFF',
    accent: '#f1c40f',
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
