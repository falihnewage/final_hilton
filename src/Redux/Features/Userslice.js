import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// import axios from '../../Axios'
import Cookies from 'js-cookie';
export const GetAllUser = createAsyncThunk('user/GetAllUser', async (obj, { rejectWithValue }) => {
    // console.log(obj, 'email to api');
    try {
        const res = await axios.get('/hilton_user?offset=0&limit=10', {
            email: obj
        },
            
            )
        return res
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})








const initialState = {
    loading: false,
    ShippingLoading: false,
    error: '',
    allUsers:[]
}

const Userslice = createSlice({
    name: "second",
    initialState,
    reducers: {},
    // extraReducers: {
    //     [GetAllUser.pending]: (state, { payload }) => {
    //         state.loading = true
    //     },
    //     [GetAllUser.fulfilled]: (state, { payload }) => {
            
    //         state.allUsers=payload
    //     },
    //     [GetAllUser.rejected]: (state, { payload }) => {
    //         state.error = payload
    //     },
        
    // }
});

// export const {} = Userslice.actions

export default Userslice.reducer