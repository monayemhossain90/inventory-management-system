const {HashPassword, ComparePassword} = require("../../utility/PasswordUtility");

const ChangePasswordService = async (Request, UsersModel) => {

    try{

        let CurrentPassword = Request.body.currentPassword;
        let NewPassword = Request.body.newPassword;
        let Email = Request.headers['email'];

        //Database First Process
        let data = await UsersModel.aggregate([{$match:{email:Email}}]);

        if(data.length>0 && await ComparePassword(CurrentPassword, data[0]['password'])){

            let HashedNewPassword = await HashPassword(NewPassword);

            //Database Second Process
            let PasswordUpdate = await UsersModel.updateOne({email: Email}, {password: HashedNewPassword});
            return {status: "success", data: PasswordUpdate}
        }
        else{
            return  {status: "fail", data: "WrongCurrentPassword"}
        }

    }
    catch(error){

        return {status: "fail", data: error.toString()}
    }

}


module.exports=ChangePasswordService
