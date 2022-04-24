import { combineReducers } from 'redux';
import filter from './filter-reducer';
import pokemon from './pokemon-reducer';

export default combineReducers({
    filter,
    pokemon,
});
