import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { WebBrowser } from 'expo';

import { API } from "aws-amplify";

import globalStyles from '../styles/GlobalStyles';
import styles from '../styles/HomeStyles';

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
      recipe: "{\"content\":\"test01 recipe\",\"attachment\":\"test01.jpg\"}"
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
    const { recipesData } = this.state;

    if (recipesData) {
      const results = recipesData.map(recipe => {
        <View key={recipe.recipeId}>
          <Text>{recipe.content}</Text>
        </View>
      });
      return results;
    }
    return null;
  }

  renderRecipes(recipes) {
    return [{}].concat(recipes).map(
      (recipe, i) =>
        i !== 0
          ? <View
              key={recipe.recipeId}
            >
              <TouchableOpacity
                // href={`/recipes/${recipe.recipeId}`}
                onClick={this.handleRecipeClick}
                title={recipe.content.trim().split("\n")[0]}
              >
                <Text>{recipe.content.trim().split("\n")[0]}</Text>
              </TouchableOpacity>
              {/* <Text>{"Created: " + new Date(recipe.createdAt).toLocaleString()}</Text> */}
            </View>
          : <View
              key="new"
            >
              <TouchableOpacity
                // href="/recipes/new"
                onClick={this.handleRecipeClick}
                title="Create a new recipe"
              >
                <Text>{"\uFF0B"} Create a new recipe</Text>
              </TouchableOpacity>
            </View>
    );
  }

  handleRecipeClick = (e) => {
    e.preventDefault();
    this.props.navigation.navigate('Recipe');
  }

  submitRecipe = async event => {
    event.preventDefault();
  
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }
  
    this.setState({ isLoading: true });
  
    try {
      await this.createRecipe({
        content: this.state.recipe
      });
      this.props.navigation.navigate('Recipes');
    } catch (e) {
      console.log(e);
      this.setState({ isLoading: false });
    }
  }

  createRecipe = (recipe) => {
    return API.post('recipes', '/recipes', {
      body: recipe
    });
  }

  render() {
    // const { screenProps } = this.props
    const { recipesData } = this.state;
    console.log('recipesData: ', recipesData);
    // const userEmail = screenProps.userEmail !== null ? screenProps.userEmail : null;
    const showRecipes = Object.keys(recipesData).length > 0 ? this.renderRecipes(recipesData) : null;

    return (
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
