import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TextInput,
} from 'react-native';

import SingleIngredient from './SingleIngredient';

class AllIngredients extends Component {
  static propTypes = {
    ingredients: PropTypes.array,
    editMode: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  handleIngredientChange = (i, key, value) => {
    console.log('handleIngredientChange: ', (i, key, value));
    this.props.onIngredientsChange(i, key, value);
  }

  renderAllIngredients = () => {
    const { ingredients, editMode } = this.props;

    if (ingredients) {
      return ingredients.map((ingredient, i) => {
        return (
          <SingleIngredient
            key={i}
            index={i}
            name={ingredient.name}
            amount={ingredient.amount}
            unit={ingredient.unit}
            editMode={editMode}
            onIngredientChange={this.handleIngredientChange}
          />
        )
      });
    }
  }

  render() {
    const ingredients = this.renderAllIngredients();
    
    return (
      <View className="all-ingredients">
        {ingredients}
      </View>
    )
  }
}

export default AllIngredients;