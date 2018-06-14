import { createStackNavigator } from 'react-navigation';

import Welcome from '../screens/Welcome';
import SignUp from '../screens/SignUp';
import ConfirmSignUp from '../screens/ConfirmSignUp';
import SignIn from '../screens/SignIn';

import Colors from '../constants/Colors';

export default createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
    },
    SignUp: {
      screen: SignUp,
    },
    ConfirmSignUp: {
      screen: ConfirmSignUp,
    },
    SignIn: {
      screen: SignIn,
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.sageGreen,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
  }
);