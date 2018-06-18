import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  recipeListing: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  recipeThumb: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  recipeHeader: {
    flexDirection: 'row',
    width: '100%',
  },
  recipeHeaderCopy: {
    flex: 8,
  },
  recipeImg: {
    alignItems: 'flex-end',
    width: 100,
    height: 100,
  },
});

export default styles;
