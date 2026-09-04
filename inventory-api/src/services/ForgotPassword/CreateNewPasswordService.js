const {HashPassword} = require("../../utility/PasswordUtility");
const IsOTPExpired = require("../../utility/OTPExpiryUtility");

const CreateNewPasswordService= async (Request,UsersModel,OTPSModel) => {
    let email = Request.body['email'];
    let OTPCode = Request.body['otp'];
    let NewPass =  Request.body['password'];
    let statusUpdate=1;

    try {
        // Database First Process
          let OTPRecord = await OTPSModel.findOne({email: email, otp: OTPCode, status: statusUpdate});

          if(OTPRecord && !IsOTPExpired(OTPRecord)){
            let HashedPassword = await HashPassword(NewPass);
            // Database Second Process
            let PasswordUpdate = await UsersModel.updateOne({email: email},{password: HashedPassword})
            return {status: "success", data: PasswordUpdate}
          }
          else if(OTPRecord){
            return {status: "fail", data: "OTPExpired"}
          }
          else{
            return {status: "fail", data: "InvalidOtpCode"}
          }
    }


    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=CreateNewPasswordService
