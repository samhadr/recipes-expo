import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import { WebBrowser } from 'expo';

import { API } from "aws-amplify";

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/HomeStyles';
import Colors from '../constants/Colors';

class Recipes extends Component {
  static navigationOptions = {
    title: 'Recipes',
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      recipesData: null
    }
    this.getRecipes = this.getRecipes.bind(this);
  }

  async getRecipes() {
    // if (!this.props.isAuthenticated) {
    //   return;
    // }
  
    try {
      const recipesData = await this.recipes();
      this.setState({ recipesData });
    } catch (e) {
      console.log('recipesData error: ', e);
    }
  
    this.setState({ isLoading: false });
  }
  
  recipes() {
    return API.get('recipes', '/recipes');
  }

  renderRecipe = ({item}) => (
    <SearchResult
      key={item.id.videoId}
      videoId={item.id.videoId}
      videoImgSrc={item.snippet.thumbnails.default.url}
      videoTitle={item.snippet.title}
      addToPlaylist={this.addToPlaylist}
    />
  );

  renderRecipesList = () => {
    const { searchResults: { items } } = this.state;
    const keyExtractor = (item, index) => item.etag;

    if (items) {
      const results = (
        <View>
          <FlatList
            keyExtractor={keyExtractor}
            data={items}
            renderItem={this.renderRecipe}
          />
        </View>
      );
      return results;
    }
    return null;
  }

  renderRecipes(recipes) {
    return [{}].concat(recipes).map(
      (recipe, i) =>
        i !== 0
          ? <ListGroupItem
              key={recipe.recipeId}
              href={`/recipes/${recipe.recipeId}`}
              onClick={this.handleRecipeClick}
              header={recipe.content.trim().split("\n")[0]}
            >
              {"Created: " + new Date(recipe.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/recipes/new"
              onClick={this.handleRecipeClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new recipe
              </h4>
            </ListGroupItem>
    );
  }

  handleRecipeClick = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Recipe');
  }

  render() {
    const { screenProps } = this.props
    const { recipesData } = this.state;
    console.log('recipesData: ', recipesData);
    const userObj = screenProps.user;
    const userEmail = Object.keys(userObj).length > 0 ? userObj.signInUserSession.idToken.payload.email : null;
    // const showRecipes = Object.keys(recipes).length > 0 ? this.renderRecipesList(recipes) : null;

    return (
      <View style={globalStyles.container}>
        <View style={styles.content}>
          <Text>You're In {userEmail}</Text>
          <TouchableOpacity
            type="submit"
            // style={searchStyles.button}
            onPress={this.getRecipes}
            title="Get Recipes"
            accessibilityLabel="Get Recipes"
          >
            <Text >Get Recipes</Text>
          </TouchableOpacity>
          {/* {showRecipes} */}
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

export default Recipes;
