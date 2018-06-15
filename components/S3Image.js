import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Storage } from "aws-amplify";

import { Image } from 'react-native';

class S3Image extends Component {
  static propTypes = {
    image: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      imageURL: ''
    }
  }

  componentDidMount() {
    this.getImagePath();
  }

  getImagePath = async () => {
    const { image } = this.props;
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
    const imagePath = imageURL ? imageURL : 'none';

    return (
      <Image
        source={{ uri: imagePath }}
        style={{ width: 50, height: 50 }}
      />
    )
  }
}

export default S3Image;