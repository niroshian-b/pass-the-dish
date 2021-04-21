import { combineReducers } from 'redux';

import userReducer from './userReducer';
//import dataReducer from './dataReducer';

const reducer = combineReducers({
	user: userReducer,
	//data: dataReducer,
});

export default reducer;
