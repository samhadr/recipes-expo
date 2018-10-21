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
  recipeListingContent: {
    flex: 10,
  },
  recipeHeader: {
    width: '100%',
  },
  recipeHeaderImg: {
    width: window.width,
    height: window.width,
  },
  recipeHeaderContent: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    paddingBottom: 0,
  },
  recipeHeaderContentEdit: {
    // position: 'relative',
  },
  recipeHeaderCopy: {
    flex: 8,
    margin: 0,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
  recipeHeaderButtons: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 6,
    width: window.width,
    // marginTop: 6,
  },
  recipeHeaderButton: {
    flexDirection: 'row',
    marginRight: 5,
    marginLeft: 5,
  },
  ingredients: {
    flex: 10,
    // backgroundColor: '#ddd',
  },
  actionButtons: {
    flex: 2,
    alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  actionButton: {
    width: 28,
  },
});

export default styles;
