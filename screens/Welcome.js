import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { WebBrowser, Svg } from 'expo';
const { Path } = Svg;

import SignIn from './SignIn';
import Logo from '../components/icons/Logo';

import globalStyles from '../styles/GlobalStyles';
import formStyles from '../styles/FormStyles';
import Colors from '../constants/Colors';

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  handleNav = (screen) => {
    this.props.navigation.navigate(screen);
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[globalStyles.container, { backgroundColor: Colors.sageGreen }]}>
        <View style={globalStyles.centerContent}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 75, height: 75, marginBottom: 10 }}>
              <Logo fill="#fff" />
            </View>
            <Text style={[globalStyles.heading, { color: '#fff' }]}>Welcome to Recipes</Text>
            <TouchableOpacity
              onPress={() => navigate('SignUp')}
              title="Sign Up"
              accessibilityLabel="Sign Up"
            >
              <Text style={[formStyles.buttonText, { color: 'gold' }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
            <Text style={[globalStyles.heading, { color: '#fff' }]}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigate('SignIn')}
              title="Sign In"
              accessibilityLabel="Sign In"
            >
              <Text style={[formStyles.buttonText, { color: 'gold' }]}>Sign In</Text>
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
