import { createStackNavigator } from 'react-navigation';

import Welcome from '../screens/Welcome';
import SignUp from '../screens/SignUp';
import ConfirmSignUp from '../screens/ConfirmSignUp';
import SignIn from '../screens/SignIn';
import ForgotPassword from '../screens/ForgotPassword';

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
    ForgotPassword: {
      screen: ForgotPassword,
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