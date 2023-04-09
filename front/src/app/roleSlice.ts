import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface RoleState {
    isLogged?: boolean;
}

const initialState: RoleState = {
    isLogged: undefined
}

export const fetchLogin = createAsyncThunk(
    "role/fetchLogin",
    async () => {
        const response = await fetch("/api/role/")
        console.log(response)
        return response.status === 200
    }
)

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.isLogged = action.payload
            })
    }
})

export default roleSlice.reducer