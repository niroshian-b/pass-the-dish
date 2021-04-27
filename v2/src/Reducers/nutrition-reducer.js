const initialState = {
	nutritionalInfo: {},
	status: 'loading',
	error: null,
};

export default recipesReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REQUEST_NUTRITIONAL_INFORMATION': {
			//change status to loading
			return {
				...state,
				status: 'loading',
			};
		}

		case 'RECEIVE_NUTRITIONAL_INFORMATION': {
			//adds a key/value to the nutritional info object, with the recipe's id as the key, and the nutritional info as the value
			return {
				...state,
				nutritionalInfo: {
					[action.id]: { ...action.nutrition },
				},
				status: 'idle',
			};
		}

		case 'ERROR_RECEIVE_NUTRITIONAL_INFORMATION': {
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
