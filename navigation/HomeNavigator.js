import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MainTabNavigator from '../navigation/MainTabNavigator';

import Colors from '../constants/Colors';

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      path: 'home',
      navigationOptions: {
        title: 'Home',
      },
    },
    SignUp: {
      screen: SignUpScreen,
      path: 'signup',
      navigationOptions: {
        title: 'Sign Up',
      },
    },
    SignIn: {
      screen: SignInScreen,
      path: 'login',
      navigationOptions: {
        title: 'Sign In',
      },
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