const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  try {
    let data = req.body.order_data;

    await data.splice(0, 0, { Order_date: req.body.order_date });

    // if email not existing in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.Email });
    console.log(eId);

    if (eId === null) {
      await Order.create({
        email: req.body.Email, order_data: [data]
      });

      res.json({ success: true });
    } else {
      await Order.findOneAndUpdate({ email: req.body.Email }, { $push: { order_data: data } });

      res.json({ success: true });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.post('/myOrderData', async (req, res) => {
  try {
    let mydata = await Order.findOne({ 'email': req.body.Email })
    res.json({ orderData: mydata })
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
})

module.exports = router;
