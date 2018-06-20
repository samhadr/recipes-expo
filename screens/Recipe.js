import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Platform
} from 'react-native';

import { API, Storage } from 'aws-amplify';

import { ImagePicker, Permissions, FileSystem } from 'expo';

import { s3Upload, s3Delete } from '../libs/awsLib';

import globalStyles from '../styles/GlobalStyles';
import formStyles from '../styles/FormStyles';
import recipeStyles from '../styles/RecipeStyles';

class Recipe extends Component {
  static navigationOptions = {
    title: 'Create A Recipe',
  };

  static propTypes = {
    authenticate: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object,
    userId: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      title: '',
      ingredients: null,
      instructions: '',
      date: 0,
      id: '',
      attachment: '',
      attachmentURL: '',
      newAttachment: '',
      imageObject: null,
      editMode: false,
      isUpdating: false,
      isDeleting: false
    }
  }

  componentDidMount() {
    this.setRecipe();
    console.log('mounted ingredients: ', this.state.ingredients);
  }

  setRecipe = async () => {
    const recipe = this.props.navigation.getParam('recipe');
    let attachmentPath;
    if (recipe.attachment) {
      attachmentPath = await Storage.vault.get(recipe.attachment);
    }
    this.setState({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      date: recipe.createdAt,
      id: recipe.recipeId,
      attachment: recipe.attachment,
      attachmentURL: attachmentPath
    });
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  onChangeIngredient = (i, key, value) => {
    const { ingredients } = this.state;
    if (ingredients) {
      const newIngredients = ingredients.slice();
      console.log('newIngredients: ', newIngredients);
      console.log('i: ', i);
      console.log('key: ', key);
      console.log('value: ', value);
      newIngredients[i][key] = value;
      this.setState({
        ingredients: newIngredients
      });
      // console.log('key: value = ', newIngredients[i].key + ':' + value);
      console.log('newIngredients after assign: ', newIngredients);
    }
  }

  handleUpdate = async () => {
    console.log('handle update');
  
    if (this.state.newAttachment) {
      let fileInfo = await FileSystem.getInfoAsync(this.state.newAttachment, { size: true });
      console.log('file size: ', fileInfo.size);
    
      if (this.state.imageObject && (fileInfo.size > config.s3.MAX_FILE_SIZE)) {
        alert("Please choose a file smaller than 5MB");
        return;
      }
    }
  
    this.setState({ isUpdating: true });
  
    try {
      if (this.state.imageObject !== null) {
        const newAttachment = await s3Upload(this.state.imageObject);
        const attachmentPath = await Storage.vault.get(newAttachment);
        await s3Delete(this.state.attachment);
        this.setState({
          attachment: newAttachment,
          attachmentURL: attachmentPath
        });
      }
      await this.updateRecipe({
        title: this.state.title,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        attachment: this.state.attachment
      });
      this.setState({
        isUpdating: false,
        editMode: false
      });
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
  
  handleDelete = async () => {
    console.log('handle delete');
  
    this.setState({ isDeleting: true });
  
    try {
      await s3Delete(this.state.attachment);
      await this.deleteRecipe();
      this.setState({ isDeleting: false });
      this.props.navigation.goBack();
    } catch (e) {
      console.log('handleDelete error: ', e);
      this.setState({ isDeleting: false });
    }
  }

  deleteImage = async () => {
    try {
      await s3Delete(this.state.attachment);
      this.setState({
        attachment: '',
        attachmentURL: ''
      });
    } catch (e) {
      console.log('deleteImage error: ', e);
    }
  }

  handleEdit = () => {
    this.setState(prevState => ({
      editMode: !prevState.editMode
    }));
  }

  editUpdateButton = () => {
    const { editMode } = this.state;
    return editMode
      ? <TouchableOpacity
          type="submit"
          style={formStyles.button}
          onPress={this.handleUpdate}
          title="Done"
          accessibilityLabel="Done"
        >
          <Text style={formStyles.buttonText}>Done</Text>
        </TouchableOpacity>
      : <TouchableOpacity
          type="submit"
          style={formStyles.button}
          onPress={this.handleEdit}
          title="Edit Recipe"
          accessibilityLabel="Edit Recipe"
        >
          <Text style={formStyles.buttonText}>Edit Recipe</Text>
        </TouchableOpacity>
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
          attachmentURL: result.uri
        });
      }
    })
    .catch((err) => {
        console.log('ImagePicker error: ', err);
    });
  }

  recipeHeader = () => {
    const { editMode, title, date, attachmentURL } = this.state;

    if (editMode) {
      console.log('recipeHeader attachmentURL: ', attachmentURL);
      return (
        <View style={recipeStyles.recipeHeader}>
          <TextInput
            style={[formStyles.textInput, recipeStyles.recipeHeaderCopy]}
            value={title}
            onChangeText={value => this.onChangeText('title', value)}
            placeholder={title}
            underlineColorAndroid="transparent"
          />
          {
            attachmentURL
            ? <View>
                <Image
                  style={recipeStyles.recipeImg}
                  source={{ uri: attachmentURL }}
                />
                <TouchableOpacity
                  onPress={this.handleImageButton}
                  title="Change image"
                >
                  <Text>{"\uFF0B"} Change image</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.deleteImage}
                  title="Delete image"
                >
                  <Text>{"\uFF0B"} Delete image</Text>
                </TouchableOpacity>
              </View>
            : <TouchableOpacity
                onPress={this.handleImageButton}
                title="Add image"
              >
                <Text>{"\uFF0B"} Add image</Text>
              </TouchableOpacity>
          }
        </View>
      )
    }
    
    return (
      <View style={recipeStyles.recipeHeader}>
        <View style={recipeStyles.recipeHeaderCopy}>
          <Text style={[globalStyles.heading, recipeStyles.recipeHeaderTitle]}>{title}</Text>
          <Text style={globalStyles.smallText}>{new Date(date).toLocaleDateString()}</Text>
        </View>
        {
          attachmentURL
          ? <Image
              style={recipeStyles.recipeImg}
              source={{ uri: attachmentURL }}
            />
          : null
        }
      </View>
    )
  }

  ingredients = () => {
    const { editMode, ingredients } = this.state;
    console.log('ingredients: ', ingredients, typeof ingredients);
    return [{}].concat(ingredients).map((ingredient, index) => {
      console.log('ingredient.unit: ', ingredient.unit);
      if (editMode && index > 0) {
        console.log('index: ', index);
        return (
          <View key={index} style={{ flexDirection: 'row' }}>
            <TextInput
              style={formStyles.textInput}
              value={ingredient.amount}
              onChangeText={value => this.onChangeIngredient((index -1), 'amount', value)}
              placeholder={ingredient.amount ? ingredient.amount : 'amount'}
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={formStyles.textInput}
              value={ingredient.unit}
              onChangeText={value => this.onChangeIngredient((index -1), 'unit', value)}
              placeholder={ingredient.unit ? ingredient.unit : 'unit'}
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={formStyles.textInput}
              value={ingredient.name}
              onChangeText={value => this.onChangeIngredient((index -1), 'name', value)}
              placeholder={ingredient.name ? ingredient.name : 'name'}
              underlineColorAndroid="transparent"
            />
          </View>
        )
      }
      console.log('index: ', index);
      return (
        <View key={index} style={{ flexDirection: 'row' }}>
          <Text>{ingredient.amount}</Text>
          <Text>{ingredient.unit}</Text>
          <Text>{ingredient.name}</Text>
        </View>
      )
    });
  }

  instructions = () => {
    const { editMode, instructions } = this.state;

    if (editMode) {
      return (
        <TextInput
          style={formStyles.textInput}
          multiline
          numberOfLines={5}
          value={instructions}
          onChangeText={value => this.onChangeText('instructions', value)}
          placeholder={instructions}
          underlineColorAndroid="transparent"
        />
      )
    }
    return (
      <Text>{instructions}</Text>
    )
  }

  render() {
    const {
      // ingredients,
      // instructions,
      // attachment,
      // attachmentURL,
      // newAttachment,
      // editMode
    } = this.state;
    const recipeHeader = this.recipeHeader();
    const ingredients = this.state.ingredients ? this.ingredients() : null;
    const instructions = this.instructions();
    const toggleEditUpdate = this.editUpdateButton();
    console.log('attachment: ', this.state.attachment, typeof this.state.attachment);
    console.log('attachmentURL: ', this.state.attachmentURL, typeof this.state.attachmentURL);
    console.log('isUpdating: ', this.state.isUpdating);
    console.log('isDeleting: ', this.state.isDeleting);
    console.log('newAttachment: ', this.state.newAttachment, typeof this.state.newAttachment);

    return (
      <View style={globalStyles.container}>
        <ScrollView>
          {recipeHeader}
          {ingredients}
          {instructions}
        </ScrollView>
        <View style={formStyles.formBox}>
          {toggleEditUpdate}
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
    );
  }

}

export default Recipe;
