import React, { Component } from 'react';
import Expo from 'expo';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import { withNavigation } from 'react-navigation';

import { Auth } from "aws-amplify";

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/FormStyles';

class SignIn extends Component {
  // static navigationOptions = {
  //   title: 'Sign In',
  // };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmationCode: '',
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
    .catch(err => console.log('sign in ERROR: ', err));
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
        <Text style={globalStyles.heading}>Sign In</Text>
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
          <TextInput
            style={styles.textInput}
            value={this.state.password}
            onChangeText={value => this.onChangeText('password', value)}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TouchableOpacity
            type="submit"
            style={styles.button}
            onPress={this.signIn}
            title="Sign In"
            accessibilityLabel="Sign in to your account"
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withNavigation(SignIn);
