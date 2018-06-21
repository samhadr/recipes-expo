
import React from 'react';
import {
  Platform,
  ScrollView,
  TouchableOpacity,
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
import Recipe from '../screens/Recipe';
import CreateRecipe from '../screens/CreateRecipe';

import DrawerHeader from '../components/DrawerHeader';

import Colors from '../constants/Colors';

export const RecipesStack = createStackNavigator(
  {
    Recipes: {
      screen: Recipes,
    },
    Recipe: {
      screen: Recipe,
    },
    CreateRecipe: {
      screen: CreateRecipe,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        paddingRight: 10,
        backgroundColor: Colors.sageGreen,
      },
      headerTitle: 'Recipes',
      headerTintColor: Colors.gold,
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name={Platform.OS === 'ios' ? `ios-menu` : 'md-menu'} size={25} color={Colors.gold} />
        </TouchableOpacity>
      ),
    }),
  }
);

export const RecipeStack = createStackNavigator(
  {
    Recipe: {
      screen: Recipe,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        paddingRight: 10,
        paddingLeft: 10,
      },
      headerTitle: 'Recipe',
      // drawerLabel: 'Recipes',
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name={Platform.OS === 'ios' ? `ios-menu` : 'md-menu'} size={25} color="red" />
        </TouchableOpacity>
      ),
    }),
  }
);

export const Drawer = createDrawerNavigator(
  {
    Recipes: { screen: RecipesStack },
  },
  {
    drawerWidth: 250,
    drawerPosition: 'right',
    contentComponent: props => 
      <ScrollView>
        <DrawerHeader {...props} />
        {/* <DrawerItems {...props} /> */}
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

// export const Tabs = createBottomTabNavigator(
//   {
//     Recipes: { screen: RecipesStack },
//     Links: { screen: LinksScreen },
//     Settings: { screen: SettingsScreen },
//   },
//   {
//     navigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, tintColor }) => {
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

//         // You can return any component that you like here! We usually use an
//         // icon component from react-native-vector-icons
//         return <Ionicons name={iconName} size={25} color={tintColor} />;
//       },
//     }),
//     tabBarOptions: {
//       activeTintColor: 'tomato',
//       inactiveTintColor: 'gray',
//     },
//   }
// );
