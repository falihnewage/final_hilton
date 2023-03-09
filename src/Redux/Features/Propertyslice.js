// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from '../../Axios'
// import Cookies from 'js-cookie';

// export const GetAllProperties = createAsyncThunk('getallproperties', async (obj, { rejectWithValue }) => {
//     // console.log(obj, 'product to api');
//     try {
//         const res = await axios.get(`/property`, {
//             headers: { Authorization: `Bearer ${Cookies.get('token')}` }
//         })
//         return res.data.data
//         // console.log(res.status,'return single item');
//     } catch (error) {
//         return rejectWithValue(error.response.data)
//     }
// })




// const initialState = {
//     loading: false,
//    properties:[]
// }

// const Shopslice = createSlice({
//     name: "second",
//     initialState,
//     reducers: {},
//     extraReducers: {
//         [GetAllProperties.pending]: (state, action) => {
//             state.loading = true
//         },
//         [GetAllProperties.fulfilled]: (state, action) => {
//             state.loading = false
//             state.properties = action.payload
//         },
//         [GetAllProperties.rejected]: (state, action) => {
//             state.loading = false
//             state.error = action.payload
//         },
        
//     }
// });



// export default Shopslice.reducer