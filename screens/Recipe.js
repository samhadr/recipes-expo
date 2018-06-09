import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';

import { API } from 'aws-amplify';

import EditableText from '../components/EditableText';

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
      title: '',
      ingredients: '',
      instructions: '',
      date: 0,
      id: '',
      attachment: '',
      isUpdating: false,
      isDeleting: false
    }

    this.file = null;

    this.handleDelete = this.handleDelete.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.setRecipe();
  }

  setRecipe = () => {
    const recipe = this.props.navigation.getParam('recipe');
    this.setState({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      date: recipe.createdAt,
      id: recipe.recipeId
    });
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  async handleUpdate() {
    console.log('handle update');
  
    // if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
    //   alert("Please pick a file smaller than 5MB");
    //   return;
    // }
  
    this.setState({ isUpdating: true });
  
    try {
      await this.updateRecipe({
        title: this.state.title,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        attachment: this.state.attachment
      });
      this.setState({ isUpdating: false });
      this.props.navigation.goBack();
    } catch (e) {
      console.log(e);
      this.setState({ isUpdating: false });
    }
  }

  updateRecipe = (recipe) => {
    return API.put('recipes', `/recipes/${this.state.id}`, {
      body: recipe
    });
  }

  deleteRecipe() {
    const { id } = this.state;
    console.log('recipe to delete: ', id);
    return API.del('recipes', `/recipes/${id}`);
  }

  confirmDelete = () => {
    console.log('confirm delete');
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => this.handleDelete()},
      ],
      { cancelable: false }
    )
  }
  
  async handleDelete() {
    console.log('handle delete');
  
    this.setState({ isDeleting: true });
  
    try {
      await this.deleteRecipe();
      this.setState({ isDeleting: false });
      this.props.navigation.goBack();
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    // const recipe = this.props.navigation.getParam('recipe');
    const { title, ingredients, instructions, date, id } = this.state;
    // console.log('recipe: ', recipe);
    console.log('isUpdating: ', this.state.isUpdating);
    console.log('isDeleting: ', this.state.isDeleting);

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.content}>
          <ScrollView>
            <Text>{title}</Text>
            <Text>{ingredients}</Text>
            <Text>{instructions}</Text>
            <Text>{"Created: " + new Date(date).toLocaleString()}</Text>
            <Text>{id}</Text>
            <EditableText
              text={title ? title : 'placeholder'}
              sendText={value => this.onChangeText('title', value)}
            />
          </ScrollView>
          <View style={formStyles.formBox}>
            {/* <TextInput
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
              value={this.state.instructions}
              onChangeText={value => this.onChangeText('instructions', value)}
              placeholder="instructions"
            /> */}
            {/* {this.state.showSignInError ? <Text style={globalStyles.error}>Incorrect username or password</Text> : null} */}
            {/* <TouchableOpacity
              type="submit"
              style={formStyles.button}
              onPress={this.submitRecipe}
              title="Create Recipe"
              accessibilityLabel="Create Recipe"
            >
              <Text style={formStyles.buttonText}>Create Recipe</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              type="submit"
              style={formStyles.button}
              onPress={this.handleUpdate}
              title="Update Recipe"
              accessibilityLabel="Update Recipe"
            >
              <Text style={formStyles.buttonText}>Update Recipe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              type="submit"
              style={formStyles.button}
              onPress={this.confirmDelete}
              title="Delete Recipe"
              accessibilityLabel="Delete Recipe"
            >
              <Text style={formStyles.buttonText}>Delete Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

}

export default Recipe;
