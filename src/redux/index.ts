import { combineReducers } from '@reduxjs/toolkit';
import testSlice from './reducers/testSlice';

const allReducers={testSlice}

export default combineReducers(allReducers);