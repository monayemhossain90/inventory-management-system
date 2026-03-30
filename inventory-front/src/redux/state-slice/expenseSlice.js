import {createSlice} from "@reduxjs/toolkit";
export const expenseSlice=createSlice({
    name:'expense',
    initialState:{
        List:[],
        ListTotal:0,
        ExpenseTypeDropDown:[],
        ExpenseData:{}
    },
    reducers:{
        SetExpenseList:(state,action)=>{
            state.List=action.payload
        },
        SetExpenseListTotal:(state,action)=>{
            state.ListTotal=action.payload
        },
        SetExpenseTypeDropDown:(state,action)=>{
            state.ExpenseTypeDropDown=action.payload
        },
        SetExpenseData:(state,action)=>{
            state.ExpenseData=action.payload
        }
    }
})

export  const {SetExpenseList,SetExpenseListTotal,SetExpenseTypeDropDown,SetExpenseData}=expenseSlice.actions;
export const selectExpenseList = (state) => state.expense.List;
export const selectExpenseListTotal = (state) => state.expense.ListTotal;
export const selectExpenseTypeDropDown = (state) => state.expense.ExpenseTypeDropDown;
export const expenseSliceReducer = expenseSlice.reducer;