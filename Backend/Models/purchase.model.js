import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    }
})

export const purchase = mongoose.model("purchase",purchaseSchema)