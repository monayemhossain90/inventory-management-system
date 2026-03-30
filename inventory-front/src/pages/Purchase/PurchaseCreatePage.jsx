import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const PurchaseCreate = React.lazy(() => import('../../components/Purchase/PurchaseCreate'));

const PurchaseCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <PurchaseCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default PurchaseCreatePage;