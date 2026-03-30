import {configureStore} from "@reduxjs/toolkit";
import {settingsSliceReducer} from "../state-slice/settingsSlice";
import {profileSliceReducer} from "../state-slice/profileSlice";
import {brandSliceReducer} from "../state-slice/brandSlice";
import {categorySliceReducer} from "../state-slice/categoryslice";
import {customerSliceReducer} from "../state-slice/customerSlice";
import {expenseSliceReducer} from "../state-slice/expenseSlice";
import {expensetypeSliceReducer} from "../state-slice/expensetypeSlice";
import {purchaseSliceReducer} from "../state-slice/purchaseSlice";
import {reportSliceReducer} from "../state-slice/reportSlice";
import {returnSliceReducer} from "../state-slice/returnSlice";
import {saleSliceReducer} from "../state-slice/saleSlice";
import {supplierSliceReducer} from "../state-slice/supplierSlice";
import {productSliceReducer} from "../state-slice/productSlice";
import {dashboardSliceReducer} from "../state-slice/dashboardSlice";


export default configureStore({

    reducer:{
        settings:settingsSliceReducer,
        profile:profileSliceReducer,
        brand:brandSliceReducer,
        category:categorySliceReducer,
        customer:customerSliceReducer,
        expense:expenseSliceReducer,
        expensetype:expensetypeSliceReducer,
        product:productSliceReducer,
        purchase:purchaseSliceReducer,
        report:reportSliceReducer,
        return:returnSliceReducer,
        sale:saleSliceReducer,
        supplier:supplierSliceReducer,
        dashboard:dashboardSliceReducer
    }
})