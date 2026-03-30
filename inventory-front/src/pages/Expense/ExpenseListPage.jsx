import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ExpenseList = React.lazy(() => import('../../components/Expense/ExpenseList'));

const ExpenseListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <ExpenseList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ExpenseListPage;