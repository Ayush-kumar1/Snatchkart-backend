import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 5000;
import authRouter from "./routes/Auth.js";
import productRouter from "./routes/Product.js";
import wishlistRouter from "./routes/Wishlist.js";
import cartRouter from "./routes/Cart.js";
// password- qkhsvEbp8QAyrjtu
const dbURL = process.env.dbURL;

app.use(express.json())
app.use(cors());
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

app.use("/", authRouter);
app.use("/", productRouter);
app.use("/", wishlistRouter);
app.use("/", cartRouter);

app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})