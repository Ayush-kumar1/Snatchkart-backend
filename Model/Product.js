import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    body: {
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
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,

    },
    fast_delivery: {
        type: Boolean,

    }
})

const res = mongoose.model("Product", productSchema);
export default res;