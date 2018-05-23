import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  formBox: {
    marginBottom: 25,
  },
  searchForm: {
    flex: 1,
    height: 20,
    padding: 10,
    paddingBottom: 3,
  },
  text: {
    color: '#fff',
  },
  textInput: {
    backgroundColor: '#fff',
    height: 30,
    marginBottom: 15,
    padding: 3,
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputHelper: {
    marginTop: -10,
    marginBottom: 15,
    fontSize: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
    height: 30,
  },
  buttonText: {
    color: '#fff',
  },
});

export default styles;
