import { combineReducers } from 'redux';
import orders from './orders';
import app from './app';
import form from './form';


const rootReducer = combineReducers({orders, app, form});

export default rootReducer;