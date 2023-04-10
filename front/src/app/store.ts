import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'
import tagsReducer from './tagsSlice'
import facilitiesReducer from './facilitiesSlice'
import roleReducer from './roleSlice'

export const store = configureStore({
    reducer: {
        // Add your reducers here
        rootReducer,
        tagsReducer,
        facilitiesReducer,
        roleReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch