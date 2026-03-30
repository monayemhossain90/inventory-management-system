import {Fragment, useEffect, useRef} from 'react';
import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../../helper/ValidationHelper";
import {
    FillCustomerFormRequest,
    UpdateCustomerRequest
} from "../../ApiServices/CustomerApiRequest";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const CustomerUpdate = ({id}) => {
    let customerNameRef,phoneRef,emailRef,addressRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();
    const {CustomerName, Phone, Email, Address} = useSelector((state)=> state.customer.CustomerData) || {};


    useEffect(()=>{
        (async () => {
           await FillCustomerFormRequest(id);
        })();
    },[id])




    const SaveChange = async () => {
        let customerName = customerNameRef.value.trim();
        let phone = phoneRef.value;
        let email = emailRef.value;
        let address = addressRef.value.trim();
        if(IsEmpty(customerName)) {
            ErrorToast("Customer Name is Required");
        }
        else if(IsEmpty(phone)) {
            ErrorToast("Mobile Number is Required");
        }
        else if(IsMobile(phone)) {
            ErrorToast("Invalid Mobile Number");
        }
        else if(IsEmpty(email)) {
            ErrorToast("Email is Required");
        }
        else if(IsEmail(email)) {
            ErrorToast("Invalid Email Address");
        }
        else if(IsEmpty(address)) {
            ErrorToast("Address is Required");
        }
        else{
            let result= await  UpdateCustomerRequest(customerName,phone,email,address,id,ProcessingBtnRef);
            if(result===true){
                navigate('/CustomerListPage');
            }
        }
    }
    
    
    
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Update Customer</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Customer Name</label>
                                        <input key={Date.now()} defaultValue={CustomerName} ref={(input)=>customerNameRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Mobile No</label>
                                        <input key={Date.now()} defaultValue={Phone} ref={(input)=>phoneRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Email </label>
                                        <input key={Date.now()} defaultValue={Email} ref={(input)=>emailRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-12 p-2">
                                        <label className="form-label">Address</label>
                                        <textarea key={Date.now()} defaultValue={Address} ref={(textarea)=>addressRef=textarea} className="form-control form-control-sm" rows={4}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button ref={(button)=>ProcessingBtnRef=button} onClick={SaveChange} className="btn btn-sm my-3 btn-success">Save Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CustomerUpdate;