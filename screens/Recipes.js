import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image
} from 'react-native';

import { WebBrowser } from 'expo';

import { API } from "aws-amplify";

import { s3Path } from '../libs/awsLib';

import Logo from '../components/icons/Logo';

import globalStyles from '../styles/GlobalStyles';
import recipeStyles from '../styles/RecipeStyles';

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
      recipesImgPaths: []
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
      this.getImgPaths();
    } catch (e) {
      console.log('recipesData error: ', e);
    }
  
    this.setState({ isLoading: false });
  }
  
  getRecipes() {
    console.log('getting recipes from API');
    return API.get('recipes', '/recipes');
  }

  async getImgPaths() {
    const { recipesData } = this.state;
    let paths = [];
    if (recipesData) {
      for (let r of recipesData) {
        console.log('r: ', r);
        console.log('r.attachment: ', r.attachment);
        if (r.attachment.length > 0) {
          try {
            let path = await s3Path(r.attachment);
            console.log('path: ', path);
            paths.push(path);
          } catch (err) {
            console.log(err);
          }
        } else {
          paths.push("");
        }
      }
      this.setState({
        recipesImgPaths: paths
      });
    }
  }

  renderRecipes = (recipes) => {
    const{ recipesImgPaths } = this.state;
    return [{}].concat(recipes).map((recipe, i) =>
      i !== 0
        ?
        <View key={recipe.recipeId}>
            <TouchableOpacity
              onPress={this.handleRecipeClick.bind(this, recipe)}
              title={recipe.title}
              id={recipe.recipeId}
              style={recipeStyles.recipeListing}
            >
              {
                recipe.attachment !== null
                ? <Image
                    source={{ uri: recipesImgPaths[i-1] }}
                    style={recipeStyles.recipeThumb}
                  />
                : <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.sageGreen, width: 50, height: 50, marginRight: 10, padding: 10 }}>
                    <Logo fill="#fff" />
                  </View>
              }
              <View style={recipeStyles.recipeListingContent}>
                <Text style={[globalStyles.heading, { marginBottom: 0 }]}>{recipe.title}</Text>
              </View>
            </TouchableOpacity>
          </View>
        : null
    )
  }

  handleRecipeClick = (recipe) => {
    this.props.navigation.push('Recipe', { recipe: recipe});
  }

  render() {
    const { recipesData, recipesImgPaths } = this.state;
    console.log('recipesData: ', recipesData);
    console.log('recipesImgPaths: ', recipesImgPaths);
    const showRecipes = Object.keys(recipesData).length > 0 ? this.renderRecipes(recipesData) : null;

    return (
      <View style={globalStyles.container}>
        <ScrollView>
            <TouchableOpacity
              onPress={() => this.props.navigation.push('CreateRecipe')}
              title="Create a new recipe"
              style={{ alignSelf: 'flex-start', paddingBottom: 10 }}
            >
              <Text style={{ fontWeight: 'bold', color: Colors.sageGreen }}>{"\uFF0B"} Add Recipe</Text>
            </TouchableOpacity>
            {showRecipes}
        </ScrollView>
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
