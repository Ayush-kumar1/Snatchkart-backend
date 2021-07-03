import express from "express"
const router = express.Router();
import Cart from "../Model/Cart.js";
import requireLogin from "../middleware/requireLogin.js";


router.get("/mycart", requireLogin, (req, res) => {
    Cart.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(product => {
            return res.json({ list: product })

            // return res.json({ message: req.user })
        })
        .catch(err => {
            return res.json({ error: err })
        })
})


router.post("/addcart", requireLogin, (req, res) => {

    const { name, rating, price, image } = req.body;

    if (!name || !rating || !price || !image) {
        return res.status(422).json({ message: "Please fill all the fields" })
    }

    const cart = new Cart({
        name,
        rating,
        price,
        image,
        postedBy: req.user
    })

    cart.save()
        .then((result) => {
            res.json({ result })
        })
        .catch(err => {
            res.json({ error: err.message })
        })
})

router.put("/incrementer", (req, res) => {
    Cart.findByIdAndUpdate(req.body.cartid, {
        $inc: { quantity: 1 }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.json({ error: err })
        } else {
            return res.json({ result })
        }
    })
})

router.put("/decrementer", (req, res) => {
    Cart.findByIdAndUpdate(req.body.cartid, {
        $inc: { quantity: -1 }
    }, {
        new: true
    }, (err, result) => {
        if (err) {
            return res.json({ error: err })
        } else {
            return res.json({ result })
        }
    })
})


router.put("/removecart", (req, res) => {

    Cart.findById(req.body.cartid)

    .then(found => {

        if (!found) {
            return res.status(422).json({ message: "This post does not exist" });
        }

        found.remove()
            .then((result) => {
                return res.json({ result })
            })
            .catch(err => {
                return res.json({ error: err })
            })
    })
})



export default router;



// "name":"POCO X3 (Cobalt Blue, 128 GB)  (8 GB RAM)",
//    "price":18000,
//    "rating":3.9,
//    "image":"https://rukminim1.flixcart.com/image/416/416/kfbfr0w0/mobile/f/x/r/poco-x3-mzb07z2in-original-imafvt3hz54npsba.jpeg?q=70"