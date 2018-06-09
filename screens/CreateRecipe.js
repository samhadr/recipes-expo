import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';

import { API } from 'aws-amplify';

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
      title: '',
      ingredients: '',
      instructions: '',
      attachment: '',
      isCreating: false
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  async handleCreate() {
    console.log('handle create');
  
    // if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert("Please pick a file smaller than 5MB");
    //   return;
    // }
  
    this.setState({ isCreating: true });
  
    try {
      await this.createRecipe({
        title: this.state.title,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        attachment: this.state.attachment
      });
      this.props.navigation.goBack();
    } catch (e) {
      console.log(e);
      this.setState({ isCreating: false });
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
            value={this.state.title}
            onChangeText={value => this.onChangeText('title', value)}
            placeholder="Recipe Title"
            autoFocus={true}
          />
          <TextInput
            style={formStyles.textInput}
            value={this.state.ingredients}
            onChangeText={value => this.onChangeText('ingredients', value)}
            placeholder="Add Ingredient"
          />
          <TextInput
            style={formStyles.textInput}
            multiline
            numberOfLines={5}
            value={this.state.instructions}
            onChangeText={value => this.onChangeText('instructions', value)}
            placeholder="Instructions"
          />
          <TextInput
            style={formStyles.textInput}
            value={this.state.attachment}
            onChangeText={value => this.onChangeText('attachment', value)}
            placeholder="Add Attachment"
          />
          {/* {this.state.showSignInError ? <Text style={globalStyles.error}>Incorrect username or password</Text> : null} */}
          <TouchableOpacity
            type="submit"
            style={formStyles.button}
            onPress={this.handleCreate}
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
