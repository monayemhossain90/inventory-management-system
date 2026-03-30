import React, {Fragment, Suspense, useEffect} from 'react';
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import {useParams} from "react-router-dom";
import MasterLayout from "../../components/MasterLayout/MasterLayout";
const CustomerUpdate = React.lazy(() => import('../../components/Customer/CustomerUpdate'));


const CustomerUpdatePage = () => {

    const params = useParams();


    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={LazyLoader}>
                    <CustomerUpdate id={params['id']}/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CustomerUpdatePage;