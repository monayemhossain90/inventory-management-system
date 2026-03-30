import React, {Fragment, useEffect} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {useSelector} from "react-redux";
import CurrencyFormat from 'react-currency-format';
import {
    selectExpenseChart,
    selectExpenseTotal, selectPurchaseChart, selectPurchaseTotal, selectReturnChart, selectReturnTotal,
    selectSaleChart,
    selectSaleTotal
} from "../../redux/state-slice/dashboardSlice";
import {ExpensesSummary, PurchaseSummary, ReturnSummary, SaleSummary} from "../../ApiServices/SummaryAPIRequest";
const Dashboard = () => {

    useEffect(()=>{
        (async () => {
           await ExpensesSummary()
            await SaleSummary()
            await ReturnSummary()
            await PurchaseSummary()
        })();
    },[])

    let ExpenseChart = useSelector(selectExpenseChart);
    let ExpenseTotal = useSelector(selectExpenseTotal);

    let SaleChart = useSelector(selectSaleChart);
    let SaleTotal = useSelector(selectSaleTotal);

    let ReturnChart = useSelector(selectReturnChart);
    let ReturnTotal = useSelector(selectReturnTotal);


    let PurchaseChart = useSelector(selectPurchaseChart);
    let PurchaseTotal = useSelector(selectPurchaseTotal);

    return (
           <Fragment>
               <div className="container-fluid">
                   <div className="row">
                       <div className="col-md-3 p-2">
                           <div className="card">
                               <div className="card-body">
                                <span className="h5">
                                    <CurrencyFormat value={ExpenseTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </span>
                                   <p>Total Expense</p>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-3 p-2">
                           <div className="card">
                               <div className="card-body">
                               <span className="h5">
                                    <CurrencyFormat value={SaleTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </span>
                                   <p>Total Sale</p>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-3 p-2">
                           <div className="card">
                               <div className="card-body">
                               <span className="h5">
                                    <CurrencyFormat value={PurchaseTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </span>
                                   <p>Total Purchase</p>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-3 p-2">
                           <div className="card">
                               <div className="card-body">
                               <span className="h5">
                                    <CurrencyFormat value={ReturnTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </span>
                                   <p>Total Return</p>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col-md-6 p-2">
                           <div className="card">
                               <div className="card-body">
                                   <span className="h6">Expense Last 30 Days</span>
                                   <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                       <AreaChart width={500} height={200} data={ExpenseChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                           <CartesianGrid strokeDasharray="3 3" />
                                           <XAxis dataKey="_id" />
                                           <YAxis />
                                           <Tooltip />
                                           <Area type="monotone" dataKey="TotalAmount" stroke="#CB0C9F" fill="#CB0C9F" />
                                       </AreaChart>
                                   </ResponsiveContainer>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-6 p-2">
                           <div className="card">
                               <div className="card-body">
                                   <span className="h6">Sales Last 30 Days</span>
                                   <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                       <AreaChart width={500} height={200} data={SaleChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                           <CartesianGrid strokeDasharray="3 3" />
                                           <XAxis dataKey="_id" />
                                           <YAxis />
                                           <Tooltip />
                                           <Area type="monotone" dataKey="TotalAmount" stroke="#8884d8" fill="#8884d8" />
                                       </AreaChart>
                                   </ResponsiveContainer>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-6 p-2">
                           <div className="card">
                               <div className="card-body">
                                   <span className="h6">Purchase Last 30 Days</span>
                                   <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                       <AreaChart width={500} height={200} data={PurchaseChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                           <CartesianGrid strokeDasharray="3 3" />
                                           <XAxis dataKey="_id" />
                                           <YAxis />
                                           <Tooltip />
                                           <Area type="monotone" dataKey="TotalAmount" stroke="#00A884" fill="#00A884" />
                                       </AreaChart>
                                   </ResponsiveContainer>
                               </div>
                           </div>
                       </div>
                       <div className="col-md-6 p-2">
                           <div className="card">
                               <div className="card-body">
                                   <span className="h6">Return Last 30 Days</span>
                                   <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                       <AreaChart width={500} height={200} data={ReturnChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                           <CartesianGrid strokeDasharray="3 3" />
                                           <XAxis dataKey="_id" />
                                           <YAxis />
                                           <Tooltip />
                                           <Area type="monotone" dataKey="TotalAmount" stroke="#CB0C9F" fill="#CB0C9F" />
                                       </AreaChart>
                                   </ResponsiveContainer>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
           </Fragment>
    );
};
export default Dashboard;