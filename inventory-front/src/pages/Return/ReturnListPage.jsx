import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ReturnList = React.lazy(() => import('../../components/Return/ReturnList'));


const ReturnListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <ReturnList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ReturnListPage;