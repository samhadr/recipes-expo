import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';

import { WebBrowser } from 'expo';

import { Ionicons } from '@expo/vector-icons';

import { API } from "aws-amplify";

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/HomeStyles';
import recipesStyles from '../styles/RecipesStyles';

class Recipes extends Component {
  static navigationOptions = {
    title: 'Recipes',
  };

  static propTypes = {
    authenticate: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userEmail: this.props.screenProps.userEmail,
      recipesData: {},
      recipe: "{\"title\":\"Recipe Title 01\",\"ingredients\":\"ingredient 01, ingredient 02, ingredient 03\",\"method\":\"Mix all ingredients together, pour into a bowl, and serve.\",\"attachment\":\"hello.jpg\"}"
    }
    this.getRecipes = this.getRecipes.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
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

  // renderRecipe = ({item}) => (
  //   <SearchResult
  //     key={item.id.videoId}
  //     videoId={item.id.videoId}
  //     videoImgSrc={item.snippet.thumbnails.default.url}
  //     videoTitle={item.snippet.title}
  //     addToPlaylist={this.addToPlaylist}
  //   />
  // );

  // renderRecipesList = () => {
  //   const { recipesData } = this.state;

  //   if (recipesData) {
  //     const results = recipesData.map(recipe => {
  //       <View key={recipe.recipeId}>
  //         <Text>{recipe.content}</Text>
  //       </View>
  //     });
  //     return results;
  //   }
  //   return null;
  // }

  renderRecipes(recipes) {
    return [{}].concat(recipes).map( (recipe, i) =>
        i !== 0
          ? <View
              key={recipe.recipeId}
              style={recipesStyles.recipe}
            >
              <TouchableOpacity
                onPress={this.handleRecipeClick.bind(this, recipe)}
                title={recipe.title}
                id={recipe.recipeId}
              >
                <Text>{recipe.title}</Text>
                <Text>{recipe.recipeId}</Text>
              </TouchableOpacity>
              <Text>{"Created: " + new Date(recipe.createdAt).toLocaleString()}</Text>
            </View>
          : <View
              key="new"
            >
              <TouchableOpacity
                // href="/recipes/new"
                // onPress={this.handleRecipeClick}
                title="Create a new recipe"
              >
                <Text>{"\uFF0B"} Create a new recipe</Text>
              </TouchableOpacity>
            </View>
    );
  }

  handleRecipeClick = (recipe) => {
    console.log('recipe: ', recipe);
    console.log('id: ', recipe.recipeId);
    this.props.navigation.push('Recipe', { recipe: recipe});
  }

  render() {
    // const { screenProps } = this.props
    const { recipesData } = this.state;
    console.log('recipesData: ', recipesData);
    // const userEmail = screenProps.userEmail !== null ? screenProps.userEmail : null;
    const showRecipes = Object.keys(recipesData).length > 0 ? this.renderRecipes(recipesData) : null;

    return (
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={styles.content}>
            <TouchableOpacity
              type="submit"
              onPress={this.getRecipes}
              title="Get Recipes"
              accessibilityLabel="Get Recipes"
            >
              <Text>Get Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              type="submit"
              onPress={this.submitRecipe}
              title="Submit Recipe"
              accessibilityLabel="Submit Recipe"
            >
              <Text>Submit Recipe</Text>
            </TouchableOpacity>
            {showRecipes}
          </View>
        </View>
      </ScrollView>
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
