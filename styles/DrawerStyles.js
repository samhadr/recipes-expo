import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  drawer: {
    alignItems: 'flex-start',
    width: '100%',
    padding: 15,
    paddingTop: 30,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 7,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default globalStyles;
