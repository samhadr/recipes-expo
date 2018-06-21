import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../constants/Colors';

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  recipeListing: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  recipeThumb: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  recipeHeader: {
    width: '100%',
    // marginBottom: 15,
    // paddingBottom: 15,
    // borderBottomWidth: 1,
    // borderColor: '#ddd',
  },
  recipeHeaderImg: {
    // alignItems: 'flex-end',
    width: window.width,
    height: window.width,
    // borderWidth: 1,
    // borderColor: '#ddd',
  },
  recipeHeaderContent: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  recipeHeaderCopy: {
    flex: 8,
    padding: 10,
    color: '#fff',
  },
  recipeHeaderButtons: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    paddingRight: 10,
  },
  recipeHeaderButton: {
    flexDirection: 'row',
    marginLeft: 10,
  },
});

export default styles;
