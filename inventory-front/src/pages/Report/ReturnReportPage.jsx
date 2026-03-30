import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ReturnReport = React.lazy(() => import('../../components/Report/ReturnReport'));


const ReturnReportPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <ReturnReport/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};


export default ReturnReportPage;