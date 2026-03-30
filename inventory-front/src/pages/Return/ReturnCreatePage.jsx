import React, {Fragment, Suspense} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const ReturnCreate = React.lazy(() => import('../../components/Return/ReturnCreate'));


const ReturnCreatePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <ReturnCreate/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default ReturnCreatePage;