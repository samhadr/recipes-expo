import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  CameraRoll,
  Button,
  ScrollView,
  Image
} from 'react-native';

import { API } from 'aws-amplify';
import config from '../config';
import { s3Upload } from '../libs/awsLib';

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
      // attachment: '',
      isCreating: false,
      showPhotos: false,
      photos: []
    }

    this.file = null;

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
  
    if (this.file && this.file.size > config.s3.MAX_FILE_SIZE) {
      alert("Please pick a file smaller than 5MB");
      return;
    }
  
    this.setState({ isCreating: true });
  
    try {
      const attachment = this.file
        ? await s3Upload(this.file)
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

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleImageButton = () => {
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        this.setState({
          photos: r.edges,
          showPhotos: true
        });
      })
      .catch((err) => {
          console.log('image error: ', err);
          this.setState({ showPhotos: false });
      });
    };

  selectImage = (p) => {
    this.setState({
      // attachment: image.uri,
      showPhotos: false
    }),
    this.file = p;
    console.log('p: ', p);
  }

  render() {
    const { showPhotos } = this.state;
    console.log('showPhotos: ', showPhotos);

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
          {
            this.file !== null
            ? <Image
                style={{
                  width: 300,
                  height: 100,
                }}
                source={this.file}
              />
            : null
          }
          {/* <TextInput
            style={formStyles.textInput}
            value={this.state.attachment}
            onChangeText={value => this.onChangeText('attachment', value)}
            placeholder="Add Attachment"
          /> */}
          <Button title="Load Images" onPress={this.handleImageButton} />
          <ScrollView>
            {!showPhotos
              ? null
              : this.state.photos.map((p, i) => {
                return (
                  <TouchableOpacity
                    // type="submit"
                    // style={formStyles.button}
                    key={i}
                    onPress={() => this.selectImage(p)}
                    title="Select Image"
                    accessibilityLabel="Select Image"
                  >
                    <Image
                      // key={i}
                      style={{
                        width: 300,
                        height: 100,
                      }}
                      source={{ uri: p.node.image.uri }}
                    />
                  </TouchableOpacity>
                );
              })
            }
          </ScrollView>
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
