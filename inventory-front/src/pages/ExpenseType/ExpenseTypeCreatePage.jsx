import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ExpenseTypeCreate = React.lazy(() => import('../../components/ExpenseType/ExpenseTypeCreate'));

const ExpenseTypeCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <ExpenseTypeCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ExpenseTypeCreatePage;