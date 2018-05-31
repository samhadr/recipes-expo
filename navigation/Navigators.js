
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Navigators
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  DrawerItems,
  DrawerActions
} from 'react-navigation';

import SignOut from '../components/SignOut';

import Recipes from '../screens/Recipes';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import ConfirmSignUp from '../screens/ConfirmSignUp';
import DrawerMenu from '../components/DrawerMenu';

export const Tabs = createBottomTabNavigator(
  {
    Recipes: { screen: Recipes },
    Links: { screen: LinksScreen },
    Settings: { screen: SettingsScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Recipes':
            iconName = Platform.OS === 'ios' ? `ios-search` : 'md-search';
            break;
          case 'Links':
            iconName = Platform.OS === 'ios' ? `ios-list` : 'md-list';
            break;
          case 'Settings':
            iconName =
              Platform.OS === 'ios' ? `ios-musical-notes` : 'md-musical-notes';
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

export const Drawer = createDrawerNavigator(
  {
    Tabs: { screen: Tabs },
    Confirm: { screen: ConfirmSignUp },
  },
  {
    contentComponent: props => 
      <ScrollView>
        {/* <DrawerItems {...props} /> */}
        <DrawerMenu {...props} />
        {/* <SignOut {...props} /> */}
      </ScrollView>
  },
);

export default MainNavigator = createStackNavigator({
  Main: { screen: Drawer },
}, {
  initialRouteName: 'Main',
  navigationOptions: ({ navigation }) => ({
		headerLeft: (
      <TouchableOpacity
        // title="Open Drawer"
        // style={styles.button}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons name={Platform.OS === 'ios' ? `ios-menu` : 'md-menu'} size={25} color="red" />
      </TouchableOpacity>
    ),
  }),
  // navigationOptions: props => ({
  //   headerRight: (
  //     <SignOut {...props} />
  //   ),
  // }),
});
