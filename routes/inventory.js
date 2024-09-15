const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const drugModel = require("../models/inventory");

router
    .route("/")
    .get(async (req, res) => {
        const drugs = await drugModel.find();
        const minDrugs = drugs.filter((drug) => drug.Quantity <= 50);
        
        res.render("inventory", {
            user: req.user,
            drugs: drugs,
            minDrugs: minDrugs,
        });
    })
    .post(async (req, res) => {
        const drugAdded = await drugModel.create({
            Name: req.body.name,
            Price: req.body.price,
            Quantity: req.body.quantity,
            Supplier: req.body.supplier,
        });
        await drugAdded
            .save()
            .then((drugAdded) => res.redirect("/api/drugs"))
            .catch((err) => {
                console.log(err);
            });
    });

router.post("/update", async (req, res) => {
    try {
        const drug = await drugModel.findById(req.body.id);
        if (!drug) {
            return res.status(404).json({ message: "Drug not found" });
        }

        drug.Name = req.body.name;
        drug.Price = req.body.price;
        drug.Quantity = req.body.quantity;
        drug.Supplier = req.body.supplier;

        await drug.save();

        res.redirect("/api/drugs");
    } catch (err) {
        res.status(400).json({ message: "Error: " + err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const drug = await drugModel.findByIdAndDelete(req.params.id);
        if (!drug) {
            return res.status(404).json({ message: "Drug not found" });
        }
        res.json({ message: "Drug deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error: " + err.message });
    }
});

module.exports = router;
