import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, SafeAreaView, Button } from 'react-native';
// import { withNavigation } from 'react-navigation';

import { Auth } from 'aws-amplify';

import Stack from '../navigation/Navigators';

class DrawerMenu extends Component {
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
    .then(() => this.props.screenProps.authenticate(false))
    .then(this.props.navigation.navigate('SignIn'))
    .catch(err => {
      console.log(`sign out ERROR: ${err.message}`, err)
    });
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          {/* <Stack /> */}
          <Button
            onPress={this.signOut}
            title="Sign Out"
            color="red"
          />
        </SafeAreaView>
      </ScrollView>
    );
  }

}

export default DrawerMenu;
