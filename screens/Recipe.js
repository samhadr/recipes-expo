import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView
} from 'react-native';

import { API } from 'aws-amplify';

import globalStyles from '../styles/GlobalStyles';
import formStyles from '../styles/FormStyles';

class Recipe extends Component {
  static navigationOptions = {
    title: 'Create A Recipe',
  };

  static propTypes = {
    authenticate: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    userId: PropTypes.string,
    // recipeId: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      recipe: null,
      title: '',
      ingredients: [],
      method: '',
      attachmentURL: null
    }

    this.file = null;

    this.onChangeText = this.onChangeText.bind(this);
  }

  componentDidMount() {
    this.showRecipe();
  }

  showRecipe = () => {
    const recipe = this.props.navigation.getParam('recipe');
    console.log('recipe: ', recipe);
    return (
      <View>
        <Text>{recipe.title}</Text>
        <Text>{recipe.ingredients}</Text>
        <Text>{recipe.method}</Text>
      </View>
    )
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  updateRecipe = async event => {
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

  putRecipe = (recipe) => {
    return API.put('recipes', '/recipes', {
      body: recipe
    });
  }

  deleteRecipe() {
    return API.del("recipes", `/recipes/${this.props.match.params.id}`);
  }
  
  handleDelete = async event => {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
  
    if (!confirmed) {
      return;
    }
  
    this.setState({ isDeleting: true });
  
    try {
      await this.deleteRecipe();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    const recipe = this.props.navigation.getParam('recipe');
    console.log('recipe: ', recipe);

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.content}>
          <ScrollView>
            <Text>{recipe.title}</Text>
            <Text>{recipe.ingredients}</Text>
            <Text>{recipe.method}</Text>
          </ScrollView>
          <View style={formStyles.formBox}>
            <TextInput
              style={formStyles.textInput}
              value={this.state.recipeTitle}
              onChangeText={value => this.onChangeText('recipeTitle', value)}
              placeholder="Recipe Title"
              autoFocus={true}
            />
            <TextInput
              style={formStyles.textInput}
              value={this.state.ingredients[0]}
              onChangeText={value => this.onChangeText('ingredients[0]', value)}
              placeholder="Add Ingredient"
            />
            <TextInput
              style={formStyles.textInput}
              multiline
              numberOfLines={5}
              value={this.state.method}
              onChangeText={value => this.onChangeText('method', value)}
              placeholder="Method"
            />
            {/* {this.state.showSignInError ? <Text style={globalStyles.error}>Incorrect username or password</Text> : null} */}
            <TouchableOpacity
              type="submit"
              style={formStyles.button}
              onPress={this.submitRecipe}
              title="Create Recipe"
              accessibilityLabel="Create Recipe"
            >
              <Text style={formStyles.buttonText}>Create Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

}

export default Recipe;
