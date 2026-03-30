import {Fragment, useEffect, useRef} from 'react';
import {
    ExpenseTypeDropDownRequest,
    FillExpenseFormRequest, UpdateExpenseRequest
} from "../../ApiServices/ExpenseApiRequest";
import {useSelector} from "react-redux";
import {
    selectExpenseTypeDropDown,
} from "../../redux/state-slice/expenseSlice";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {useNavigate} from "react-router-dom";

const ExpenseUpdate = ({id}) => {
    let expenseTypeIDRef,expenseAmountRef,expenseNoteRef,ProcessingBtnRef = useRef();
    let navigate = useNavigate();
    const {TypeID, Amount, Note} = useSelector((state)=>state.expense.ExpenseData)

    useEffect(()=>{
        (async () => {
         await FillExpenseFormRequest(id);
         await ExpenseTypeDropDownRequest();
        })();

    },[id])


    let ExpenseTypeDropDown = useSelector(selectExpenseTypeDropDown);






    const SaveChange = async () => {
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
            let result = await UpdateExpenseRequest(expenseTypeID,expenseAmount,expenseNote,id,ProcessingBtnRef);
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
                                    <h5>Update Expense</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Type</label>
                                        <select key={Date.now()} defaultValue={TypeID} ref={(select)=>expenseTypeIDRef=select} className="form-select form-select-sm">
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
                                        <input key={Date.now()} defaultValue={Amount} ref={(input)=>expenseAmountRef=input} className="form-control form-control-sm" type="number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Note</label>
                                        <input key={Date.now()} defaultValue={Note} ref={(input)=>expenseNoteRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={SaveChange}  ref={(button)=>ProcessingBtnRef=button} className="btn btn-sm my-3 btn-success">Save Change</button>
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

export default ExpenseUpdate;