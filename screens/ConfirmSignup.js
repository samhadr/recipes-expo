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

import SignIn from '../screens/SignIn';

import globalStyles from '../styles/GlobalStyles';
import formStyles from '../styles/FormStyles';

class ConfirmSignUp extends Component {
  static navigationOptions = {
    title: 'Confirm Account',
  };
  static propTypes = {
    email: PropTypes.string,
    signUpData: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      confirmationCode: '',
      showConfirmError: false,
      confirmError: '',
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
    const email = this.props.navigation.getParam('emailAddress', 'no email');
    Auth.confirmSignUp(email, this.state.confirmationCode)
    .then(
      data => {
        console.log('confirmSignUp data = ', data),
        data === 'SUCCESS' ? this.props.navigation.navigate('SignIn') : null,
        this.setState({ showConfirmError: false })
      }
    )
    .catch(err => {
      console.log(`confirm ERROR: ${err.message}`, err),
      this.setState({
        confirmError: err.message,
        showConfirmError: true
      })
    });
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.heading}>Confirm your account.</Text>
        <View style={formStyles.formBox}>
          <Text>Your account has been created! You were sent a confirmation code to the email associated with your new account.</Text>
          <Text>Enter your confirmation code:</Text>
          <View style={formStyles.formBox}>
            <TextInput
              style={formStyles.textInput}
              value={this.state.confirmationCode}
              onChangeText={value => this.onChangeText('confirmationCode', value)}
              placeholder="Confirmation Code"
              underlineColorAndroid="transparent"
            />
            {this.state.showConfirmError ? <Text style={globalStyles.error}>{this.state.confirmError}</Text> : null}
            <TouchableOpacity
              type="submit"
              style={formStyles.button}
              onPress={this.confirmSignUp}
              title="Confirm Sign In"
              accessibilityLabel="Confirm sign up to create your account"
            >
              <Text style={formStyles.buttonText}>Confirm Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ConfirmSignUp;
