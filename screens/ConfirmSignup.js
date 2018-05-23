import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Expo from 'expo';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import { Auth } from "aws-amplify";

import SignIn from '../screens/SignInScreen';

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/FormStyles';

class Login extends Component {
  static propTypes = {
    email: PropTypes.string,
    signUpData: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      confirmationCode: '',
      showError: false,
      formError: ''
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  confirmSignUp = () => {
    Auth.confirmSignUp(this.props.email, this.props.confirmationCode)
    .then(data => console.log('confirmSignUp data = ', data))
    .then(() => console.log('confirm sign up success'))
    .then(() => console.log('currentSession = ', Auth.currentSession()))
    .then(this.props.navigation.navigate('SignIn'))
    .catch(err => console.log('confirm sign up ERROR: ', err));
  }

  render() {
    const { signUpData } = this.props;

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.heading}>Confirm your account.</Text>
        <Text>Your account has been created! You were sent a confirmation code to the email associated with your new account.</Text>
        <Text>Enter your confirmation code:</Text>
        <View style={styles.formBox}>
          <TextInput
            style={styles.textInput}
            value={this.state.confirmationCode}
            onChangeText={value => this.onChangeText('confirmationCode', value)}
            placeholder="Confirmation Code"
          />
          <TouchableOpacity
            type="submit"
            style={styles.button}
            onPress={this.confirmSignUp}
            title="Confirm Sign In"
            accessibilityLabel="Confirm sign up to create your account"
          >
            <Text style={styles.buttonText}>Confirm Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;
