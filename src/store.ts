import {configureStore} from '@reduxjs/toolkit';
import reducers from './redux';

export const store = configureStore({
    devTools: true,
    reducer:reducers
});
