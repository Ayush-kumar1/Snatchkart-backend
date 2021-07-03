import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const wishlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
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
    postedBy: {
        type: ObjectId,
        ref: "User"
    }

})

const res = mongoose.model("Wishlist", wishlistSchema);
export default res;