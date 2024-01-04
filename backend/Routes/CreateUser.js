const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecret = "MynameisHarshDubeyisisisisisi#@$"
router.post("/createuser", [
  body('Email').isEmail(),
  body('name').isLength({ min: 3 }),
  body('Password', 'password should be minimum 5 length').isLength({ min: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.Password, salt)

    await User.create({
      name: req.body.name,
      Password: secPassword,
      Email: req.body.Email,
      location: req.body.location,
    });

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

router.post("/loginuser", [
  body('Email').isEmail(),
  body('Password', 'password should be minimum 5 length').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let Email = req.body.Email;
  try {
    let userData = await User.findOne({ Email });
    if (!userData) {
      return res.status(400).json({ errors: "incorrect email id" });
    }

    const pwdcompare = await bcrypt.compare(req.body.Password, userData.Password)

    if (!pwdcompare) {
      return res.status(400).json({ errors: "incorrect password" });
    }

    const data = {
      user: {
        id: userData.id
      }
    }

    const authToken = jwt.sign(data, jwtSecret)

    return res.json({ success: true, authToken: authToken });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});



module.exports = router;
