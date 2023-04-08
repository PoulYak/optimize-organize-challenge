import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tag, TagValue } from './TagTypes';

interface Fields {
    files: File[];
}

export interface TagsState {
    tags: Tag[];
    state: Map<number, TagValue>;
    fields: Fields;
}

const initialState: TagsState = {
    tags: [],
    state: new Map(),
    fields: {
        files: []
    }
};

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<Tag[]>) => {
            state.tags = action.payload;
        },
        setTagValue: (state, action: PayloadAction<{ id: number; value: TagValue }>) => {
            const { id, value } = action.payload;
            state.state.set(id, value);
            if (value === 'd') state.state.set(id, 'a');
        },
        setFields: (state, action: PayloadAction<Fields>) => {
            state.fields = action.payload;
        }
    }
});

export const { setTags, setTagValue, setFields } = tagsSlice.actions;

export default tagsSlice.reducer;
