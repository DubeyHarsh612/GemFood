const express = require("express");
const router = express.Router();

router.post('/foodData', async (req, res) => {
  try {
    res.status(200).send([global.food_items, global.food_categories]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
