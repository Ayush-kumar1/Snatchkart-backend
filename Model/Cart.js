import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }

})

const res = mongoose.model("Cart", productSchema);
export default res;