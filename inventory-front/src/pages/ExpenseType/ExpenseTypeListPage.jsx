import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ExpenseTypeList = React.lazy(() => import('../../components/ExpenseType/ExpenseTypeList'));


const ExpenseTypeListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <ExpenseTypeList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ExpenseTypeListPage;