import React, {Fragment, useEffect, useRef} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {
    FillExpenseTypeFormRequest,
    UpdateExpenseTypesRequest
} from "../../ApiServices/ExpenseTypeApiRequest";
import {useSelector} from "react-redux";
import {selectExpenseTypeName} from "../../redux/state-slice/expensetypeSlice";

const ExpenseTypeUpdate = ({id}) => {

    let expenseTypeNameRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();

    useEffect( ()=>{

        (async () => {
         await FillExpenseTypeFormRequest(id);
        })();
    },[id]);



    let ExpenseTypeName = useSelector(selectExpenseTypeName);


    const SaveChange = async () => {

        let expenseType = expenseTypeNameRef.value.trim();
        if(IsEmpty(expenseType)){
            ErrorToast("Expense Type Name is Required");
        }
        else{
            let result = await UpdateExpenseTypesRequest(expenseType,id,ProcessingBtnRef);
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
                                    <h5 >Update Expense Type</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Type Name</label>
                                        <input key={Date.now()} defaultValue={ExpenseTypeName} ref={(input)=>expenseTypeNameRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange} ref={(button)=>ProcessingBtnRef=button} className="btn btn-sm my-3 btn-success">Save Change</button>
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

export default ExpenseTypeUpdate;