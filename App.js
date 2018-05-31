import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';

// AWS API
import Amplify, { Auth } from 'aws-amplify';
import config from './config';

import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import RootNavigator from './navigation/RootNavigator';
import AuthNavigator from './navigation/AuthNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';
import MainNavigator from './navigation/Navigators';
import Drawer from './navigation/Navigators';
import Home from './screens/Home';
import SettingsScreen from './screens/SettingsScreen';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "recipes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoadingComplete: false,
      isAuthenticated: false,
      currentUser: {}
    }
  }

  authenticate = (isAuthenticated) => {
    this.setState({ isAuthenticated });
  }

  user = (user) => {
    const { isAuthenticated } = this.state;
    isAuthenticated ? this.setState({ currentUser: user }) : null;
  }

  render() {
    const { currentUser } = this.state;
    const userEmail = Object.keys(currentUser).length > 0 ? currentUser.signInUserSession.idToken.payload.email : null;

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    if (this.state.isAuthenticated){
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <MainNavigator
            screenProps={{
              authenticate: this.authenticate,
              isAuthenticated: this.state.isAuthenticated,
              userEmail: userEmail
            }}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AuthNavigator
          screenProps={{
            authenticate: this.authenticate,
            user: this.user
          }}
        />
      </View>
    );
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in Home.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  content: {
    flex: 12,
    padding: 10,
  }
});
