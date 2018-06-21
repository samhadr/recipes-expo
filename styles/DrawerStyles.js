import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const globalStyles = StyleSheet.create({
  drawerHeader: {
    alignItems: 'flex-start',
    backgroundColor: Colors.sageGreen,
    width: '100%',
    padding: 15,
    paddingTop: 30,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
});

export default globalStyles;
