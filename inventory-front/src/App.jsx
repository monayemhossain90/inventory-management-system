import LoginPage from "./pages/Users/LoginPage.jsx";
import BrandCreatePage from "./pages/Brand/BrandCreatePage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CustomerCreatePage from "./pages/Customer/CustomerCreatePage.jsx";
import CategoryCreatePage from "./pages/Category/CategoryCreatePage.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import BrandListPage from "./pages/Brand/BrandListPage.jsx";
import BrandUpdatePage from "./pages/Brand/BrandUpdatePage.jsx";
import CategoryUpdatePage from "./pages/Category/CategoryUpdatePage.jsx";
import CategoryListPage from "./pages/Category/CategoryListPage.jsx";
import ProfilePage from "./pages/Users/ProfilePage.jsx";
import EditProfilePage from "./pages/Users/EditProfilePage.jsx";
import ChangePasswordPage from "./pages/Users/ChangePasswordPage.jsx";
import ProductCreatePage from "./pages/Product/ProductCreatePage.jsx";
import ProductListPage from "./pages/Product/ProductListPage.jsx";
import FullscreenLoader from "./components/MasterLayout/FullscreenLoader.jsx";
import ProductUpdatePage from "./pages/Product/ProductUpdatePage.jsx";
import CustomerUpdatePage from "./pages/Customer/CustomerUpdatePage.jsx";
import CustomerListPage from "./pages/Customer/CustomerListPage.jsx";
import SupplierCreatePage from "./pages/Supplier/SupplierCreatePage.jsx";
import SupplierUpdatePage from "./pages/Supplier/SupplierUpdatePage.jsx";
import SupplierListPage from "./pages/Supplier/SupplierListPage.jsx";
import ExpenseTypeCreatePage from "./pages/ExpenseType/ExpenseTypeCreatePage.jsx";
import ExpenseTypeUpdatePage from "./pages/ExpenseType/ExpenseTypeUpdatePage.jsx";
import ExpenseTypeListPage from "./pages/ExpenseType/ExpenseTypeListPage.jsx";
import ExpenseCreatePage from "./pages/Expense/ExpenseCreatePage.jsx";
import ExpenseUpdatePage from "./pages/Expense/ExpenseUpdatePage.jsx";
import ExpenseListPage from "./pages/Expense/ExpenseListPage.jsx";
import PurchaseCreatePage from "./pages/Purchase/PurchaseCreatePage.jsx";
import PurchaseListPage from "./pages/Purchase/PurchaseListPage.jsx";
import SalesCreatePage from "./pages/Sales/SalesCreatePage.jsx";
import SalesListPage from "./pages/Sales/SalesListPage.jsx";
import ReturnCreatePage from "./pages/Return/ReturnCreatePage.jsx";
import ReturnListPage from "./pages/Return/ReturnListPage.jsx";
import PurchaseReportPage from "./pages/Report/PurchaseReportPage.jsx";
import SaleReportPage from "./pages/Report/SaleReportPage.jsx";
import ReturnReportPage from "./pages/Report/ReturnReportPage.jsx";
import ExpenseReportPage from "./pages/Report/ExpenseReportPage.jsx";
import Page404 from "./pages/NotFound/Page404.jsx";
import SignUpPage from "./pages/Users/SignUpPage.jsx";
import SignUpVerifyOtpPage from "./pages/Users/SignUpVerifyOtpPage.jsx";
import SendOtpPage from "./pages/ForgotPassword/SendOtpPage.jsx";
import VerifyOtpPage from "./pages/ForgotPassword/VerifyOtpPage.jsx";
import CreatePasswordPage from "./pages/ForgotPassword/CreatePasswordPage.jsx";


const App = () => {
    return (
        <>

          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<PrivateRoute><DashboardPage/></PrivateRoute>} />
                  <Route exact path="/Profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>} />
                  <Route exact path="/EditProfile" element={<PrivateRoute><EditProfilePage/></PrivateRoute>} />
                  <Route exact path="/ChangePassword" element={<PrivateRoute><ChangePasswordPage/></PrivateRoute>} />


                  <Route exact path="/CategoryCreatePage" element={<PrivateRoute><CategoryCreatePage/></PrivateRoute>} />
                  <Route exact path="/CategoryUpdatePage/:id" element={<PrivateRoute><CategoryUpdatePage/></PrivateRoute>} />
                  <Route exact path="/CategoryListPage" element={<PrivateRoute><CategoryListPage/></PrivateRoute>} />

                  <Route exact path="/ProductCreatePage" element={<PrivateRoute><ProductCreatePage/></PrivateRoute>} />
                  <Route exact path="/ProductUpdatePage/:id" element={<PrivateRoute><ProductUpdatePage/></PrivateRoute>} />
                  <Route exact path="/ProductListPage" element={<PrivateRoute><ProductListPage/></PrivateRoute>} />

                  <Route exact path="/CustomerCreatePage" element={<PrivateRoute><CustomerCreatePage/></PrivateRoute>} />
                  <Route exact path="/CustomerUpdatePage/:id" element={<PrivateRoute><CustomerUpdatePage/></PrivateRoute>} />
                  <Route exact path="/CustomerListPage" element={<PrivateRoute><CustomerListPage/></PrivateRoute>} />

                  <Route exact path="/ExpenseTypeCreatePage" element={<PrivateRoute><ExpenseTypeCreatePage/></PrivateRoute>}  />
                  <Route exact path="/ExpenseTypeUpdatePage/:id" element={<PrivateRoute><ExpenseTypeUpdatePage/></PrivateRoute>}  />
                  <Route exact path="/ExpenseTypeListPage" element={<PrivateRoute><ExpenseTypeListPage/></PrivateRoute>}  />

                  <Route exact path="/ExpenseCreatePage" element={<PrivateRoute><ExpenseCreatePage/></PrivateRoute>} />
                  <Route exact path="/ExpenseUpdatePage/:id" element={<PrivateRoute><ExpenseUpdatePage/></PrivateRoute>} />
                  <Route exact path="/ExpenseListPage" element={<PrivateRoute><ExpenseListPage/></PrivateRoute>} />

                  <Route exact path="/SupplierCreatePage" element={<PrivateRoute><SupplierCreatePage/></PrivateRoute>} />
                  <Route exact path="/SupplierUpdatePage/:id" element={<PrivateRoute><SupplierUpdatePage/></PrivateRoute>} />
                  <Route exact path="/SupplierListPage" element={<PrivateRoute><SupplierListPage/></PrivateRoute>} />

                  <Route path="/BrandCreatePage" element={<PrivateRoute><BrandCreatePage/></PrivateRoute>}/>
                  <Route path="/BrandUpdatePage/:id" element={<PrivateRoute><BrandUpdatePage/></PrivateRoute>}/>
                  <Route exact path="/BrandListPage" element={<PrivateRoute><BrandListPage/></PrivateRoute>} />

                  <Route exact path="/PurchaseCreatePage" element={<PrivateRoute><PurchaseCreatePage/></PrivateRoute>} />
                  <Route exact path="/PurchaseListPage" element={<PrivateRoute><PurchaseListPage/></PrivateRoute>} />

                  <Route exact path="/SalesCreatePage" element={<PrivateRoute><SalesCreatePage/></PrivateRoute>} />
                  <Route exact path="/SalesListPage" element={<PrivateRoute><SalesListPage/></PrivateRoute>} />

                  <Route exact path="/ReturnCreatePage" element={<PrivateRoute><ReturnCreatePage/></PrivateRoute>} />
                  <Route exact path="/ReturnListPage" element={<PrivateRoute><ReturnListPage/></PrivateRoute>} />

                  <Route exact path="/PurchaseReportPage" element={<PrivateRoute><PurchaseReportPage/></PrivateRoute>} />
                  <Route exact path="/SaleReportPage" element={<PrivateRoute><SaleReportPage/></PrivateRoute>} />
                  <Route exact path="/ReturnReportPage" element={<PrivateRoute><ReturnReportPage/></PrivateRoute>} />
                  <Route exact path="/ExpenseReportPage" element={<PrivateRoute><ExpenseReportPage/></PrivateRoute>} />
                  <Route path="*" element={<Page404/>}/>

                  <Route exact path="/Login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
                  <Route exact path="/SignUp" element={<PublicRoute><SignUpPage/></PublicRoute>} />
                  <Route exact path="/SignUpVerifyOTP" element={<PublicRoute><SignUpVerifyOtpPage/></PublicRoute>} />
                  <Route exact path="/SendOTP" element={<PublicRoute><SendOtpPage/></PublicRoute>} />
                  <Route exact path="/VerifyOTP" element={<PublicRoute><VerifyOtpPage/></PublicRoute>} />
                  <Route exact path="/CreatePassword" element={<PublicRoute><CreatePasswordPage/></PublicRoute>} />
              </Routes>
          </BrowserRouter>
            <FullscreenLoader/>

        </>
    );
};

export default App;