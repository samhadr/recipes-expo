import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Recipes from '../screens/Recipes';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignOut from '../components/SignOut';

import Drawer from './Navigators';

// export default createBottomTabNavigator(
//   {
//     Recipes: {
//       screen: Recipes,
//     },
//     Links: {
//       screen: LinksScreen,
//     },
//     Settings: {
//       screen: SettingsScreen,
//     },
//     SignOut: {
//       screen: SignOut,
//     },
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       // headerTitle: 'Recipes',
//       headerLeft: (
//         <Button
//           onPress={() => alert('This is a button!')}
//           title="user"
//           color="red"
//         />
//       ),
//       headerRight: (
//         // <SignOut
//         //   // isAuthenticated={this.props.screenProps.isAuthenticated}
//         // />
//         <Button
//           onPress={this.signOut}
//           title="Sign Out"
//           color="red"
//         />
//       ),
//       tabBarIcon: ({ focused }) => {
//         const { routeName } = navigation.state;
//         let iconName;
//         switch (routeName) {
//           case 'Recipes':
//             iconName = Platform.OS === 'ios' ? `ios-search` : 'md-search';
//             break;
//           case 'Links':
//             iconName = Platform.OS === 'ios' ? `ios-list` : 'md-list';
//             break;
//           case 'Settings':
//             iconName =
//               Platform.OS === 'ios' ? `ios-musical-notes` : 'md-musical-notes';
//         }
//         return (
//           <Ionicons
//             name={iconName}
//             size={28}
//             style={{ marginBottom: -3, width: 25 }}
//             color={focused ? Colors.activeTintColor : Colors.inactiveTintColor}
//           />
//         );
//       },
//     }),
//     tabBarOptions: {
//       inactiveBackgroundColor: Colors.red,
//       activeBackgroundColor: Colors.darkRed,
//       inactiveTintColor: Colors.inactiveTintColor,
//       activeTintColor: Colors.activeTintColor,
//     },
//     animationEnabled: false,
//     swipeEnabled: false,
//   }
// );

const RecipesStack = createStackNavigator({
  Recipes: Recipes,
});

RecipesStack.navigationOptions = {
  tabBarLabel: 'Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

const SignOutStack = createStackNavigator({
  SignOut: SignOut,
});

SignOutStack.navigationOptions = {
  tabBarLabel: 'Sign Out',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default MainTabNavigator = createBottomTabNavigator({
  RecipesStack,
  LinksStack,
  SettingsStack,
  Drawer: { screen: Drawer },
  // SignOutStack,
  // Menu: {
  //   screen: MenuNavigator,
  // },
});
