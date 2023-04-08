import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer'
import tagsReducer from './tagsSlice'

export const store = configureStore({
    reducer: {
        // Add your reducers here
        rootReducer,
        tagsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch