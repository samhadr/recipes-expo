import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Image,
  Platform
} from 'react-native';

import { ImagePicker, Permissions, FileSystem } from 'expo';

import { API } from 'aws-amplify';
import config from '../config';
import { s3Upload } from '../libs/awsLib';

import AllIngredients from '../components/AllIngredients';
import AddIngredient from '../components/AddIngredient';

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
      ingredients: [],
      instructions: '',
      isCreating: false,
      showPhotos: false,
      photos: [],
      imageObject: null,
      image: '',
      canUpdate: false
    }
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  handleCreate = async () => {
    console.log('handle create');

    let fileInfo = await FileSystem.getInfoAsync(this.state.image, { size: true });
    console.log('file size: ', fileInfo.size);
  
    if (this.state.imageObject && (fileInfo.size > config.s3.MAX_FILE_SIZE)) {
      alert("Please choose a file smaller than 5MB");
      return;
    }
  
    this.setState({ isCreating: true });
  
    try {
      const attachment = this.state.imageObject
        ? await s3Upload(this.state.imageObject)
        : null;
      
      await this.createRecipe({
        title: this.state.title,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        attachment
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

  handleImageButton = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        this.chooseImage();
      } else {
        const error = 'Camera Roll permission not granted';
        console.log('error: ', error);
        throw new Error(error);
      }
    } else {
      this.chooseImage();
    }
  }

  chooseImage = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })
    .then(result => {
      if (result && !result.cancelled) {
        this.setState({
          imageObject: result,
          image: result.uri
        });
      }
    })
    .catch((err) => {
        console.log('ImagePicker error: ', err);
    });
  }

  addIngredient = () => {
    const { ingredients } = this.state;
    const newIngredient = { name: null, amount: null, unit: null}
    const updatedIngredients = new Array(ingredients);

    updatedIngredients[0].push(newIngredient);
    console.log('updatedIngredients: ', updatedIngredients);
    this.setState({
      ingredients: updatedIngredients[0]
    });
  }

  handleIngredientsChange = (i, key, value) => {
    const { ingredients } = this.state;
    const updatedIngredients = new Array(ingredients);

    updatedIngredients[0][i][key] = value;
    console.log('updatedIngredients: ', updatedIngredients);

    this.setState({
      ingredients: updatedIngredients[0]
    });
  }

  ingredientDelete = (i) => {
    console.log('handleIngredientsChange: ', i);
    const { ingredients } = this.state;
    const updatedIngredients = new Array(ingredients);

    updatedIngredients[0].splice(i, 1);
    console.log('updatedIngredients: ', updatedIngredients);

    this.setState({
      ingredients: updatedIngredients[0]
    });
  }

  render() {
    const { imageObject, image, ingredients, canUpdate } = this.state;
    console.log('imageObject: ', imageObject);
    console.log('image: ', image);

    return (
      <View style={globalStyles.container}>
        <View style={formStyles.formBox}>
          <TextInput
            style={formStyles.textInput}
            value={this.state.title}
            onChangeText={value => this.onChangeText('title', value)}
            placeholder="Recipe Title"
            underlineColorAndroid="transparent"
            autoFocus={true}
          />
          <AllIngredients
            ingredients={ingredients}
            editMode={true}
            canUpdate={true}
            onIngredientsChange={this.handleIngredientsChange}
            onIngredientDelete={this.ingredientDelete}
          />
          <AddIngredient
            handleOnPress={() => this.addIngredient()}
          />
          <TextInput
            style={formStyles.textInput}
            multiline
            numberOfLines={5}
            value={this.state.instructions}
            onChangeText={value => this.onChangeText('instructions', value)}
            placeholder="Instructions"
            underlineColorAndroid="transparent"
          />
          {
            image
            ? <Image
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{ uri: this.state.image }}
              />
            : null
          }
          <Button title="Load Images" onPress={this.handleImageButton} />
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
    );
  }

}

export default CreateRecipe;
