import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// const userDefaultState ={
    
   
//     email:null,
//    password:null,
//     token :null,
// }
const userFromLocalStorage = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;

const initialState ={
    user:userFromLocalStorage,
    isError: false,
    isLoading:false,
    isSuccess: false,
    orders:[],
    message: "",
}
export const login = createAsyncThunk('auth/admin/login',async(user, thunkApi)=>{
    try {
        return await authService.login(user);
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
 })
 
export const getOrders = createAsyncThunk('getAll-orders',async(thunkApi)=>{
    try {
        return await authService.getOrders();
    } catch (error) {
        return thunkApi.rejectWithValue(error);
    }
});
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.pending,
        (state)=>{
            state.isLoading = true;
        }).addCase(login.fulfilled,
            (state,action)=>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            }).addCase(login.rejected,
                (state,action)=>{
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.user = null;
                    state.message=action.error;
                }).addCase(getOrders.pending,(state)=>{
                    state.isLoading=true;
                }).addCase(getOrders.fulfilled,(state,action)=>{
                    state.isLoading=false;
                    state.isError= false;
                    state.isSuccess= true;
                    state.orders=action.payload;

                }).addCase(getOrders.rejected,(state,action)=>{
                    state.isSuccess=false;
                    state.isError=true;
                    state.message = action.error;
                })
    },
})
export default authSlice.reducer;