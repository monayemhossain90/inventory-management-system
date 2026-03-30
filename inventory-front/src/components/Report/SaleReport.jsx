import {useRef} from 'react';
import {useSelector} from "react-redux";
import exportFromJSON from "export-from-json";
import moment from "moment/moment";
import CurrencyFormat from "react-currency-format";
import {ErrorToast, IsEmpty} from "../../helper/ValidationHelper";
import {selectSalesByDateList} from "../../redux/state-slice/reportSlice";
import {SalesByDateRequest} from "../../ApiServices/ReportApiRequest";

const SaleReport = () => {
    let fromRef,toRef=useRef();
    let DataList=useSelector(selectSalesByDateList);

    const CreateReport = async () => {
        let fromDate = fromRef.value;
        let toDate = toRef.value;
        if (IsEmpty(fromDate)) {
            ErrorToast("From Date Required")
        } else if (IsEmpty(toDate)) {
            ErrorToast("To Date Required")
        } else {
           await SalesByDateRequest(fromDate,toDate);
        }
    }

    const OnExport = (exportType,data) => {
        const fileName = 'SalesReport'
        if(data.length>0){
            let ReportData=[]
            data.map((item)=>{
                let listItem={
                    "Product":item['products']['Name'], Unit:item['products']['Unit'],
                    "Details":item['products']['Details'],
                    "Brand":item['brands'][0]['Name'],
                    "Category":item['categories'][0]['Name'],
                    "UnitCost":item['UnitCost'],
                    "Total":item['Total'],
                    "Date":moment(item['CreatedDate']).format('MMMM Do YYYY')
                }
                ReportData.push(listItem)
            })
            exportFromJSON({data: ReportData, fileName: fileName, exportType: exportType })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-12 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <h5 >Sales Report by Date</h5>
                                <hr className="bg-light"/>

                                <div className="col-4 p-2">
                                    <label className="form-label">Date Form:</label>
                                    <input  ref={(input)=>fromRef=input} className="form-control form-control-sm" type="date"/>
                                </div>
                                <div className="col-4 p-2">
                                    <label className="form-label">Date To:</label>
                                    <input  ref={(input)=>toRef=input} className="form-control form-control-sm" type="date"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 p-2">
                                    <button onClick={CreateReport} className="btn btn-sm my-3 btn-success">Create</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    DataList.length>0?(
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h6>Total: {DataList[0]['Total'].length>0?<CurrencyFormat value={DataList[0]['Total'][0]['TotalAmount']} displayType={'text'} thousandSeparator={true} prefix={'$ '} />:0} </h6>
                                            <button onClick={OnExport.bind(this,'csv',DataList[0]['Rows'])}  className="btn btn-sm my-2 btn-success">Download CSV</button>
                                            <button onClick={OnExport.bind(this,'xls',DataList[0]['Rows'])}   className="btn btn-sm my-2 ms-2 btn-success">Download XLS</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ):(
                        <div></div>
                    )
                }
            </div>
        </div>
    );
};

export default SaleReport;