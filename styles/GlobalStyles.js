import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: '100%',
    padding: 15,
  },
  content: {
    flex: 12,
    padding: 10,
  },
  centerContent: {
    alignItems: 'center',
  },
  heading: {
    marginBottom: 5,
    fontSize: 20,
    // fontWeight: 'bold',
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
