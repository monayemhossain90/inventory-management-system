import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const SalesCreate = React.lazy(() => import('../../components/Sales/SalesCreate'));

const SalesCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <SalesCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default SalesCreatePage;