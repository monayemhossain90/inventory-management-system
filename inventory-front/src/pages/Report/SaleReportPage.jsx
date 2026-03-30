import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SaleReport = React.lazy(() => import('../../components/Report/SaleReport'));


const SaleReportPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <SaleReport/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SaleReportPage;