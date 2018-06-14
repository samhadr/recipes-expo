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
      ingredients: '',
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
      const attachment = this.state.imageObject
        ? await s3Upload(this.state.imageObject)
        : null;
      await s3Delete(this.state.attachment);
      await this.updateRecipe({
        title: this.state.title,
        ingredients: this.state.ingredients,
        instructions: this.state.instructions,
        attachment
      });
      let attachmentPath;
      if (attachment) {
        attachmentPath = await Storage.vault.get(attachment);
      }
      this.setState({
        attachmentURL: attachmentPath,
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
      alert(e);
      this.setState({ isDeleting: false });
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

  render() {
    const {
      title,
      ingredients,
      instructions,
      date,
      attachment,
      attachmentURL,
      newAttachment,
      editMode
    } = this.state;
    const toggleEditUpdate = this.editUpdateButton();
    console.log('attachment: ', attachment, typeof attachment);
    console.log('attachmentURL: ', attachmentURL, typeof attachmentURL);
    console.log('isUpdating: ', this.state.isUpdating);
    console.log('isDeleting: ', this.state.isDeleting);
    console.log('newAttachment: ', newAttachment, typeof newAttachment);

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.content}>
          <ScrollView>
            {
              editMode
              ? <View>
                  {attachmentURL
                    ? <View>
                        <Image
                          style={{
                            width: 100,
                            height: 100,
                          }}
                          source={{ uri: attachmentURL }}
                        />
                        <TouchableOpacity
                          onPress={this.handleImageButton}
                          title="Change image"
                        >
                          <Text>{"\uFF0B"} Change image</Text>
                        </TouchableOpacity>
                      </View>
                    : <TouchableOpacity
                        onPress={this.handleImageButton}
                        title="Add image"
                      >
                        <Text>{"\uFF0B"} Add image</Text>
                      </TouchableOpacity>
                  }
                  <TextInput
                    style={formStyles.textInput}
                    value={title}
                    onChangeText={value => this.onChangeText('title', value)}
                    placeholder={title}
                    underlineColorAndroid="transparent"
                  />
                  <TextInput
                    style={formStyles.textInput}
                    value={ingredients}
                    onChangeText={value => this.onChangeText('ingredients', value)}
                    placeholder={ingredients}
                    underlineColorAndroid="transparent"
                  />
                  <TextInput
                    style={formStyles.textInput}
                    value={instructions}
                    onChangeText={value => this.onChangeText('instructions', value)}
                    placeholder={instructions}
                    underlineColorAndroid="transparent"
                  />
                </View>
              : <View>
                  {attachmentURL
                    ? <Image
                        style={{
                          width: 100,
                          height: 100,
                        }}
                        source={{ uri: attachmentURL }}
                      />
                    : null
                  }
                  <Text>{title}</Text>
                  <Text>{ingredients}</Text>
                  <Text>{instructions}</Text>
                </View>
            }
            <Text>{"Created: " + new Date(date).toLocaleString()}</Text>
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
      </View>
    );
  }

}

export default Recipe;
