// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
// import orderService from './orderService'

// const initialState ={
//     orders:[],
//     isSuccess:false,
//     isError:false,
//     isLoading:false,
//     message:"",
// }

// export const getOrders = createAsyncThunk('getAll-orders',async(thunkApi)=>{
//     try {
//         return await orderService.getOrders();
//     } catch (error) {
//         return thunkApi.rejectWithValue(error);
//     }
// });

// export const orderSlice = createSlice({
//     name:"orders",
//     initialState,
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder.addCase(getOrders.pending,(state)=>{
//             state.isLoading =true;
//         }).addCase(getOrders.fulfilled,(state,action)=>{
//             state.isError =false;
//             state.isLoading= false;
//             state.isSuccess = true;
//             state.orders = action.payload;
//         }).addCase(getOrders.rejected,(state,action)=>{
//             state.isError= true;
//             state.isSuccess= false;
//             state.isLoading= false;
//             state.message = action.error;
//         })
//     }
// });

// export default orderSlice.reducer;