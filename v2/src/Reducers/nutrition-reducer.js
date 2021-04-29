const initialState = {};

export default function nutritionReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_NUTRITIONAL_INFORMATION': {
			//adds a key/value to the nutritional info object, with the recipe's id as the key, and the nutritional info as the value
			return {
				...state,
				[action.id]: action.nutrition,
			};
		}

		default: {
			return state;
		}
	}
}
