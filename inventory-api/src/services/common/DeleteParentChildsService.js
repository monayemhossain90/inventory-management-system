const mongoose = require("mongoose");

/**
 * Deletes a Parent document plus its Child line-items in one transaction.
 *
 * StockConfig (optional) = { ProductModel, direction }
 *   Pass the SAME direction that was used when the records were created
 *   (e.g. Purchases: 1, Sales: -1, Returns: 1) - this service reverses it
 *   automatically so deleting a Sale gives stock back, deleting a
 *   Purchase/Return takes stock back out, etc.
 */
const DeleteParentChildsService = async (Request, ParentModel, ChildsModel, JoinPropertyName, StockConfig) => {

    const session = await mongoose.startSession();

    try {

        // Begin Transaction
        await session.startTransaction();

        let DeleteID = Request.params.id;
        let UserEmail = Request.headers['email'];

        let DeleteChildQueryObject = {};
        DeleteChildQueryObject[JoinPropertyName] = DeleteID;
        DeleteChildQueryObject['UserEmail'] = UserEmail;

        let DeleteParentQueryObject = {_id: DeleteID, UserEmail: UserEmail};

        // Reverse the stock effect of the childs being removed, before deleting them
        if (StockConfig && StockConfig.ProductModel && StockConfig.direction) {
            let ChildsToDelete = await ChildsModel.find(DeleteChildQueryObject).session(session);

            for (const child of ChildsToDelete) {
                let Qty = Number(child.Qty) || 0;
                // reverse of the original direction
                await StockConfig.ProductModel.updateOne(
                    {_id: child.ProductID, UserEmail: UserEmail},
                    {$inc: {Stock: -1 * StockConfig.direction * Qty}},
                    {session}
                );
            }
        }

        // First Process
        let ChildsDelete = await ChildsModel.deleteMany(DeleteChildQueryObject).session(session);

        // Second Process
        let ParentDelete = await ParentModel.deleteMany(DeleteParentQueryObject).session(session)

        // Commit Transaction
        await session.commitTransaction();
        session.endSession();

        return {status: "success", Parent: ParentDelete, Childs: ChildsDelete}

    }
    catch (error) {
        // Roll Back Transaction
        await session.abortTransaction();
        session.endSession();
        return {status: "fail", data: error.toString()}
    }
}
module.exports = DeleteParentChildsService
