import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SupplierList = React.lazy(() => import('../../components/Supplier/SupplierList'));



const SupplierListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <SupplierList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SupplierListPage;