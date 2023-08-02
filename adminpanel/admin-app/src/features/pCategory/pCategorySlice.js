import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import pCategoryService from "./pCategoryService"

const initialState ={
    productCategory:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""

}

export const getPCategory = createAsyncThunk("category-getProductCategory",async(thunkApi)=>{
    try {
        return await pCategoryService.getPCategory();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const pCategorySlice = createSlice({
    name:'productCategory',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getPCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getPCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.productCategory= action.payload;

        }).addCase(getPCategory.rejected,(state,action)=>{
            state.isError=true;
            state.isSuccess=false;
            state.message= action.error;
            state.isLoading= false;
        });
    }
})

export default pCategorySlice.reducer;