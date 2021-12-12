const express = require("express");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createAccount = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        ok: false,
        msg: "An account is registered with this email:" + email,
      });
    }

    user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JSON Web Token
    const token = await generateJWT(user.id, user.name);

    // Manejo de errores
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(400).json({
        ok: false,
        errors: error.mapped(),
      });
    }

    res.status(201).json({
      ok: true,
      action: "new account",
      uid: user.id,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Contact to the admin",
    });
  }
};

const loginAccount = async(req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User or password incorrect",
      });
    }

    // Confirm password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "User or password incorrect",
      });
    }

    // Generate JSON Web Token
    const token = await generateJWT(user.id, user.name);

    return res.status(200).json({
      ok: true,
      uuid: user.id,
      name: user.name,
      token,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      action: "Contact the admin",
    });
  }
};

const revalidateToken = async(req, res) => {
  const { uid, name } = req;

  // Generate token 
  let newToken =  await generateJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token: newToken
  });
};

module.exports = {
  createAccount,
  loginAccount,
  revalidateToken,
};
