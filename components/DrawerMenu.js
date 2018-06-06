import React, { Component } from 'react';
import {
  Platform,
  View,
  Text,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import SignOut from './SignOut';

import globalStyles from '../styles/GlobalStyles';
import drawerStyles from '../styles/DrawerStyles';

class DrawerMenu extends Component {

  render() {
    const userEmail = this.props.screenProps.userEmail !== null ? this.props.screenProps.userEmail : 'USER EMAIL';
    console.log('DrawerMenu userEmail: ', userEmail);

    return (
      <View style={drawerStyles.drawer}>
        <View style={drawerStyles.user}>
          <Ionicons name={Platform.OS === 'ios' ? `ios-contact` : 'md-contact'} size={35} color="red" style={globalStyles.inlineIcon} />
          <Text>{userEmail}</Text>
        </View>
        <SignOut authenticate={this.props.screenProps.authenticate} />
      </View>
    );
  }

}

export default DrawerMenu;
