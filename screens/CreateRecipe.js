import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';

import { API } from 'aws-amplify';

import { onChangeText } from '../utilities/helpers';

import globalStyles from '../styles/GlobalStyles';
import formStyles from '../styles/FormStyles';

class CreateRecipe extends Component {
  static navigationOptions = {
    title: 'Create A Recipe',
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
      recipeTitle: '',
      ingredients: [],
      method: '',
    }
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
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
    // const showRecipes = Object.keys(recipesData).length > 0 ? this.renderRecipes(recipesData) : null;

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.content}>
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

export default CreateRecipe;
