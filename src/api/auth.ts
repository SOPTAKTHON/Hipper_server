import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";
const returnCode = require('../library/returnCode');

const router = express.Router();

import auth from "../middleware/auth";
import User from "../models/User";

/**
 *  @route Post api/auth
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 *  @로그인
 * 
 * // 1. 적합하지 않은 email
 * // 2. 적합하지 않은 password
 */
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: returnCode.BAD_REQUEST,
        errors: [{ msg: "요청바디가 없습니다." }],
      });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      // 1. 적합하지 않은 email
      if (!user) {
        res.status(400).json({
          status: returnCode.BAD_REQUEST,
          errors: [{ msg: "Invalid Credentials." }],
        });
      }
      // 2. 적합하지 않은 password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({
          status: returnCode.BAD_REQUEST,
          errors: [{ msg: "Invalid Credentials." }],
        });
      }
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            status: returnCode.OK,
            msg: "로그인 성공.",
            data: {
              email,
              token
            }
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        status: returnCode.INTERNAL_SERVER_ERROR,
        errors: [{ msg: "server error" }],
      });
    }
  }
);

/*
 *  @route GET api/auth
 *  @desc Test Route
 *  @access Public
 */
router.get("/", auth, async function (req: Request, res: Response) {
  try {
    const user = await User.findById(req.body.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Err");
  }
});

module.exports = router;
