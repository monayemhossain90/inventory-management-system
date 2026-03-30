import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const CustomerCreate = React.lazy(() => import('../../components/Customer/CustomerCreate'));

const CustomerCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <CustomerCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CustomerCreatePage;