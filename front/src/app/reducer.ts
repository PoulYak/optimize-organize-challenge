import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {BaseCategoryState, CategoryType,} from "./dashboard/categories/CategoryProps";
import {Tag, TagType} from "./utils/TagTypes";
import {Facility} from "./dashboard/FacilityCard";
import defaultTags from "./defaultTags";


export interface RootState {
    categories: BaseCategoryState[],
    tags: Tag[],
    // work_groups: string[],
}

const initialState: RootState = {
    categories: [],
    tags: [],
    // work_groups: [],
}

export const fetchTags = createAsyncThunk(
    "tags/fetchTags",
    async () => {
        const response = await fetch("/api/tags/")
        const body = await response.json()
        const tags: Tag[] = body.tags;
        // const work_groups = (await (await fetch("/api/workgroups/")).json()).work_groups
        // const work_groups = ["23"]
        return tags
    }
)

const slice = createSlice({
    name: 'root',
    initialState,
    reducers: {
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.fulfilled, (state, action) => {
                const tags = action.payload
                state.categories = []
                state.tags = tags
                // state.work_groups = work_groups
                for (const tag of [...defaultTags, ...tags]) {
                    if (tag.type === TagType.Enum) {
                        state.categories.push({
                            id: tag.id,
                            name: tag.name,
                            type: CategoryType.EnumCategory,
                            value: new Map(tag.options?.map((value: any) => {
                                return [value, false]
                            }))
                        })
                    }
                }
            })
    }
});

export const {setCheckedCategory, setNumberCategory} = slice.actions;
export default slice.reducer;