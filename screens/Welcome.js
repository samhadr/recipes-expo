import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import { WebBrowser } from 'expo';

import SignIn from './SignIn';

import globalStyles from '../styles/GlobalStyles';
import formStyles from '../styles/FormStyles';
import Colors from '../constants/Colors';

class Welcome extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  handleNav = (screen) => {
    this.props.navigation.navigate(screen);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.centerContent}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={globalStyles.heading}>Welcome to Recipes</Text>
            {/* <Button
              title="Sign Up"
              onPress={() => navigate('SignUp')}
              style={formStyles.button}
              color={Colors.sageGreen}
            /> */}
            <TouchableOpacity
              style={[formStyles.button, formStyles.buttonFixedWidth]}
              onPress={() => navigate('SignUp')}
              title="Sign Up"
              accessibilityLabel="Sign Up"
            >
              <Text style={formStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Text style={globalStyles.heading}>Already have an account?</Text>
            {/* <Button
              title="Sign In"
              onPress={() => navigate('SignIn')}
              color={Colors.sageGreen}
            /> */}
            <TouchableOpacity
              style={[formStyles.button, formStyles.buttonFixedWidth]}
              onPress={() => navigate('SignIn')}
              title="Sign In"
              accessibilityLabel="Sign In"
            >
              <Text style={formStyles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

export default Welcome;
