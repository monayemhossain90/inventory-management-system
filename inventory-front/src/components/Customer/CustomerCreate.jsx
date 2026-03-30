import {ErrorToast, IsEmail, IsEmpty, IsMobile} from "../../helper/ValidationHelper";
import {CreateCustomerRequest} from "../../ApiServices/CustomerApiRequest";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";

const CustomerCreate = () => {
    let customerNameRef,phoneRef,emailRef,addressRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();
    
    
    const SaveCustomer = async () => {
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
            let result= await  CreateCustomerRequest(customerName,phone,email,address,ProcessingBtnRef);
            if(result===true){
               navigate('/CustomerListPage');
            }
        }
    }
    
    
    
    
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Save Customer</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Customer Name</label>
                                        <input ref={(input)=>customerNameRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Mobile No</label>
                                        <input ref={(input)=>phoneRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Email </label>
                                        <input ref={(input)=>emailRef=input} className="form-control form-control-sm" type="email"/>
                                    </div>
                                    <div className="col-12 p-2">
                                        <label className="form-label">Address</label>
                                        <textarea ref={(textarea)=>addressRef=textarea}  className="form-control form-control-sm" rows={4}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveCustomer} ref={(button)=>ProcessingBtnRef=button} className="btn btn-sm my-3 btn-success">Customer Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerCreate;