const ParentModel = require("../../models/Returns/ReturnsModel");
const ChildsModel = require("../../models/Returns/ReturnProductsModel");
const CreateParentChildsService = require("../../services/common/CreateParentChildsService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildsService = require("../../services/common/DeleteParentChildsService");
const ProductsModel = require("../../models/Products/ProductsModel");

// Customer returns add stock back to a product
const StockConfig = {ProductModel: ProductsModel, direction: 1};

exports.CreateReturns=async (req, res) => {
    let Result= await CreateParentChildsService(req,ParentModel,ChildsModel,'ReturnID',StockConfig);
    res.status(200).json(Result)
}

exports.ReturnsList=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let JoinStage={$lookup: {from: "customers", localField: "CustomerID", foreignField: "_id", as: "Customers"}};
    let SearchArray=[{Note: SearchRgx},{CustomerName: SearchRgx},{CustomerAddress: SearchRgx},{CustomerPhone: SearchRgx},{CustomerEmail:SearchRgx}]
    let Projection = {$project:{_id:1, UserEmail:1, CustomerID:1, VatTax:1, Discount:1, OtherCost:1, ShippingCost:1, GrandTotal:1, Note:1, createdAt:1, updatedAt:1, CustomerName:{$first:"$Customers.CustomerName"}, CustomerPhone:{$first:"$Customers.Phone"}, CustomerAddress:{$first:"$Customers.Address"}, CustomerEmail:{$first:"$Customers.Email"} }}

    let Result=await ListOneJoinService(req,ParentModel,SearchArray,JoinStage,Projection);
    res.status(200).json(Result)
}

exports.ReturnDelete=async (req, res) => {
    let Result=await  DeleteParentChildsService(req,ParentModel,ChildsModel,'ReturnID',StockConfig)
    res.status(200).json(Result)
}


