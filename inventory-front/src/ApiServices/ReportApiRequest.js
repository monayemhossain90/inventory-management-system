import store from "../redux/store/store";
import {BaseURL} from "../helper/config";
import axios from "axios";
import {getToken} from "../helper/SessionHelper";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {ErrorToast} from "../helper/ValidationHelper";
import {
    SetExpensesByDateList,
    SetPurchaseByDateList,
    SetReturnByDateList,
    SetSalesByDateList
} from "../redux/state-slice/reportSlice";
const AxiosHeader={headers:{"token":getToken()}}

export async function ExpensesByDateRequest(fromDate,toDate) {
    try {
        store.dispatch(ShowLoader())
        let PostBody={"FromDate":fromDate+"T00:00:00.000+00:00","ToDate":toDate+"T00:00:00.000+00:00"}
        let URL = BaseURL+"/ExpensesByDate";
        const result = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status']==="success") {
            store.dispatch(SetExpensesByDateList(result.data['data']))

        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function SalesByDateRequest(fromDate,toDate) {
    try {
        store.dispatch(ShowLoader())
        let PostBody={"FromDate":fromDate+"T00:00:00.000+00:00","ToDate":toDate+"T00:00:00.000+00:00"}
        let URL = BaseURL+"/SalesByDate";
        const result = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status']==="success") {
            store.dispatch(SetSalesByDateList(result.data['data']))

        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function PurchaseByDateRequest(fromDate,toDate) {
    try {
        store.dispatch(ShowLoader())
        let PostBody={"FromDate":fromDate+"T00:00:00.000+00:00","ToDate":toDate+"T00:00:00.000+00:00"}
        let URL = BaseURL+"/PurchaseByDate";
        const result = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status']==="success") {
            store.dispatch(SetPurchaseByDateList(result.data['data']))
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}

export async function ReturnByDateRequest(fromDate,toDate) {
    try {
        store.dispatch(ShowLoader())
        let PostBody={"FromDate":fromDate+"T00:00:00.000+00:00","ToDate":toDate+"T00:00:00.000+00:00"}
        let URL = BaseURL+"/ReturnByDate";
        const result = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader());
        if (result.status === 200 && result.data['status']==="success") {
            store.dispatch(SetReturnByDateList(result.data['data']))
        } else {
            ErrorToast("Something Went Wrong")
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    }
}
