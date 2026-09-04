const CreateToken = require("../../utility/CreateToken");
const {ComparePassword} = require("../../utility/PasswordUtility");

const UserLoginService= async (Request,DataModel) => {
    try {
        let email = Request.body['email'];
        let password = Request.body['password'];

        // Look the user up by email only - never match a raw password
        // straight into the query (that also used to allow the whole
        // request body to be used as a Mongo filter).
        let data = await DataModel.aggregate([
            {$match: {email: email}},
            {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
        ])

        if(data.length>0){

            let PasswordMatch = await ComparePassword(password, data[0]['password']);

            if(!PasswordMatch){
                return {status:"NoUserFound"}
            }

            let UserData = {...data[0]};
            delete UserData.password;

            let token = await CreateToken(UserData['email'])
            return {status:"success",token:token,data:UserData}
        }
        else {
            return {status:"NoUserFound"}
        }
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports=UserLoginService
