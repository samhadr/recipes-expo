import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Image } from 'react-native';

import { Storage } from 'aws-amplify';

import recipeStyles from '../styles/RecipeStyles';

class S3Image extends Component {
  static propTypes = {
    image: PropTypes.string,
    imageStyle: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      imageURL: ''
    }
  }

  componentWillMount() {
    this.getImagePath();
  }

  componentDidMount() {
    this.getImagePath();
  }

  getImagePath = async () => {
    const { image } = this.props;
    console.log('S3Image image: ', image);
    Storage.vault.get(image)
    .then(imagePath => {
      this.setState({
        imageURL: imagePath
      });
    })
    .catch(err => {
      console.log('getImagePath error: ', err);
    });
  }

  render() {
    const { imageURL } = this.state;
    console.log('imageURL: ', imageURL);
    const { imageStyle } = this.props;
    console.log('imageStyle: ', imageStyle, typeof imageStyle);
    const imagePath = imageURL ? imageURL : 'none';
    console.log('imagePath: ', imagePath);

    return (
      <Image
        source={{ uri: imagePath }}
        style={ imageStyle === 'thumbnail' ? recipeStyles.recipeThumb : recipeStyles.recipeImg }
      />
    )
  }
}

export default S3Image;