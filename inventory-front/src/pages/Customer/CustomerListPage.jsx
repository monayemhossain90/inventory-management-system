import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const CustomerList = React.lazy(() => import('../../components/Customer/CustomerList'));


const CustomerListPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <CustomerList/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CustomerListPage;