import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import {useParams} from "react-router-dom";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ExpenseTypeUpdate = React.lazy(() => import('../../components/ExpenseType/ExpenseTypeUpdate'));

const ExpenseTypeUpdatePage = () => {

    const params = useParams();


    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <ExpenseTypeUpdate id={params['id']}/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ExpenseTypeUpdatePage;