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

import Colors from '../constants/Colors';

class DrawerHeader extends Component {

  render() {
    const userEmail = this.props.screenProps.userEmail !== null ? this.props.screenProps.userEmail : 'USER EMAIL';
    console.log('DrawerHeader userEmail: ', userEmail);

    return (
      <View style={drawerStyles.drawerHeader}>
        <View style={drawerStyles.user}>
          <Ionicons name={Platform.OS === 'ios' ? `ios-contact` : 'md-contact'} size={35} color="white" style={globalStyles.inlineIcon} />
          <Text style={{ color: '#fff' }}>{userEmail}</Text>
        </View>
        <SignOut authenticate={this.props.screenProps.authenticate} />
      </View>
    );
  }

}

export default DrawerHeader;
