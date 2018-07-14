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
    marginBottom: 15,
    paddingTop: 5,
    paddingBottom: 5,
    // fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  textEdit: {
    marginRight: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
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
    marginTop: 10,
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
    color: Colors.gold,
  },
});

export default styles;
