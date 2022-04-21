import { combineReducers } from 'redux';
import filter from './filter-reducer';

export default combineReducers({
    filter: filter,
});
