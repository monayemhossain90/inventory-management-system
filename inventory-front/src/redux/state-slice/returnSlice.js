import {createSlice} from "@reduxjs/toolkit";
export const returnSlice=createSlice({
    name:'return',
    initialState:{
        List:[],
        ListTotal:0,
        CustomerDropDown:[],
        ProductDropDown:[],
        ReturnItemList:[],
    },
    reducers:{
        SetReturnList:(state,action)=>{
            state.List=action.payload
        },
        SetReturnListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetCustomerDropDown:(state,action)=>{
            state.CustomerDropDown=action.payload
        },
        SetProductDropDown:(state,action)=>{
            state.ProductDropDown=action.payload
        },
        SetReturnItemList:(state,action)=>{
            state.ReturnItemList.push(action.payload)
        },
        RemoveReturnItem:(state,action)=>{
            state.ReturnItemList.splice(action.payload,1)
        },
        ClearReturnItemList:(state,action)=>{
            state.ReturnItemList=action.payload
        },
    }
})

export  const {SetReturnList,SetReturnListTotal,SetCustomerDropDown,SetProductDropDown,SetReturnItemList,RemoveReturnItem,ClearReturnItemList}=returnSlice.actions;
export const selectReturnList = (state) => state.return.List;
export const selectReturnListTotal = (state) => state.return.ListTotal;
export const selectCustomerDropDown = (state) => state.return.CustomerDropDown;
export const selectProductDropDown = (state) => state.return.ProductDropDown;
export const selectReturnItemList = (state) => state.return.ReturnItemList;
export const returnSliceReducer = returnSlice.reducer;