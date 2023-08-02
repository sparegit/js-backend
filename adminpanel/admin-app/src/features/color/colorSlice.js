import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import colorService from "./colorService";

const initialState ={
    colors:[],
    isError: false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const getColors = createAsyncThunk("get/allcolors",async(thunkApi)=>{
    try {
        return await colorService.getColors();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
})

export const colorSlice = createSlice({
    name:"colors",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getColors.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getColors.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess= true;
            state.colors = action.payload;
        }).addCase(getColors.rejected,(state,action)=>{
            state.isError=true;
            state.isSuccess=false;
            state.message = action.error;
        })
    }
})
export default colorSlice.reducer;
