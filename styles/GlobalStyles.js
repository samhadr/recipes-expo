import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
    padding: 15,
  },
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    marginBottom: 10,
    fontSize: 20,
  },
  error: {
    marginBottom: 15,
    color: 'red',
  },
  // Typography
  bold: {
    fontWeight: 'bold',
  },
  emphasis: {
    fontStyle: 'italic',
  },
  inlineIcon: {
    marginRight: 10,
  },
  smallText: {
    fontSize: 12,
  },
  svg: {
    width: '100%',
    height: '100%',
  }
});

export default globalStyles;
