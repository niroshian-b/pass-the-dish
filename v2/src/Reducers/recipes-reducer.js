const initialState = {
	currentRecipes: null,
	status: 'loading',
	error: null,
};

export default recipesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REQUEST_RECIPE_DETAILS': {
			return {
				...state,
				status: 'loading',
			};
		}

		case 'RECIEVE_RECIPE_DETAILS': {
			return {
				...state,
				currentRecipes: action.recipes,
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
};
