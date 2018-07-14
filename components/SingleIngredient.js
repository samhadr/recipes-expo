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
  Image,
  Platform
} from 'react-native';

import formStyles from '../styles/FormStyles';

class SingleIngredient extends Component {
  static propTypes = {
    name: PropTypes.string,
    amount: PropTypes.string,
    unit: PropTypes.string,
    editMode: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  renderSingleIngredient = () => {
    const { name, amount, unit, editMode } = this.props;

    if (editMode) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[formStyles.textInput, formStyles.textEdit]}
            value={amount}
            onChangeText={value => amount = value}
            placeholder={amount ? amount : 'amount'}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={[formStyles.textInput, formStyles.textEdit]}
            value={unit}
            onChangeText={value => unit = value}
            placeholder={unit ? unit : 'unit'}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={[formStyles.textInput, formStyles.textEdit]}
            value={name}
            onChangeText={value => name = value}
            placeholder={name ? name : 'name'}
            underlineColorAndroid="transparent"
          />
          {/* <Ionicons name={Platform.OS === 'ios' ? `ios-checkmark-circle` : 'md-checkmark-circle'} size={25} color={Colors.sageGreen} /> */}
        </View>
      )
    }
    return (
      <Text>
        {amount ? amount : null} {unit ? unit : null} {name ? name : null}
      </Text>
    )
  }

  render() {
    const ingredient = this.renderSingleIngredient();
    
    return (
      <View className="ingredient">
        {ingredient}
      </View>
    )
  }
}

export default Ingredient;