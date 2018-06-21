import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { Auth } from 'aws-amplify';

import globalStyles from '../styles/GlobalStyles';
import formStyles from '../styles/FormStyles';

class ForgotPassword extends Component {
  static navigationOptions = {
    title: 'Forgot Password',
  };
  static propTypes = {
    email: PropTypes.string,
    signUpData: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      showEmailError: false,
      emailError: '',
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

  forgotPassword = () => {
    Auth.forgotPassword(this.state.email)
      .then(data => {
        console.log('data: ', data);
        this.setState({
          showEmailError: false
        });
        Object.keys(data).length > 0 ? this.props.navigation.navigate('ConfirmNewPassword', { emailAddress: this.state.email }) : null;
      })
      .catch(err => {
        console.log('email error: ', err);
        this.setState({
          emailError: err.message,
          showEmailError: true
        });
      });
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.heading}>Forgot Password</Text>
        <View style={formStyles.formBox}>
          <Text>Enter your email address:</Text>
          <TextInput
            style={formStyles.textInput}
            value={this.state.email}
            onChangeText={value => this.onChangeText('email', value)}
            placeholder="Email"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoFocus={true}
            keyboardType="email-address"
          />
          {this.state.showEmailError ? <Text style={globalStyles.error}>{this.state.emailError}</Text> : null}
          <Text>A confirmation code will be sent to you. Enter the confirmation code and create a new password on the next screen.</Text>
          <TouchableOpacity
            type="submit"
            style={formStyles.button}
            onPress={this.forgotPassword}
            title="Send Confirmation Code"
            accessibilityLabel="Send Confirmation Code"
          >
            <Text style={formStyles.buttonText}>Send Confirmation Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ForgotPassword;
