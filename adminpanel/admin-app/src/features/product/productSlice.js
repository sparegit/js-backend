import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";

import productService from "./productService";



const initialState ={
    products: [],
    isError: false,
    isLoading:false,
    isSuccess: false,
    message: "",
}
export const getproducts = createAsyncThunk('product/get-products',async(thunkApi)=>{
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
 });
 export const createProducts = createAsyncThunk('Add/product',async(thunkApi,productData)=>{
    try {
        return await productService.createProduct(productData);
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
 })

 export const resetState = createAction("Reset_all");

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getproducts.pending,
        (state)=>{
            state.isLoading = true;
        }).addCase(getproducts.fulfilled,
            (state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.products = action.payload;
            }).addCase(getproducts.rejected,
                (state,action)=>{
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message= action.error;
                    
                }).addCase(createProducts.pending,(state)=>{
                    state.isLoading=true;
                }).addCase(createProducts.fulfilled,(state,action)=>{
                    state.isError=false;
                    state.isLoading=false;
                    state.isSuccess = true;
                    state.createdProduct = action.payload;
                }).addCase(createProducts.rejected,(state,action)=>{
                    state.isError=true;
                    state.isLoading=false;
                    state.isSuccess = false;
                    state.message = action.error;}).addCase(resetState,()=> initialState);
    },
})
export default productSlice.reducer;