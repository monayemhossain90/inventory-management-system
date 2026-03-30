import {createSlice} from "@reduxjs/toolkit";
export const expensetypeSlice=createSlice({
    name:'expensetype',
    initialState:{
        List:[],
        ListTotal:0,
        TypeName:""
    },
    reducers:{
        SetExpenseTypeList:(state,action)=>{
            state.List=action.payload
        },
        SetExpenseTypeListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetExpenseTypeName:(state,action)=>{
            state.TypeName=action.payload
        }
    }
})

export  const {SetExpenseTypeList,SetExpenseTypeListTotal,SetExpenseTypeName}=expensetypeSlice.actions;
export const selectExpenseTypeList = (state) => state.expensetype.List;
export const selectExpenseTypeListTotal = (state) => state.expensetype.ListTotal;

export const selectExpenseTypeName = (state) => state.expensetype.TypeName;
export const expensetypeSliceReducer = expensetypeSlice.reducer;