import {Tag} from "./TagTypes";
import defaultTags from "./defaultTags";
import {initTags} from "./reducer";
import {Facility} from "./dashboard/FacilityCard";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface FacilitiesState {
    facilities: Facility[];
}

const initialState: FacilitiesState = {
    facilities: []
}

export const fetchFacilities = createAsyncThunk(
    'facilities/fetchFacilities',
    async () => {
        const response = await fetch("/api/facilities/");
        const body = await response.json();
        return body.facilities;
    }
);
export const facilitiesSlice = createSlice({
    name: 'facilities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFacilities.fulfilled, (state, action) => {
                state.facilities = action.payload;
            })
    },
})

// export const { fetchFacilities } = facilitiesSlice.actions
export default facilitiesSlice.reducer