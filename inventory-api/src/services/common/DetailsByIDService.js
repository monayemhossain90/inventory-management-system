const mongoose = require("mongoose");
const DetailsByIDService = async (Request, DataModel) => {

    try {

        let DetailsID = Request.params.id;
        let UserEmail = Request.headers['email'];

        const ObjectId = mongoose.Types.ObjectId;

        let DetailsQueryObject = {_id: ObjectId(DetailsID), UserEmail: UserEmail};

        let data = await DataModel.aggregate([
            {$match: DetailsQueryObject}
        ])
        return {status: "success", data: data[0]}
    }
    catch (error) {
        return {status: "fail", data: error.toString()}
    }
}
module.exports = DetailsByIDService
