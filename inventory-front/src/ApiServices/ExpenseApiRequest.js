import store from "../redux/store/store";
import axios from "axios";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {
    SetExpenseData,
    SetExpenseList,
    SetExpenseListTotal,
    SetExpenseTypeDropDown,
} from "../redux/state-slice/expenseSlice";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
const AxiosHeader={headers:{"token":getToken()}}

export async function ExpenseListRequest(pageNo, perPage, searchKeyword) {

    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/ExpensesList/"+pageNo+"/"+perPage+"/"+searchKeyword;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetExpenseList(result.data['data'][0]['Rows']))
                store.dispatch(SetExpenseListTotal(result.data['data'][0]['Total'][0]['count']))
            } else {
                store.dispatch(SetExpenseList([]))
                store.dispatch(SetExpenseListTotal(0))
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}



export async function ExpenseTypeDropDownRequest() {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/ExpenseTypesDropDown";
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'].length > 0) {
                store.dispatch(SetExpenseTypeDropDown(result.data['data']))
            } else {
                store.dispatch(SetExpenseTypeDropDown([]))
                ErrorToast("No Expense Type Found")
            }
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}


//CreateExpense
export async function CreateExpenseRequest(expenseTypeID,expenseAmount,expenseNote,ProcessingBtnRef) {

    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/CreateExpense"
        let PostBody = {TypeID:expenseTypeID,Amount:expenseAmount,Note:expenseNote};
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Customer Create";ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Create Expense";
        if (res.status === 200){
            if(res.data['status'] === "success"){
                SuccessToast("Expense Create Success");
                return true;
            }else{
                ErrorToast("Something Went Wrong")
                return false;
            }
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Customer Create";ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Create Expense";
        ErrorToast("Something Went Wrong")
        return false;
    }
}



export async function FillExpenseFormRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/ExpenseDetailsByID/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            store.dispatch(SetExpenseData(result.data['data']))
            return true;
        } else {
            debugger;
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        debugger;
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}




export async function UpdateExpenseRequest(expenseTypeID,expenseAmount,expenseNote,ObjectID,ProcessingBtnRef) {
    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/UpdateExpense/"+ObjectID;
        let PostBody = {TypeID:expenseTypeID,Amount:expenseAmount,Note:expenseNote};
        const res = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Customer Create";ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Save Change";
        if(res.status === 200){
            if(res.data['status'] === "success"){
                SuccessToast("Expense Update Success");
                return true;
            }else{
                ErrorToast("Something Went Wrong")
                return false;
            }
        }
        else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Customer Create";ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Save Change";
        ErrorToast("Something Went Wrong")
        return false;
    }
}



export async function DeleteExpenseRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteExpense/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Expense Delete Success");
            return true
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false
    }
}












