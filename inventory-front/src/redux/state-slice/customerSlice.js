import {createSlice} from "@reduxjs/toolkit";

export const customerSlice=createSlice({
    name:'customer',
    initialState:{
        List:[],
        ListTotal:0,
        CustomerData:{}

    },
    reducers:{
        SetCustomerList:(state,action)=>{
            state.List=action.payload
        },
        SetCustomerListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetCustomerName:(state,action)=>{
            state.CustomerName=action.payload
        },
        SetCustomerPhone:(state,action)=>{
            state.Phone=action.payload
        },
        SetCustomerEmail:(state,action)=>{
            state.Email=action.payload
        },
        SetCustomerAddress:(state,action)=>{
            state.Address=action.payload
        },
        SetCustomerData:(state,action)=>{
            state.CustomerData=action.payload
        },


    }
})

export const {SetCustomerList,SetCustomerListTotal, SetCustomerData}=customerSlice.actions;
export const selectCustomerList = (state) => state.customer.List;
export const selectCustomerListTotal = (state) => state.customer.ListTotal;
export const customerSliceReducer = customerSlice.reducer;