const {HashPassword} = require("../../utility/PasswordUtility");
const IsOTPExpired = require("../../utility/OTPExpiryUtility");

const SignUpVerifyOtpService = async (Request, UsersModel, RegOTPModel ) => {

    let Email = Request.params.email;
    let OTPCode = Request.params.otp;
    let Status =0;
    let StatusUpdate=1;
    let reqBody = Request.body;

    try{

        //OTP Verify Query
        let OTPRecord = await RegOTPModel.findOne({email: Email,otp: OTPCode,status: Status});

        if(OTPRecord && !IsOTPExpired(OTPRecord)){

            let OTPUpdate = await RegOTPModel.updateOne({
                email: Email,
                otp: OTPCode,
                status: Status
            }, {status: StatusUpdate});

            if(reqBody.password){
                reqBody.password = await HashPassword(reqBody.password);
            }

            let SignUpData = await UsersModel.create(reqBody);
            return {status: "success", data: SignUpData };

        }
        else if(OTPRecord){
            return {status: "fail", data: "OTPExpired"};
        }
        else{

            return {status: "fail", data: "InvalidOTPCode"};

        }

    }
    catch (error){

           return {status: "fail", data: error.toString()};
    }




}

module.exports=SignUpVerifyOtpService
