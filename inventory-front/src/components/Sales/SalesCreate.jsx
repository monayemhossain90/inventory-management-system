import {Fragment, useEffect, useRef} from 'react';
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {BsCartCheck,BsTrash} from "react-icons/bs";
import {useSelector} from "react-redux";
import {
    ClearSaleItemList,
    RemoveSaleItem,
    selectCustomerDropDown, selectProductDropDown,
    selectSaleItemList, SetSaleItemList,
} from "../../redux/state-slice/saleSlice";
import {CreateSaleRequest, CustomerDropDownRequest, ProductDropDownRequest} from "../../ApiServices/SaleApiRequest";
import store from "../../redux/store/store";
import {useNavigate} from "react-router-dom";


const SalesCreate = () => {
    let productRef,qtyRef,unitPriceRef,customerIDRef,vatTaxRef,discountRef,otherCostRef,shippingCostRef,grandTotalRef,noteRef,ProcessingBtnRef =useRef();
    let navigate = useNavigate();

    useEffect(()=>{
        (async () => {
           await ProductDropDownRequest();
           await CustomerDropDownRequest()
        })();
    },[])


    let CustomerDropDown = useSelector(selectCustomerDropDown);
    let ProductDropDown = useSelector(selectProductDropDown);
    let SaleItemList = useSelector(selectSaleItemList);




    const OnAddCart = () => {
        let productValue=productRef.value;
        let productName=productRef.selectedOptions[0].text;
        let qtyValue=qtyRef.value;
        let unitPriceValue=unitPriceRef.value;


        if(IsEmpty(productValue)){
            ErrorToast("Select Product")
        }
        else if(IsEmpty(qtyValue)){
            ErrorToast("Quantity Required")
        }
        else if(IsEmpty(unitPriceValue)){
            ErrorToast("Unit Price Required")
        }
        else {
            let item= {
                "ProductID":productValue,
                "ProductName":productName,
                "Qty":qtyValue,
                "UnitCost":unitPriceValue,
                "Total":(parseInt(qtyValue))*(parseInt(unitPriceValue))
            }
            store.dispatch(SetSaleItemList(item))
            productRef.value='';
            qtyRef.value='';
            unitPriceRef.value='';
        }
    }


    const removeCart = (i) => {
        store.dispatch(RemoveSaleItem(i))
    }


    const CreateNewSale=async () => {
        let customerID = customerIDRef.value;
        let vatTax = vatTaxRef.value;
        let discount = discountRef.value;
        let otherCost = otherCostRef.value;
        let shippingCost = shippingCostRef.value;
        let grandTotal = grandTotalRef.value;
        let note = noteRef.value;

        if(SaleItemList.length===0){
            ErrorToast("Please, Add to Cart");
        }
        else if(IsEmpty(customerID)){
            ErrorToast("Select Customer");
        }
        else if(IsEmpty(vatTax)){
            ErrorToast("Vat/Tax is Required");
        }
        else if(IsEmpty(discount)){
            ErrorToast("Discount is Required");
        }
        else if(IsEmpty(otherCost)){
            ErrorToast("Other Cost Required");
        }
        else if(IsEmpty(shippingCost)){
            ErrorToast("Shipping Cost Required");
        }
        else if(IsEmpty(grandTotal)){
            ErrorToast("Grand Total Required");
        }
        else if(IsEmpty(note)){
            ErrorToast("Note is Required");
        }else{
          let Parent ={
              CustomerID: customerID,
              VatTax: vatTax,
              Discount: discount,
              OtherCost: otherCost,
              ShippingCost: shippingCost,
              GrandTotal: grandTotal,
              Note: note
          };
            let result= await CreateSaleRequest(Parent, SaleItemList,ProcessingBtnRef);
            if(result===true){
                store.dispatch(ClearSaleItemList([]));
                navigate('/SalesListPage');
            }
        }
    }



    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Create Sales</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-12 p-1">
                                        <label className="form-label">Customer</label>
                                        <select ref={(select)=>customerIDRef=select} className="form-select form-select-sm">
                                            <option value="">Select Customer</option>
                                            {
                                                CustomerDropDown.map((item,i)=>{
                                                    return( <option key={i.toLocaleString()} value={item._id}>{item.CustomerName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Vat/Tax</label>
                                        <input ref={(input)=>vatTaxRef=input} className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Discount</label>
                                        <input ref={(input)=>discountRef=input} className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Other Cost</label>
                                        <input ref={(input)=>otherCostRef=input} className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Shipping Cost</label>
                                        <input ref={(input)=>shippingCostRef=input} className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Grand Total</label>
                                        <input ref={(input)=>grandTotalRef=input} className="form-control form-control-sm" type="number"/>
                                    </div>


                                    <div className="col-12 p-1">
                                        <label className="form-label">Note</label>
                                        <input ref={(input)=>noteRef=input} className="form-control form-control-sm" type="text"/>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={CreateNewSale} ref={(button)=>ProcessingBtnRef=button} className="btn btn-lg my-3 btn-success">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-8 mb-3">
                        <div className="card  h-100">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-6  p-1">
                                        <label className="form-label">Select Product</label>
                                        <select ref={(input)=>productRef=input} className="form-select form-select-sm">
                                            <option value="">Select Product</option>
                                            {
                                                ProductDropDown.map((item,i)=>{
                                                    return( <option key={i.toLocaleString()} value={item._id}>{item.ProductName}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Qty</label>
                                        <input ref={(input)=>qtyRef=input}  className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Unit Price</label>
                                        <input ref={(input)=>unitPriceRef=input} className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Add to cart</label>
                                        <button onClick={OnAddCart} className="btn w-100 btn-success btn-sm"><BsCartCheck/></button>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive table-section">
                                            <table className="table-sm text-center table">
                                                <thead className="sticky-top bg-white">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Qty</th>
                                                    <th>Unit Price</th>
                                                    <th>Total</th>
                                                    <th>Remove</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    SaleItemList.map((item,i)=>{
                                                        return(
                                                            <tr key={i.toString()}>
                                                                <td>{item.ProductName}</td>
                                                                <td>{item.Qty}</td>
                                                                <td>{item.UnitCost}</td>
                                                                <td>{item.Total}</td>
                                                                <td><button onClick={removeCart.bind(this,i)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"><BsTrash/></button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
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

export default SalesCreate;