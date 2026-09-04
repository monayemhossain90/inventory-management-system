const mongoose = require("mongoose");

/**
 * Creates a Parent document plus its Child line-items in one transaction.
 *
 * StockConfig (optional) = { ProductModel, direction }
 *   direction  1  -> increases product Stock (e.g. Purchases, Returns)
 *   direction -1  -> decreases product Stock (e.g. Sales), and the
 *                    transaction is aborted if any product does not
 *                    have enough Stock to cover the requested Qty.
 */
const CreateParentChildsService = async (Request, ParentModel, ChildsModel, JoinPropertyName, StockConfig) => {

    // Create Transaction Session
    const session = await mongoose.startSession();

    try {

        // Begin Transaction
        await session.startTransaction();

        // First Database Process
        let Parent = Request.body['Parent'];
        Parent.UserEmail = Request.headers['email'];
        let ParentCreation = await ParentModel.create([Parent], {session});

        // Second Database Process
        let Childs = Request.body['Childs'];
        Childs.forEach((element) => {
            element[JoinPropertyName] = ParentCreation[0]['_id'];
            element['UserEmail'] = Request.headers['email'];
        });

        let ChildsCreation = await ChildsModel.insertMany(Childs, {session});

        // Optional Stock Adjustment
        if (StockConfig && StockConfig.ProductModel && StockConfig.direction) {
            for (const child of Childs) {
                let Qty = Number(child.Qty) || 0;

                if (StockConfig.direction < 0) {
                    // Selling stock out - make sure enough is available first
                    let Product = await StockConfig.ProductModel.findOne(
                        {_id: child.ProductID, UserEmail: Request.headers['email']}
                    ).session(session);

                    if (!Product) {
                        throw new Error("ProductNotFound");
                    }
                    if ((Product.Stock || 0) < Qty) {
                        throw new Error("InsufficientStock:" + Product.ProductName);
                    }
                }

                await StockConfig.ProductModel.updateOne(
                    {_id: child.ProductID, UserEmail: Request.headers['email']},
                    {$inc: {Stock: StockConfig.direction * Qty}},
                    {session}
                );
            }
        }

        // Transaction Success
        await session.commitTransaction();
        session.endSession();

        return {status: "success", Parent: ParentCreation, Childs: ChildsCreation}

    }
    catch (error) {
        // Roll Back Transaction if Fail
        await session.abortTransaction();
        session.endSession();

        let message = error.toString();
        if (message.includes("InsufficientStock")) {
            return {status: "fail", data: "InsufficientStock", product: message.split(":")[1]}
        }
        return {status: "fail", data: message}
    }
}
module.exports = CreateParentChildsService
