import React, { Component } from 'react';

import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';

import { Auth } from "aws-amplify";

import globalStyles from '../styles/GlobalStyles';
import formStyles from '../styles/FormStyles';

class SignUp extends Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showSignUpError: false,
      signUpError: '',
      signUpData: {}
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
    const { email, password, signUpData } = this.state;
    Auth.signUp(email, password)
    .then(
      data => {
        console.log('signUp data = ', data),
        this.setState({ signUpData: data }),
        Object.keys(data).length > 0 ? this.props.navigation.navigate('ConfirmSignUp', { emailAddress: this.state.email }) : null
      },
      this.setState({ showSignUpError: false })
    )
    .catch(err => {
      console.log(`sign up ERROR: ${err.message}`, err),
      this.setState({
        signUpError: err.message,
        showSignUpError: true
      })
    });
  }

  render() {
    const { email, signUpData } = this.state;
    const signUpSuccessMessage = Object.keys(signUpData).length > 0 ? 'Account created! Enter your confirmation code:' : null;

    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.heading}>Sign up to create an account:</Text>
        <ScrollView style={formStyles.formBox}>
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
          <Text style={formStyles.inputHelper}>Your email will be your username.</Text>
          <TextInput
            style={formStyles.textInput}
            value={this.state.password}
            onChangeText={value => this.onChangeText('password', value)}
            placeholder="Password"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
          />
          <Text style={formStyles.inputHelper}>Required: 8 chars, numbers, special chars, upper and lowercase.</Text>
          {this.state.showSignUpError ? <Text style={globalStyles.error}>{this.state.signUpError}</Text> : null}
          <TouchableOpacity
            type="submit"
            style={formStyles.button}
            onPress={this.signUp}
            title="Sign In"
            accessibilityLabel="Sign up to create an account"
          >
            <Text style={formStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default SignUp;
