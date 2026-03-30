import {Fragment, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../../helper/ValidationHelper";
import {CreateSupplierRequest} from "../../ApiServices/SupplierApiRequest";

const SupplierCreate = () => {
    let supplierNameRef,phoneRef,emailRef,addressRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();


    const SaveSupplier = async () => {
        let supplierName = supplierNameRef.value.trim();
        let phone = phoneRef.value;
        let email = emailRef.value;
        let address = addressRef.value.trim();
        if(IsEmpty(supplierName)) {
            ErrorToast("Supplier Name is Required");
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
            let result= await  CreateSupplierRequest(supplierName,phone,email,address,ProcessingBtnRef);
            if(result===true){
               navigate('/SupplierListPage');
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
                                    <h5 >Save Supplier</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Supplier Name</label>
                                        <input ref={(input)=>supplierNameRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Mobile No</label>
                                        <input ref={(input)=>phoneRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Email </label>
                                        <input ref={(input)=>emailRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-12 p-2">
                                        <label className="form-label">Address</label>
                                        <textarea ref={(textarea)=>addressRef=textarea} className="form-control form-control-sm" rows={4}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button ref={(button)=>ProcessingBtnRef=button} onClick={SaveSupplier} className="btn btn-sm my-3 btn-success">Supplier Create</button>
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

export default SupplierCreate;