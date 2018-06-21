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
  contentBox: {
    marginBottom: 20,
  },
  // Typography
  bold: {
    fontWeight: 'bold',
  },
  emphasis: {
    fontStyle: 'italic',
  },
  heading: {
    marginBottom: 15,
    fontSize: 20,
  },
  subHeading: {
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 12,
  },
  // Icons
  inlineIcon: {
    marginRight: 10,
  },
  svg: {
    width: '100%',
    height: '100%',
  },
  // Other
  error: {
    marginBottom: 15,
    color: 'red',
  },
});

export default globalStyles;
