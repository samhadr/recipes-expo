import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignOut from '../components/SignOut';

import Colors from '../constants/Colors';

export default createDrawerNavigator(
  {
    // Main: MainTabNavigator,
    SignOut: {
      screen: SignOut,
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.red,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);