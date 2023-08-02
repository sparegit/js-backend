import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import uploadService from './uploadService'
import { act } from 'react-dom/test-utils';

const initialState ={
    images:[],
    isSuccess:false,
    isError:false,
    isLoading:false,
    message:"",
}

export const uploadImg = createAsyncThunk('upload-images',async(data,thunkApi)=>{
    try {
        const formData = new FormData();
        for(let i=0;i<data.length;i++){
            formData.append("images",data[i]);
        }
        return await uploadService.uploadImg(formData);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
export const delImg = createAsyncThunk('upload-delete-images',async(id,thunkApi)=>{
    try {
      
        return await uploadService.delImg(id);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});

export const uploadSlice = createSlice({
    name:"images",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(uploadImg.pending,(state)=>{
            state.isLoading =true;
        }).addCase(uploadImg.fulfilled,(state,action)=>{
            state.isError =false;
            state.isLoading= false;
            state.isSuccess = true;
            state.images = action.payload;
        }).addCase(uploadImg.rejected,(state,action)=>{
            state.isError= true;
            state.isSuccess= false;
            state.isLoading= false;
            state.message = action.error;
        }).addCase(delImg.pending,(state)=>{
            state.isLoading=true;
        }).addCase(delImg.fulfilled,(state,action)=>{
            state.isError =false;
            state.isLoading= false;
            state.isSuccess = true;
            state.images = [];
        }).addCase(delImg.rejected,(state,action)=>{
            state.isError= true;
            state.isSuccess= false;
            state.isLoading= false;
            state.message = action.error;  
        })
    }
});

export default uploadSlice.reducer;