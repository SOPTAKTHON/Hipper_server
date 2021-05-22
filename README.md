# HIPPER

## 1차 제출 자료

### 서비스 이름

HIPPER
### 서비스 소개

힙-하! 당신의 HIP한 기억을 되돌려 드립니다.
### models
- models/User
```import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);
```

- interfaces/IUser
```export interface IUser {
  nickname: string;
  email: string;
  password: string;
}

export interface IUserInputDTO {
  nickname: string;
  email: string;
  password: string;
}
```
- models/Exercise
```import mongoose from "mongoose";
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
```
- interfaces/IExercise
```
export interface IExercise {
    exercise_idx: Number,
    exercise_name: string;
    exercise_cnt: string;
  }
  
  export interface IExerciseDTO {
    exercise_idx: Number,
    exercise_name: string;
    exercise_cnt: string;
  }
 ```
### API 명세서
