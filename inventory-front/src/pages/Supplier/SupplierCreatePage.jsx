import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SupplierCreate = React.lazy(() => import('../../components/Supplier/SupplierCreate'));


const SupplierCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <SupplierCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SupplierCreatePage;