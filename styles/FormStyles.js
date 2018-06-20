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
    marginBottom: 15,
    padding: 10,
    fontSize: 20,
    color: '#000',
    borderBottomWidth: 2,
    borderColor: '#ddd',
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
    backgroundColor: Colors.sageGreen,
    marginBottom: 10,
    padding: 15,
    paddingBottom: 18,
    borderRadius: 3,
  },
  buttonFixedWidth: {
    width: 140,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default styles;
