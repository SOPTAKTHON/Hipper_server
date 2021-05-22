import mongoose from "mongoose";
import { IExercise } from "../interfaces/IExercise";


const ExerciseSchema = new mongoose.Schema({
    exercise_idx: {
        type: Number,
        required: true,
        unique: true,
    },  
    exercise_name: {
        type: String,
        required: true,
    },
    exercise_cnt: {
     type: String,
        required: true,
    },
});

export default mongoose.model<IExercise & mongoose.Document>("Exercise", ExerciseSchema);
