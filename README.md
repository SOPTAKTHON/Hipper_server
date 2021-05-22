# HIPPER

## 서비스 이름

HIPPER
## 서비스 소개

힙-하! 당신의 HIP한 기억을 되돌려 드립니다.
## models
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
## API 명세서
### 로그인
path: /api/auth
- 성공
```
"{
    ""status"": 200,
    ""msg"": ""로그인 성공."",
    ""data"": {
        ""email"": ""test16@naver.com"",
        ""token"": ""eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhOTJkZTc1MmFiNTM2NGE4YTI2M2M2In0sImlhdCI6MTYyMTcwMDE2MiwiZXhwIjoxNjIxNzM2MTYyfQ.eB4ouEmRnwQ835uKK3S44wb7wvqYYcR7_xS2ndMrkjo""
    }
}"	
```
- 실패: 요청바디 없음
```
"{
    ""status"": 400,
    ""errors"": [
        {
            ""msg"": ""요청바디가 없습니다.""
        }
    ]
}"
```
- invalid email
```
"{
    ""status"": 400,
    ""errors"": [
        {
            ""msg"": ""Invalid Credentials.""
        }
    ]
}"
```
- invalid password
```
"{
    ""status"": 400,
    ""errors"": [
        {
            ""msg"": ""Invalid Credentials.""
        }
    ]
}"
```
### 회원가입
path: api/users
- 성공
```
"{
    ""status"": 200,
    ""msg"": ""회원가입에 성공했습니다."",
    ""data"": {
        ""email"": ""test16@naver.com"",
        ""nickname"": ""test16""
    }
}"	
```
- 중복된 아이디 존재
```
"{
    ""status"": 400,
    ""errors"": [
        {
            ""msg"": ""User already exists""
        }
    ]
}"
```
- 빈 바디 post
```
"{
    ""status"": 400,
    ""errors"": [
        {
            ""msg"": ""요청바디가 없습니다.""
        }
    ]
}"
```
- 서버 오류
```
"{
    ""status"": 500,
    ""errors"": [
        {
            ""msg"": ""server error""
        }
    ]
}"	
```
### 운동
path: exercise
- 성공
```
"{
    ""status"": 200,
    ""data"": [
        15,
        ""런지"",
        ""10개""
    ]
}"	
```
- 서버 오류

```
"{
    ""status"": 500,
    ""errors"": [
        {
            ""msg"": ""server error""
        }
    ]
}"
```
- 값 불러오기 실패
```
"{
    ""status"": 400,
    ""errors"": [
        {
            ""msg"": ""값을 불러오지 못했습니다.""
        }
    ]
}"
```
