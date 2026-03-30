
require('dotenv').config();
const mongoose = require("mongoose");

const dbConnect = () => {

    let uri = process.env.MONGO_URI;
 

    mongoose.connect(uri).then((res)=>{
        console.log("DB Connection Success");
    }).catch((error)=>{
        console.log("DB Connection Failed");
        console.log(error);
    })

}


module.exports=dbConnect;