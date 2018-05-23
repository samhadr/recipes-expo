import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  result: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    marginBottom: 7,
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  resultImg: {
    width: 160,
    height: 116,
    marginRight: 10,
  },
  resultInfo: {
    width: '50%',
  },
  resultTitle: {
    fontWeight: 'bold',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  addButton: {
    flexDirection: 'row',
  },
  addButtonIcon: {
    marginRight: 7,
    color: Colors.red,
  },
  addButtonText: {
    fontSize: 12,
    color: Colors.red,
  },
});

export default styles;
