import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';

import formStyles from '../styles/FormStyles';
import recipeStyles from '../styles/RecipeStyles';
import Colors from '../constants/Colors';

import { Ionicons } from '@expo/vector-icons';

class SingleIngredient extends Component {
  static propTypes = {
    index: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.string,
    unit: PropTypes.string,
    editMode: PropTypes.bool,
    canUpdate: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      amount: '',
      unit: '',
      savedIngredient: false
    }
  }

  componentDidMount() {
    this.setValues();
  }

  setValues = () => {
    this.setState({
      name: this.props.name,
      amount: this.props.amount,
      unit: this.props.unit
    });
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  handleChange = (i) => {
    const { name, amount, unit, savedIngredient } = this.state;
    // this.setState(
    //   { savedIngredient: true },
    //   this.props.onIngredientChange(i, name, amount, unit, savedIngredient),
    //   console.log('handleChange: ', (i), savedIngredient)
    //   );
    this.props.onIngredientChange(i, name, amount, unit, true);
  }

  handleDelete = (i) => {
    console.log('handleDelete: ', i);
    this.props.onIngredientDelete(i);
  }

  renderSingleIngredient = () => {
    const { index, editMode, savedIngredient } = this.props;
    const { name, amount, unit } = this.state;
    console.log('single state: ', this.state);
    console.log()

    if (editMode) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[formStyles.textInput, formStyles.textEdit, { flex: 1 }]}
            value={amount}
            onChangeText={value => this.onChangeText('amount', value)}
            onBlur={() => this.handleChange(index, 'amount', amount)}
            placeholder={amount ? amount : 'amount'}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={[formStyles.textInput, formStyles.textEdit, { flex: 3 }]}
            value={unit}
            onChangeText={value => this.onChangeText('unit', value)}
            onBlur={() => this.handleChange(index, 'unit', unit)}
            placeholder={unit ? unit : 'unit'}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={[formStyles.textInput, formStyles.textEdit, { flex: 8 }]}
            value={name}
            onChangeText={value => this.onChangeText('name', value)}
            onBlur={() => this.handleChange(index, 'name', name)}
            placeholder={name ? name : 'name'}
            underlineColorAndroid="transparent"
          />
          {/* <TouchableOpacity
            type="submit"
            style={recipeStyles.actionButton}
            onPress={() => this.handleChange(index)}
            title="Save Ingredient"
            accessibilityLabel="Save Ingredient"
          >
            <Ionicons name={Platform.OS === 'ios' ? `ios-checkmark-circle` : 'md-checkmark-circle'} size={25} color={savedIngredient ? Colors.sageGreen : 'lightgrey'} />
          </TouchableOpacity> */}
          <TouchableOpacity
            type="submit"
            style={recipeStyles.actionButton}
            onPress={() => this.handleDelete(index)}
            title="Delete Ingredient"
            accessibilityLabel="Delete Ingredient"
          >
            <Ionicons name={Platform.OS === 'ios' ? `ios-trash` : 'md-trash'} size={25} color={Colors.sageGreen} />
          </TouchableOpacity>
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

export default SingleIngredient;