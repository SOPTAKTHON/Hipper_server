# HIPPER

## 1차 제출 자료

### 서비스 이름

HIPPER
### 서비스 소개

하-힙! 당신의 엉덩이 근육은 안녕하십니까? 엉덩이 기억상실증에 걸린 당신! 저희가 기억을 돌려드립니다!
### models
- Users
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

- exercise
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
### API 명세서
