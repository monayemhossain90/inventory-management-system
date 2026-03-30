import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SalesList = React.lazy(() => import('../../components/Sales/SalesList'));


const SalesListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <SalesList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SalesListPage;