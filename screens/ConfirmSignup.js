import React, { Component } from 'react';
import Expo from 'expo';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import { Auth } from "aws-amplify";

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/FormStyles';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmationCode: '',
      showError: false,
      formError: '',
      signUpData: {},
      // signUpSuccessMessage: ''
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

  signUp = () => {
    const { email, password } = this.state;
    Auth.signUp(email, password)
    .then(
      data => {
        console.log('signUp data = ', data),
        this.setState({ signUpData: data })
      },
      this.setState({
        showError: false,
        // signUpSuccessMessage: 'Account created! Enter your confirmation code:'
      })
    )
    .catch(err => {
      console.log(`sign up ERROR: ${err.message}`, err)
      this.setState({
        formError: err.message,
        showError: true
      })
    });
  }

  confirmSignUp = () => {
    Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
    .then(data => console.log('confirmSignUp data = ', data))
    .then(() => console.log('confirm sign up success'))
    .then(() => console.log('currentSession = ', Auth.currentSession()))
    .then(this.props.navigation.navigate('SignIn'))
    .catch(err => console.log('confirm sign up ERROR: ', err));
  }

  render() {
    const { signUpData } = this.state;
    const signUpSuccessMessage = Object.keys(signUpData).length > 0 ? 'Account created! Enter your confirmation code:' : null;

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.heading}>Sign up to create an account.</Text>
        <View style={styles.formBox}>
          <TextInput
            style={styles.textInput}
            value={this.state.email}
            onChangeText={value => this.onChangeText('email', value)}
            placeholder="Email"
            autoCapitalize="none"
            autoFocus={true}
            keyboardType="email-address"
          />
          <Text style={styles.inputHelper}>Your email will be your username.</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.password}
            onChangeText={value => this.onChangeText('password', value)}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Text style={styles.inputHelper}>Required: 8 chars, numbers, special chars, upper and lowercase.</Text>
          {this.state.showError ? <Text style={globalStyles.error}>{this.state.formError}</Text> : null}
          <TouchableOpacity
            type="submit"
            style={styles.button}
            onPress={this.signUp}
            title="Sign In"
            accessibilityLabel="Sign up to create an account"
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <Text>{signUpSuccessMessage}</Text>
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
