import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

import Colors from '../constants/Colors';

const AddIngredient = (props) => {
	return (
		<TouchableOpacity
			onPress={props.handleOnPress}
			title="Add Ingredient"
			style={{ alignSelf: 'flex-start', paddingBottom: 10 }}
		>
			<Text style={{ fontWeight: 'bold', color: Colors.sageGreen }}>{"\uFF0B"} Add Ingredient</Text>
		</TouchableOpacity>
	)
}

AddIngredient.propTypes = {
	handleOnPress: PropTypes.func.isRequired
}

export default AddIngredient;