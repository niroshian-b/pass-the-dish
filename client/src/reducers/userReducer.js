const initialState = {
	currentUser: null,
	currentUserData: {},
	loading: true,
	message: null,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_USER_PROFILE': {
			return {
				...state,
				message: 'getting user id',
			};
		}

		case 'RECEIVED_USER_PROFILE': {
			return {
				currentUserID: action.uid,
				currentUserData: action.userData,
				loading: false,
				message: 'received user profile successfully',
				...state,
			};
		}
		case 'RECEIVING_USER_PROFILE_ERROR': {
			return {
				...state,
				loading: true,
				message: 'error receciving user profile',
			};
		}
		default: {
			return state;
		}
	}
}
