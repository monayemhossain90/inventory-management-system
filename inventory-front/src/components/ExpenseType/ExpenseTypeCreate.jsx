import {Fragment, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {CreateExpenseTypesRequest} from "../../ApiServices/ExpenseTypeApiRequest";

const ExpenseTypeCreate = () => {
    let expenseTypeNameRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();



    const SaveExpenseType = async () => {
        let expenseType = expenseTypeNameRef.value.trim();
        if(IsEmpty(expenseType)){
            ErrorToast("Expense Type Name is Required");
        }
        else{
            let result = await CreateExpenseTypesRequest(expenseType,ProcessingBtnRef);
            if(result === true){
                navigate('/ExpenseTypeListPage');
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
                                    <h5 >Save Expense Type</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Type Name</label>
                                        <input ref={(input)=>expenseTypeNameRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveExpenseType} ref={(button)=>ProcessingBtnRef=button} className="btn btn-sm my-3 btn-success">Expense Type Create</button>
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

export default ExpenseTypeCreate;