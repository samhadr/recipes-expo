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
      recipe: "{\"title\":\"Recipe Title 01\",\"ingredients\":\"ingredient 01, ingredient 02, ingredient 03\",\"instructions\":\"Mix all ingredients together, pour into a bowl, and serve.\",\"attachment\":\"hello.jpg\"}"
    }
    this.getRecipes = this.getRecipes.bind(this);
  }

  // Update on navigating back from Recipe
  willFocus = this.props.navigation.addListener(
    'willFocus',
    payload => {
      this.handleRecipes();
    }
  );

  componentDidMount() {
    this.handleRecipes();
  }

  async handleRecipes() {
    if (!this.props.screenProps.isAuthenticated) {
      return;
    }
  
    try {
      const recipesData = await this.getRecipes();
      this.setState({ recipesData });
    } catch (e) {
      console.log('recipesData error: ', e);
    }
  
    this.setState({ isLoading: false });
  }
  
  getRecipes() {
    return API.get('recipes', '/recipes');
  }

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
          : null
    );
  }

  handleRecipeClick = (recipe) => {
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
                onPress={() => this.props.navigation.push('CreateRecipe')}
                title="Create a new recipe"
              >
                <Text>{"\uFF0B"} Create a new recipe</Text>
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
