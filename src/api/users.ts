import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";
const returnCode = require('../library/returnCode');

const router = express.Router();

import User from "../models/User";

/**
 *  @route Post api/users
 *  @desc Register User
 *  @access Public
 *  @회원가입
 * 
 *  error
 *  1. 유저가 중복일 경우
 */
router.post(
  "/",
  [
    check("nickname", "Nickname is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: returnCode.BAD_REQUEST,
        errors: [{ msg: "요청바디가 없습니다." }],
      });
    }

    const { nickname, email, password } = req.body;

    try {
      // See if  user exists
      //  1. 유저가 중복일 경우
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({
          status: returnCode.BAD_REQUEST,
          errors: [{ msg: "User already exists" }],
        });
      }

      user = new User({
        nickname,
        email,
        password,
      });

      // Encrpyt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

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
            msg: "회원가입에 성공했습니다.",
            data : {
              email,
              nickname
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

module.exports = router;
