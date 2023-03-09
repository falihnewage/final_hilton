import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from '../../Axios'
import axios from '../../Axios'
import Cookies from 'js-cookie'






export const Login = createAsyncThunk(
    'auth/login',
   
)


const initialState = {
    user: {},
    isauth: false,
    rejected: false,
    error: '',
    LoginError: '',
    sessionId: '',
    loading: false
}

const Authslice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    // extraReducers: {
        
    //     [Login.pending]: (state) => {
    //         state.loading = true
    //         state.LoginError = ''

    //     },
    //     [Login.fulfilled]: (state, { payload }) => {
    //         // console.log('payload', payload.data);
    //         state.loading = false
    //         state.isauth = true
    //         // Cookies.set('token',payload.data.token)
            

    //     },
    //     [Login.rejected]: (state, { payload }) => {
    //         state.loading = false
    //         state.rejected = true
    //         // console.log(payload, 'after rejected');
    //         state.LoginError = payload
    //     },
        
    // }
});

// export const {} = Authslice.actions

export default Authslice.reducer