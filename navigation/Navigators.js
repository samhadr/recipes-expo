
import React from 'react';
import {
  Platform,
  ScrollView,
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


import Recipes from '../screens/Recipes';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

import DrawerMenu from '../components/DrawerMenu';

export const RecipesStack = createStackNavigator(
  {
    Recipes: {
      screen: Recipes,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      // initialRouteName: 'SecondScreen',
      // headerMode: 'screen',
      headerStyle: {
        paddingRight: 10,
        paddingLeft: 10,
      },
      headerTitle: 'Recipes',
      drawerLabel: 'Recipes',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name={Platform.OS === 'ios' ? `ios-menu` : 'md-menu'} size={25} color="red" />
        </TouchableOpacity>
      ),
    }),
  }
);

export const LinksStack = createStackNavigator(
  {
    Links: {
      screen: LinksScreen,
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      // initialRouteName: 'SecondScreen',
      // headerMode: 'screen',
      headerStyle: {
        paddingRight: 10,
        paddingLeft: 10,
      },
      headerTitle: 'Links',
      drawerLabel: 'Links',
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name={Platform.OS === 'ios' ? `ios-menu` : 'md-menu'} size={25} color="red" />
        </TouchableOpacity>
      ),
    }),
  }
);

export const Tabs = createBottomTabNavigator(
  {
    Recipes: { screen: RecipesStack },
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
    Recipes: { screen: RecipesStack },
    Links: { screen: LinksStack },
  },
  {
    drawerWidth: 250,
    contentComponent: props => 
      <ScrollView>
        <DrawerMenu {...props} />
        <DrawerItems {...props} />
      </ScrollView>
  },
);

export default MainNavigator = createStackNavigator(
  {
    Main: { screen: Drawer },
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
  }
);
