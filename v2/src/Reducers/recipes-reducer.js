const initialState = {
	currentRecipe: null,
};

export default function recipesReducer(state = initialState, action) {
	switch (action.type) {
		case 'RECIEVE_RECIPE_DETAILS': {
			return {
				...state,
				currentRecipe: action.recipe,
				[action.id]: action.recipe,
				status: 'idle',
			};
		}

		case 'ERROR_RECIEVE_RECIPE_DETAILS': {
			return {
				...state,
				status: 'error',
			};
		}

		default: {
			return state;
		}
	}
}
