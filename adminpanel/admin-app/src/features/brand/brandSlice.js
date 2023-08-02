import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import brandService from "./brandService";

const initialState ={
    brands:[],
    isError: false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const getBrands = createAsyncThunk("get/allbrands",async(thunkApi)=>{
    try {
        return await brandService.getBrands();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const brandSlice = createSlice({
    name:"brands",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBrands.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBrands.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess= true;
            state.brands = action.payload;
        }).addCase(getBrands.rejected,(state,action)=>{
            state.isError=true;
            state.isSuccess=false;
            state.message = action.error;
        })
    }
})
export default brandSlice.reducer;