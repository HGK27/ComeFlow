import { configureStore, createSlice } from '@reduxjs/toolkit'

// Create a slice for auth
export const authStore = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        login: (state) => {
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.isAuthenticated = false
        },
    },
})

// Export actions for use in components
export const { login, logout } = authStore.actions
export default authStore.reducer;
