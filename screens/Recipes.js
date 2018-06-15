import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image
} from 'react-native';

import { WebBrowser } from 'expo';

import { Ionicons } from '@expo/vector-icons';

import { API, Storage } from "aws-amplify";

import S3Image from '../components/S3Image';

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/HomeStyles';
import recipesStyles from '../styles/RecipesStyles';

import Colors from '../constants/Colors';

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
      recipesData: {},
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
    return [{}].concat(recipes).map((recipe, i) =>
      i !== 0
        ? <View
            key={recipe.recipeId}
            style={recipesStyles.recipe}
          >
            <TouchableOpacity
              onPress={this.handleRecipeClick.bind(this, recipe)}
              title={recipe.title}
              id={recipe.recipeId}
              style={{ flex: 8 }}
            >
              <Text>{recipe.title}</Text>
              <Text style={{ alignItems: 'flex-end' }}>{"Created: " + new Date(recipe.createdAt).toLocaleString()}</Text>
            </TouchableOpacity>
            {
              recipe.attachment !== null
              ? <S3Image
                  image={recipe.attachment}
                  style={{ flex: 4 }}
                />
              : null
            }
          </View>
        : null
    )
  }

  handleRecipeClick = (recipe) => {
    this.props.navigation.push('Recipe', { recipe: recipe});
  }

  render() {
    const { recipesData } = this.state;
    const showRecipes = Object.keys(recipesData).length > 0 ? this.renderRecipes(recipesData) : null;

    return (
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => this.props.navigation.push('CreateRecipe')}
              title="Create a new recipe"
              style={{ alignSelf: 'flex-start', paddingBottom: 10 }}
            >
              <Text style={{ fontWeight: 'bold', color: Colors.sageGreen }}>{"\uFF0B"} Add Recipe</Text>
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
