import React, { Component } from 'react';
// import Expo from 'expo';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import { Auth } from "aws-amplify";

import globalStyles from '../styles/GlobalStyles';
import formStyles from '../styles/FormStyles';

class SignIn extends Component {
  static navigationOptions = {
    title: 'Sign In',
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showSignInError: false,
      // confirmationCode: '',
      user: {}
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

  signIn = () => {
    const { email, password } = this.state;
    Auth.signIn(email, password)
    .then(user => {
      this.setState({ user });
      console.log('sign in success', this.state.user);
    })
    .then(() => this.props.screenProps.authenticate(true))
    .then(() => this.props.screenProps.user(this.state.user))
    .catch(err => {
      console.log(`sign in ERROR: ${err.message}`, err),
      this.setState({ showSignInError: true })
    });
  }

  // confirmSignIn = () => {
  //   Auth.confirmSignIn(this.state.user, this.state.confirmationCode)
  //   .then(() => {
  //     this.props.screenProps.authenticate(true);
  //     console.log('confirm sign in success')
  //   })
  //   .catch(err => console.log('confirm sign in ERROR: ', err));
  //   this.props.navigation.navigate('Search');
  // }

  render() {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.heading}>Sign in to your account:</Text>
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
          <TextInput
            style={formStyles.textInput}
            value={this.state.password}
            onChangeText={value => this.onChangeText('password', value)}
            placeholder="Password"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            onSubmitEditing={this.signIn}
          />
          {this.state.showSignInError ? <Text style={globalStyles.error}>Incorrect username or password</Text> : null}
          <TouchableOpacity
            type="submit"
            style={formStyles.button}
            onPress={this.signIn}
            title="Sign In"
            accessibilityLabel="Sign in to your account"
          >
            <Text style={formStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default SignIn;
