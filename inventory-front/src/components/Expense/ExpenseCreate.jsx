import {Fragment, useEffect, useRef} from 'react';
import {CreateExpenseRequest, ExpenseTypeDropDownRequest} from "../../ApiServices/ExpenseApiRequest";
import {useSelector} from "react-redux";
import {selectExpenseTypeDropDown} from "../../redux/state-slice/expenseSlice";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom";

const ExpenseCreate = () => {
    let expenseTypeIDRef,expenseAmountRef,expenseNoteRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();
    let ExpenseTypeDropDown = useSelector(selectExpenseTypeDropDown);

    useEffect(()=>{
        (async () => {
           await ExpenseTypeDropDownRequest();
        })();
    },[])




    
    const SaveExpense = async () => {
        let expenseTypeID = expenseTypeIDRef.value;
        let expenseAmount = expenseAmountRef.value.trim();
        let expenseNote = expenseNoteRef.value.trim();

            if(IsEmpty(expenseTypeID)){
                ErrorToast("Expense Type Required !")
            }
            else if(IsEmpty(expenseAmount)){
                ErrorToast("Expense Amount Required !")
            }
            else if(expenseAmount < 1){
                ErrorToast("Expense Amount Required !")
            }
            else if(IsEmpty(expenseNote)){
                ErrorToast("Expense Note Required !")
            }
            else {
               let result = await CreateExpenseRequest(expenseTypeID,expenseAmount,expenseNote,ProcessingBtnRef);
               if(result===true){
                  navigate("/ExpenseListPage");
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
                                    <h5>Create New Expense</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Type</label>
                                        <select ref={(select)=>expenseTypeIDRef=select} className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                ExpenseTypeDropDown.map((item,i)=>{
                                                    return( <option key={i.toLocaleString()} value={item._id}>{item.TypeName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Amount</label>
                                        <input ref={(input)=>expenseAmountRef=input} className="form-control form-control-sm" type="number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Note</label>
                                        <input ref={(input)=>expenseNoteRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveExpense}  ref={(button)=>ProcessingBtnRef=button}  className="btn btn-sm my-3 btn-success">Create Expense</button>
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

export default ExpenseCreate;