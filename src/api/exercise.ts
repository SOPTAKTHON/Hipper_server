import express, { Request, Response } from "express";
const returnCode = require('../library/returnCode');
 
const router = express.Router();

import Exercise from "../models/Exercise";

/**
 *  @route Post api/exercise
 *  @desc Register Exercise
 *  @access Public
 *  @운동
 * 
 *  
 */
 router.get("/", async (req: Request, res: Response) => {
    try {
        const randomNum = Math.random() * 60;
        const randomNumFloor = Math.floor(randomNum);
        const exercise = await Exercise.findOne({"exercise_idx":{$eq:randomNumFloor}});


        if (!exercise) {
            res.status(400).json({
                status: returnCode.BAD_REQUEST,
                errors: [{ msg: "값을 불러오지 못했습니다." }],
            });
        }

        res.status(200).json({
            status: returnCode.OK,
            data: {
                exercise,
              }
          });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            errors: [{ msg: "server error" }],
         });
    }
  });
module.exports = router;
