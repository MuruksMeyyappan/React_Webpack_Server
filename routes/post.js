const express = require("express");
const path = require("path");
const router = express.Router();

router.post("/register", async (req, res) => {
    console.log("#123 req",req.body);
    res.status(200).json({ status: 200,response : req.body });
});


module.exports = router;
