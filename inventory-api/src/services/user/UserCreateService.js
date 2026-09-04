const {HashPassword} = require("../../utility/PasswordUtility");

const UserCreateService= async (Request,DataModel) => {
    try{
        let PostBody=Request.body;

        if(PostBody.password){
            PostBody.password = await HashPassword(PostBody.password);
        }

        let data = await DataModel.create(PostBody)
        return {status: "success", data: data}
    }
    catch (error) {
        return {status: "EmailAlreadyExist", data: error}
    }
}
module.exports=UserCreateService
