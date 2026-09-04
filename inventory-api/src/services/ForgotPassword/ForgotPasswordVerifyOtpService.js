const IsOTPExpired = require("../../utility/OTPExpiryUtility");

const ForgotPasswordVerifyOtpService= async (Request, DataModel) => {
    try {
        let email = Request.params.email;
        let OTPCode = Request.params.otp;
        let status=0;
        let statusUpdate=1;


        //Database First Process
        let OTPRecord = await DataModel.findOne({email: email, otp: OTPCode, status: status})

        if (OTPRecord && !IsOTPExpired(OTPRecord)) {

            // Second Process
            let OTPUpdate = await DataModel.updateOne({email: email, otp: OTPCode, status: status}, {email: email, otp: OTPCode, status: statusUpdate})
            return {status: "success", data: OTPUpdate}

        } else if (OTPRecord) {

            return {status: "fail", data: "OTPExpired"}

        } else {

             return  {status: "fail", data: "InvalidOtpCode"}
        }
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=ForgotPasswordVerifyOtpService
