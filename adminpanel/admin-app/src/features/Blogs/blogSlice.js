import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import blogService from "./blogService"



const initialState ={
    blogs:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const getBlogs = createAsyncThunk('blog/get-all',async(thunkApi)=>{
    try {
        return await blogService.getBlogs();
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
});
export const blogSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getBlogs.pending,(state)=>{
            state.isLoading= true;
        }).addCase(getBlogs.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError = false;
            state.isSuccess = true;
            state.blogs = action.payload;
        }).addCase(getBlogs.rejected,(state,action)=>{
            state.isError= true;
            state.isLoading=false;
            state.isSuccess= false;
            state.message = action.error;
        });
    }
});

export default blogSlice.reducer;
