import store from "../redux/store/store";
import axios from "axios";
import {getToken} from "../helper/SessionHelper";
import {BaseURL} from "../helper/config";
import {HideLoader, ShowLoader} from "../redux/state-slice/settingsSlice";
import {
    SetSupplierData,
    SetSupplierList,
    SetSupplierListTotal,
} from "../redux/state-slice/supplierSlice";
import {ErrorToast, SuccessToast} from "../helper/ValidationHelper";

const AxiosHeader={headers:{"token":getToken()}}

export async function SupplierListRequest(pageNo, perPage, searchKeyword) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/SuppliersList/"+pageNo+"/"+perPage+"/"+searchKeyword;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "success") {
            if (result.data['data'][0]['Rows'].length > 0) {
                store.dispatch(SetSupplierList(result.data['data'][0]['Rows']))
                store.dispatch(SetSupplierListTotal(result.data['data'][0]['Total'][0]['count']))
            } else {
                store.dispatch(SetSupplierList([]))
                store.dispatch(SetSupplierListTotal(0))
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


export async function CreateSupplierRequest(supplierName,phone,email,address,ProcessingBtnRef){

    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/CreateSupplier";
        let PostBody = {SupplierName:supplierName, Phone:phone, Email:email , Address:address};
        const res = await axios.post(URL,PostBody,AxiosHeader);
        store.dispatch(HideLoader())
        ProcessingBtnRef.classList.remove('btnCapitalize');
        ProcessingBtnRef.innerHTML="Supplier Create";

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
                SuccessToast("Supplier Create Success");
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
        ProcessingBtnRef.innerHTML="Supplier Create";
        ErrorToast("Something Went Wrong")
        return false
    }
}


export async function FillSupplierFormRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/SupplierDetailsByID/"+ObjectID;
        const res = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (res.status === 200 && res.data['status'] === "success") {
            store.dispatch(SetSupplierData(res.data['data']))
            let SupplierData=res.data['data'];
            store.dispatch(SetSupplierName(SupplierData['SupplierName']));
            store.dispatch(SetSupplierPhone(SupplierData['Phone']));
            store.dispatch(SetSupplierEmail(SupplierData['Email']));
            store.dispatch(SetSupplierAddress(SupplierData['Address']));
            return  true;
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
        return false
    }
}


export async function UpdateSupplierRequest(supplierName,phone,email,address,ObjectID, ProcessingBtnRef) {

    try {
        store.dispatch(ShowLoader())
        ProcessingBtnRef.classList.add('btnCapitalize');
        ProcessingBtnRef.innerHTML= "<span class=\"spinner-border spinner-border-sm me-1\" role=\"status\" aria-hidden=\"true\"></span>\n" +
            "  Processing...";
        let URL = BaseURL+"/UpdateSupplier/"+ObjectID;
        let PostBody = {SupplierName:supplierName, Phone:phone, Email:email , Address:address};
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
                SuccessToast("Supplier Update Success");
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
        return  false
    }
}





export async function DeleteSupplierRequest(ObjectID) {
    try {
        store.dispatch(ShowLoader())
        let URL = BaseURL+"/DeleteSupplier/"+ObjectID;
        const result = await axios.get(URL,AxiosHeader)
        store.dispatch(HideLoader())
        if (result.status === 200 && result.data['status'] === "associate") {
            ErrorToast("Failled! Supplier is "+result.data['data'])
            return false;
        }
        if (result.status === 200 && result.data['status'] === "success") {
            SuccessToast("Supplier Delete Success");
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





