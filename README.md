# HIPPER
<p align="center"><img src="https://user-images.githubusercontent.com/54926663/119240676-3a212b80-bb8c-11eb-9971-1e7325479fe5.png" alt="아이콘" width="40%" /></p>

[서버 파트 공유 노션](https://www.notion.so/90fa48cea985416b8aaec66ccb2d4f36)

## 서비스 이름

HIPPER
## 서비스 소개

힙-하! 당신의 HIP한 기억을 되돌려 드립니다.
## models
- models/User
```
import mongoose from "mongoose";
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
```
export interface IUser {
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
```
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
### [POST] 로그인
path: 54.180.153.139:5000/api/auth
- 요청 헤더

  ```Content-Type: application/json```

- 요청 바디

  | Key        | 타입   | 설명     |
  | ---------- | ------ | -------- |
  | `email`    | String | 이메일   |
  | `password` | String | 비밀번호 |

- 응답 바디
  | Key     | 타입   | 설명                      |
  | ------- | ------ | ------------------------- |
  | `email` | String | 이메일                    |
  | `token` | String | 로그인 정보 들어있는 토큰 |
- 성공
```
{
    "status": 200,
    "msg": "로그인 성공.",
    "data": {
        "email": "test16@naver.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhOTJkZTc1MmFiNTM2NGE4YTI2M2M2In0sImlhdCI6MTYyMTcwMDE2MiwiZXhwIjoxNjIxNzM2MTYyfQ.eB4ouEmRnwQ835uKK3S44wb7wvqYYcR7_xS2ndMrkjo"
    }
}	
```
- 실패: 요청바디 없음
```
{
    "status": 400,
    "errors": [
        {
            "msg": "요청바디가 없습니다."
        }
    ]
}
```
- invalid email
```
{
    "status": 400,
    "errors": [
        {
            "msg": "Invalid Credentials."
        }
    ]
}
```
- invalid password
```
{
    "status": 400,
    "errors": [
        {
            "msg"": ""Invalid Credentials."
        }
    ]
}
```
- 서버 오류
```
{
    "status": 500,
    "errors": [
        {
            "msg": "server error"
        }
    ]
}
```
### 회원가입
path: 54.180.153.139:5000/api/users
- 요청 헤더

  ```Content-Type: application/json```

- 요청 바디

  | Key        | 타입   | 설명     |
  | ---------- | ------ | -------- |
  | `email`    | String | 이메일   |
  | `password` | String | 비밀번호 |
  | `nickname` | String | 닉네임   |

- 응답 바디

  | Key        | 타입   | 설명   |
  | ---------- | ------ | ------ |
  | `email`    | String | 이메일 |
  | `nickname` | String | 닉네임 |


- 성공
```
{
    "status": 200,
    "msg": "회원가입에 성공했습니다.",
    "data": {
        "email": "test16@naver.com",
        "nickname": "test16"
    }
}
```
- 중복된 아이디 존재
```
{
    "status": 400,
    "errors": [
        {
            "msg": "User already exists"
        }
    ]
}
```
- 빈 바디 post
```
{
    "status": 400,
    "errors": [
        {
            "msg": ""요청바디가 없습니다."
        }
    ]
}
```
- 서버 오류
```
{
    "status": 500,
    "errors": [
        {
            "msg": "server error"
        }
    ]
}
```
### 운동
path: 54.180.153.139:5000/api/exercise
- 요청 헤더

  ```Content-Type: application/json```

- 요청바디

- 응답 바디

  | Key             | 타입   | 설명      |
  | --------------- | ------ | --------- |
  | `exercise_idx`  | Number | 인덱스    |
  | `exercise_name` | String | 운동 종목 |
  | `exercise_cnt`  | String | 운동 횟수 |
- 성공
```
{
    "status": 200,
    "data": [
        15,
        "런지",
        "10개"
    ]
}
```
- 서버 오류

```
{
    "status": 500,
    "errors": [
        {
            "msg": "server error"
        }
    ]
}
```
- 값 불러오기 실패
```
{
    "status": 400,
    "errors": [
        {
            "msg": "값을 불러오지 못했습니다."
        }
    ]
}
```

## View
![view](https://user-images.githubusercontent.com/54926663/119240911-0e9f4080-bb8e-11eb-94d8-e36617913800.JPG)
