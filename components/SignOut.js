import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Auth } from 'aws-amplify';

import SignIn from '../screens/SignIn';

class SignOut extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    authenticate: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  signOut = () => {
    Auth.signOut()
    .then(data => console.log(data))
    .then(() => this.props.authenticate(false))
    .then(this.props.navigation.navigate('SignIn'))
    .catch(err => {
      console.log(`sign out ERROR: ${err.message}`, err)
    });
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.signOut}
        title="Sign Out"
        accessibilityLabel="Sign Out"
      >
        <Text style={{ color: 'white' }}>Sign Out</Text>
      </TouchableOpacity>
    );
  }

}

export default withNavigation(SignOut);
