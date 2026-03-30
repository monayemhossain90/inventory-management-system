import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ExpenseCreate = React.lazy(() => import('../../components/Expense/ExpenseCreate'));

const ExpenseCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <ExpenseCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ExpenseCreatePage;