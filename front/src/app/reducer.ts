import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BaseCategoryState, CategoryType,} from "./dashboard/categories/CategoryProps";
import {Tag, TagType} from "./TagTypes";
import {Facility} from "./dashboard/FacilityCard";


export interface RootState {
    categories: BaseCategoryState[]
}

const initialState: RootState = {
    categories: []
}

const slice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        initTags(state, action: PayloadAction<{
            tags: Tag[]
        }>) {
            const {tags} = action.payload
            state.categories = []
            for (const tag of tags) {
                if (tag.type === TagType.Enum) {
                    state.categories.push({
                        id: tag.id,
                        name: tag.name,
                        type: CategoryType.EnumCategory,
                        value: new Map(tag.options?.map(value => {
                            return [value, false]
                        }))
                    })
                }
            }
        },
        setCheckedCategory(state, action: PayloadAction<{
            category: string,
            value: string,
            isChecked: boolean
        }>) {
            const {category, value, isChecked} = action.payload;
            console.log(state.categories)
            const categoryState = state.categories.find(c => c.name === category);
            console.log(categoryState)
            if (categoryState && categoryState.type === CategoryType.EnumCategory) {
                console.log(123);
                (categoryState.value as Map<string, boolean>).set(value, isChecked);
            }
        },
        setNumberCategory(state, action: PayloadAction<{ category: string, value?: [number, number] }>) {
            const {category, value} = action.payload;
            const categoryState = state.categories.find(c => c.name === category);
            if (categoryState && categoryState.type === CategoryType.NumberCategory) {
                categoryState.value = value;
            }
        }
    },
});

export const {setCheckedCategory, setNumberCategory, initTags} = slice.actions;
export default slice.reducer;