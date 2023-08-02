import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";


//  const userDefaultState ={
    
   
//      email:null,
//     password:null,
//      token :null,
//  }


const initialState ={
    customers: [],
    isError: false,
    isLoading:false,
    isSuccess: false,
    message: "",
}
export const getUsers = createAsyncThunk('customer/get-customers',async(thunkApi)=>{
    try {
        return await customerService.getUsers();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
 })
export const customerSlice = createSlice({
    name: "users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,
        (state)=>{
            state.isLoading = true;
        }).addCase(getUsers.fulfilled,
            (state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.customers = action.payload;
            }).addCase(getUsers.rejected,
                (state,action)=>{
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message= action.error;
                    
                })
    },
})
export default customerSlice.reducer;