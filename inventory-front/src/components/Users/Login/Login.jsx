import {Link} from "react-router-dom";
import {LoginRequest} from "../../../ApiServices/UsersAPIRequest";
import {ErrorToast, IsEmail, IsEmpty} from "../../../helper/ValidationHelper";
import {useRef} from "react";

const  Login = () => {

    let passwordRef,emailRef,SignInBtnRef=useRef();

//  Demo login button - autofills the Sign In form with a known
//     account so visitors can try the app quickly.
    const DEMO_EMAIL = "monayemhossain347@gmail.com";
    const DEMO_PASSWORD = "123456";

    const SubmitLogin=async () => {
        debugger;
        let email = emailRef.value;
        let password = passwordRef.value.trim();
        debugger;

        if(IsEmpty(email)) {
            ErrorToast("Email is Required");
        }
        else if(IsEmail(email)) {
            ErrorToast("Invalid Email Address")
        }
        else if(IsEmpty(password)) {
            ErrorToast("Password Required")
        }
        else{
            let result= await LoginRequest(email, password, SignInBtnRef);
            if(result){

                setTimeout(()=>{
                    window.location.href="/";
                },500)
            }
        }
    }


        const DemoLogin=() => {
        emailRef.value = DEMO_EMAIL;
        passwordRef.value = DEMO_PASSWORD;
    }
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h3>SIGN IN</h3>
                                <br/>
                                <input ref={(input)=>emailRef=input} placeholder="User Email" className="form-control" type="email"/>
                                <br/>
                                <input ref={(input)=>passwordRef=input} placeholder="User Password" className="form-control" type="password"/>
                                <br/>
                                <button onClick={SubmitLogin} ref={(input)=>SignInBtnRef=input} className="btn btnBackground w-100 animated">Sign In</button>
 <button onClick={DemoLogin} type="button" className="btn btn-outline-secondary w-100 animated mt-2">Auto Fill login credentials</button>
                                <div className="float-end mt-3">
                                    <span>
                                        <Link className="text-center ms-3 h6" to="/SignUp">Sign Up</Link>
                                        <span className="ms-1">|</span>
                                        <Link className="text-center ms-3 h6" to="/SendOTP">Forgot Password</Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Login;
