import { StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('window');

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
  modal: {
    maxHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  modalClose: {
    position: 'absolute',
    top: -15,
    right: -10,
  },
  modalListItem: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default globalStyles;
