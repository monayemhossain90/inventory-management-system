import store from "../redux/store/store";
import axios from "axios";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";
import {SetCustomerData, SetCustomerList, SetCustomerListTotal} from "../redux/state-slice/customerSlice.js";
const AxiosHeader={headers:{"token":getToken()}}

export async function CustomerListRequest(pageNo, perPage, searchKeyword) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CustomersList/"+pageNo+"/"+perPage+"/"+searchKeyword;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetCustomerList(result.data['data'][0]['Rows']))
                store.dispatch(SetCustomerListTotal(result.data['data'][0]['Total'][0]['count']))
            } else {
                store.dispatch(SetCustomerList([]))
                store.dispatch(SetCustomerListTotal(0))
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


export async function CreateCustomerRequest(customerName,phone,email,address,ProcessingBtnRef){

    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/CreateCustomer";
        let PostBody = {CustomerName:customerName, Phone:phone, Email:email, Address:address};
        const res = await axios.post(URL,PostBody,AxiosHeader)
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Customer Create";

        if(res.status === 200){
            if(res.data['status'] === "fail"){
                if(res.data['data']['keyPattern']['Email'] === 1){
                    ErrorToast("Email Already Exist");
                    return false;
                }
                else if(res.data['data']['keyPattern']['Phone'] === 1){
                    ErrorToast("Mobile Number Already Exist");
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{
                SuccessToast("Customer Create Success");
                return true;
            }
       }else{
            ErrorToast("Something Went Wrong")
            return false;
       }
    }
    catch (e) {
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Customer Create";
        ErrorToast("Something Went Wrong")
        return false
    }
}



export async function FillCustomerFormRequest(ObjectID){
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/CustomerDetailsByID/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            store.dispatch(SetCustomerData(result.data['data']))
            return true;
        } else {
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



export async function UpdateCustomerRequest(customerName,phone,email,address,ObjectID,ProcessingBtnRef) {
    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/UpdateCustomer/"+ObjectID;
        let PostBody = {CustomerName:customerName,Phone:phone,Email:email,Address:address};
        const res = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Save Change";
        if(res.status === 200){
            if(res.data['status'] === "fail"){
                if(res.data['data']['keyPattern']['Email'] === 1){
                    ErrorToast("Email Already Exist");
                    return false;
                }
                else if(res.data['data']['keyPattern']['Phone'] === 1){
                    ErrorToast("Mobile Number Already Exist");
                    return false;
                }
                else{
                    ErrorToast("Something Went Wrong");
                    return false;
                }
            }
            else{
                SuccessToast("Customer Update Success");
                return true;
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
        ProcessingBtnRef.innerHTML="Save Change";
        ErrorToast("Something Went Wrong")
        return false;
    }
}




export async function DeleteCustomerRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteCustomer/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast("Fallied! Customer is " +result.data['data'])
            return false;
        }
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Customer Delete Success");
            return  true
        }
        else {
            ErrorToast("Request Fail ! Try Again")
            return false;
        }
    }
    catch (e) {
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return  false
    }
}




