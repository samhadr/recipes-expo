import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmSignUp from '../screens/ConfirmSignUp';
import SignInScreen from '../screens/SignInScreen';
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
    ConfirmSignUp: {
      screen: ConfirmSignUp,
      path: 'confirm-signup',
      navigationOptions: {
        title: 'Confirm Sign Up',
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