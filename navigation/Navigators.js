
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
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

// StackNavigator screens
import Welcome from '../screens/Welcome';
import SignOut from '../components/SignOut';

// TabNavigator screens
import Recipes from '../screens/Recipes';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Plain old component
import ConfirmSignUp from '../screens/ConfirmSignUp';

import userSignOut from '../utilities/helpers';
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
    SignOut: { screen: SignOut },
    Confirm: { screen: ConfirmSignUp },
  },
  {
    contentComponent: props => 
      <ScrollView>
        <DrawerItems {...props} />
        <DrawerMenu />
      </ScrollView>
  },
);

const MenuButton = (
	<Button
    title="Open Drawer"
    // style={styles.button}
    onPress={() => navigation.toggleDrawer()}
  />
);

export default MainNavigator = createStackNavigator({
  Main: { screen: Drawer },
  // SignOut: { screen: SignOut },
}, {
  initialRouteName: 'Main',
  navigationOptions: ({ navigation }) => ({
		headerLeft: (
      <Button
        title="Open Drawer"
        // style={styles.button}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    ),
	}),
});
