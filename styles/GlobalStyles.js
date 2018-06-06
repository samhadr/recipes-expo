import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 15,
  },
  content: {
    flex: 12,
    padding: 10,
  },
  heading: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
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
});

export default globalStyles;
