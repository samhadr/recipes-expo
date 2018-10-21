import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import SingleIngredient from './SingleIngredient';

class AllIngredients extends Component {
  static propTypes = {
    ingredients: PropTypes.array,
    editMode: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  handleIngredientChange = (i, name, amount, unit) => {
    console.log('handleIngredientChange: ', (i, name, amount, unit));
    this.props.onIngredientsChange(i, name, amount, unit);
  }

  handleIngredientDelete = (i) => {
    console.log('handleIngredientDelete: ', (i));
    this.props.onIngredientDelete(i);
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
            onIngredientDelete={this.handleIngredientDelete}
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