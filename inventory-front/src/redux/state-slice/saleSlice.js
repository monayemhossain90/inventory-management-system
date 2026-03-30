import {createSlice} from "@reduxjs/toolkit";
export const saleSlice=createSlice({
    name:'sale',
    initialState:{
        List:[],
        ListTotal:0,
        CustomerDropDown:[],
        ProductDropDown:[],
        CustomerID:"",
        VatTax:"",
        Discount:"",
        OtherCost:"",
        ShippingCost:"",
        GrandTotal:"",
        Note:"",
        SaleItemList:[],
    },
    reducers:{
        SetSaleList:(state,action)=>{
            state.List=action.payload
        },
        SetSaleListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetCustomerDropDown:(state,action)=>{
            state.CustomerDropDown=action.payload
        },
        SetProductDropDown:(state,action)=>{
            state.ProductDropDown=action.payload
        },
        SetSaleItemList:(state,action)=>{
            state.SaleItemList.push(action.payload)
        },
        RemoveSaleItem:(state,action)=>{
            state.SaleItemList.splice(action.payload,1)
        },
        ClearSaleItemList:(state,action)=>{
            state.SaleItemList=action.payload
        },
    }
})

export  const {SetSaleList,SetSaleListTotal,SetCustomerDropDown,SetProductDropDown,SetSaleItemList,RemoveSaleItem,ClearSaleItemList}=saleSlice.actions;
export const selectSaleList = (state) => state.sale.List;
export const selectSaleListTotal = (state) => state.sale.ListTotal;
export const selectCustomerDropDown = (state) => state.sale.CustomerDropDown;
export const selectProductDropDown = (state) => state.sale.ProductDropDown;
export const selectSaleItemList = (state) => state.sale.SaleItemList;
export const saleSliceReducer = saleSlice.reducer;