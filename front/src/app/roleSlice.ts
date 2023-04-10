import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export interface RoleState {
    isLogged?: boolean;
    isAdmin: boolean;
}

const initialState: RoleState = {
    isLogged: undefined,
    isAdmin: false
}

export const fetchLogin = createAsyncThunk(
    "role/fetchLogin",
    async () => {
        const response = await fetch("/api/role/")
        let isAdmin = false
        if (response.status === 200) {
            const body = await response.json()
            isAdmin = body.role === "a"
        }
        return {isLogged: response.status === 200, isAdmin}
    }
)

export const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.fulfilled, (state, action) => {
                const {isLogged, isAdmin} = action.payload
                state.isLogged = isLogged
                state.isAdmin = isAdmin
            })
    }
})

export default roleSlice.reducer