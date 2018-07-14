import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TextInput,
} from 'react-native';

import formStyles from '../styles/FormStyles';

class SingleIngredient extends Component {
  static propTypes = {
    index: PropTypes.number,
    name: PropTypes.string,
    amount: PropTypes.string,
    unit: PropTypes.string,
    editMode: PropTypes.bool
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      amount: '',
      unit: ''
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

  handleChange = (i, key, value) => {
    console.log('handleChange: ', (i, key, value));
    this.props.onIngredientChange(i, key, value);
  }

  renderSingleIngredient = () => {
    const { index, name, amount, unit, editMode } = this.props;

    if (editMode) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[formStyles.textInput, formStyles.textEdit]}
            value={this.state.amount}
            onChangeText={value => this.onChangeText('amount', value)}
            onBlur={this.handleChange(index, 'amount', this.state.amount)}
            placeholder={amount ? amount : 'amount'}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={[formStyles.textInput, formStyles.textEdit]}
            value={this.state.unit}
            onChangeText={value => this.onChangeText('amount', value)}
            onBlur={this.handleChange(index, 'unit', this.state.unit)}
            placeholder={unit ? unit : 'unit'}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={[formStyles.textInput, formStyles.textEdit]}
            value={this.state.name}
            onChangeText={value => this.onChangeText('amount', value)}
            onBlur={this.handleChange(index, 'name', this.state.name)}
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

export default SingleIngredient;