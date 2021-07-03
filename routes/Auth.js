import dotenv from 'dotenv';

dotenv.config();

import express from "express"
const router = express.Router();
import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../Secret.js";


router.post("/signup", (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ message: "Please fill all the fields" })
    }

    User.findOne({ email })
        .then(saveduser => {

            if (saveduser) {
                return res.json({ message: "This user already exist" })
            }

            bcrypt.hash(password, 10)
                .then(hashedpassword => {
                    const user = new User({
                        name,
                        email,
                        password: hashedpassword
                    })

                    user.save()
                        .then(user => {
                            res.json({ message: "Registration sucessful" })
                        })
                        .catch(err => {
                            res.json({ error: err.message })
                        })

                })
        })
        .catch(err => {
            res.json({ error: err.message })
        })
})


router.post("/signin", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ message: "Please enter both email and password" })
    }

    User.findOne({ email })
        .then(savedUser => {
            if (!savedUser) {
                return res.json({ message: "This user does not exist" })
            }

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // return res.json({ message: "Login sucessful" })

                        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET)
                        const { _id, name, email } = savedUser;
                        res.json({ message: "Login succesful", token, user: { _id, name, email } })
                    } else {
                        return res.json({ message: "Invalid email or password" })
                    }
                })
        })
        .catch(err => {
            return res.json({ message: err })
        })

})

export default router;