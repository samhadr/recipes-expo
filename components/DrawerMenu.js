import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  SafeAreaView,
  Button,
  Text
} from 'react-native';

import { Auth } from 'aws-amplify';

import Stack from '../navigation/Navigators';
import SignOut from './SignOut';

class DrawerMenu extends Component {

  render() {
    const userEmail = this.props.screenProps.userEmail !== null ? this.props.screenProps.userEmail : 'USER EMAIL';
    console.log('DrawerMenu userEmail: ', userEmail);

    return (
      <ScrollView>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <Text>Welcome {userEmail}</Text>
          <SignOut authenticate={this.props.screenProps.authenticate} />
        </SafeAreaView>
      </ScrollView>
    );
  }

}

export default DrawerMenu;
