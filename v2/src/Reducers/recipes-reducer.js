const initialState = [];

export default function recipesReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_ALL_RECIPE_DETAILS': {
			return [...action.recipes];
		}

		case 'SET_NEW_RECIPE_DETAILS': {
			return [...state, { [action.id]: action.recipe }];
		}

		default: {
			return state;
		}
	}
}
