import { combineReducers } from 'redux';

import recipes from './recipes-reducer';
import nutrition from './nutrition-reducer';

export default combineReducers({ recipes, nutrition });
