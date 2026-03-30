import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import {useParams} from "react-router-dom";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SupplierUpdate = React.lazy(() => import('../../components/Supplier/SupplierUpdate'));
const SupplierUpdatePage = () => {

    const params = useParams();


    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <SupplierUpdate id={params['id']}/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SupplierUpdatePage;