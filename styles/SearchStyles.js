import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  searchForm: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.red,
    height: 20,
    padding: 10,
    paddingBottom: 3,
  },
  text: {
    color: '#fff',
  },
  textInput: {
    backgroundColor: '#fff',
    flex: 7,
    height: 30,
    padding: 3,
    color: '#000',
    // borderWidth: 1,
    // borderColor: '#fff',
  },
  button: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    height: 30,
  },
  buttonText: {
    color: '#fff',
  },
  resultsWrapper: {
    flex: 1,
  },
  result: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 15,
  },
  resultImg: {
    flex: 1,
    width: '20%',
    height: 90,
    marginRight: 10,
  },
  resultTitle: {
    width: '80%',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    height: 300
  },
});

export default styles;
