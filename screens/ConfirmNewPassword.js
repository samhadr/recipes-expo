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

class ConfirmNewPassword extends Component {
  static navigationOptions = {
    title: 'Confirm New Password',
  };
  static propTypes = {
    email: PropTypes.string,
    signUpData: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      confirmationCode: '',
      newPassword: '',
      newPasswordConfirm: '',
      showConfirmError: false,
      confirmError: '',
    };
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  confirmNewPassword = () => {
    const { confirmationCode, newPassword, newPasswordConfirm } = this.state;
    const email = this.props.navigation.getParam('emailAddress', 'no email');
    // console.log('email: ', email);
    // console.log('confirmationCode: ', confirmationCode);
    // console.log('newPassword: ', newPassword);
    if (newPassword === newPasswordConfirm) {
      Auth.forgotPasswordSubmit(email, confirmationCode, newPassword)
        .then(() => {
            // console.log('forgotPasswordSubmit data = ', data);
            this.setState({ showConfirmError: false });
            this.props.navigation.navigate('SignIn');
        })
        .catch(err => {
          // console.log(`confirm ERROR: ${err.message}`, err),
          this.setState({
              confirmError: err.message,
              showConfirmError: true
          });
        });
    } else {
      this.setState({
        confirmError: 'Passwords do not match.',
        showConfirmError: true
    });
    }
  }

  render() {
    return (
      <View style={globalStyles.container}>
        <View style={formStyles.formBox}>
          <View style={formStyles.formBox}>
            <Text>Enter confirmation code:</Text>
            <TextInput
              style={formStyles.textInput}
              value={this.state.confirmationCode}
              onChangeText={value => this.onChangeText('confirmationCode', value)}
              placeholder="Confirmation Code"
              underlineColorAndroid="transparent"
            />
            <Text>Create a new password:</Text>
            <TextInput
              style={formStyles.textInput}
              value={this.state.newPassword}
              onChangeText={value => this.onChangeText('newPassword', value)}
              placeholder="New password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
            />
            <Text style={formStyles.inputHelper}>Required: 8 chars, numbers, special chars, upper and lowercase.</Text>
            <TextInput
              style={formStyles.textInput}
              value={this.state.newPasswordConfirm}
              onChangeText={value => this.onChangeText('newPasswordConfirm', value)}
              placeholder="Confirm new password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
            />
            {this.state.showConfirmError ? <Text style={globalStyles.error}>{this.state.confirmError}</Text> : null}
            <TouchableOpacity
              type="submit"
              style={formStyles.button}
              onPress={this.confirmNewPassword}
              title="Confirm New Password"
              accessibilityLabel="Confirm New Password"
            >
              <Text style={formStyles.buttonText}>Confirm New Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default ConfirmNewPassword;
