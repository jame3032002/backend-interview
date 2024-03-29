# Backend interview system

Rest API ของระบบ Interview

## Quick Start

Clone Project ลงมาในเครื่อง

```sh
git clone git@github.com:jame3032002/backend-interview.git
```

cd ไปที่ Project

```sh
cd ./backend-interview
```

ใช้คำสั่ง

```sh
docker-compose up
```

## Manual Start

Clone Project ลงมาในเครื่อง

```sh
git clone git@github.com:jame3032002/backend-interview.git
```

cd ไปที่ Project

```sh
cd ./backend-interview
```

<details>
  <summary>สร้าง docker network</summary>

## Create docker network

ขั้นแรกให้สร้าง Network ชื่อ `interview-network`

```sh
docker network create interview-network
```

</details>

<details>
  <summary>การ Run database แบบ Manual (ใช้ Docker)</summary>

## Database

### Build docker image

```sh
docker build -t [ชื่อ docker image ที่ต้องการสร้าง] -f ./database/Dockerfile ./database
```

เช่น

```sh
docker build -t interview-db -f ./database/Dockerfile ./database
```

### Run docker image

```sh
docker run -p 27017:27017 --network=[ชื่อ network ที่เราสร้างก่อนหน้า] --name=[ชื่อ container] -e MONGO_INITDB_DATABASE=[ชื่อ database ที่ต้องการ] [ชื่อ docker image ที่สร้างในขั้นตอนก่อนหน้า]
```

เช่น

```sh
docker run -p 27017:27017 --network=interview-network --name=database -e MONGO_INITDB_DATABASE=robinhood interview-db
```

> หากต้องการให้ Run เป็น background ให้ใส่ tag `-d` เพิ่มเข้าไป เช่น

```sh
docker run -p 27017:27017 --network=interview-network --name=database -d -e MONGO_INITDB_DATABASE=robinhood interview-db
```

</details>

<details>
  <summary>การ Run backend แบบ Manual (ใช้ Docker)</summary>

## Backend

### Build Docker Image

```sh
docker build -t interview-backend -f ./backend/Dockerfile ./backend
```

### Run Docker Image

```sh
docker run -p 2000:2000 --network=interview-network -e MONGO_SERVER=mongodb://[ชื่อ container ของ database]:27017/robinhood -e ACCESS_TOKEN_SECRET_KEY=[SECRET_KEY ที่ต้องการ] -e TZ=Asia/Bangkok interview-backend
```

เช่น

```sh
docker run -p 2000:2000 --network=interview-network -e MONGO_SERVER=mongodb://database:27017/robinhood -e ACCESS_TOKEN_SECRET_KEY=ACCESS_TOKEN_SECRET_KEY -e TZ=Asia/Bangkok interview-backend
```

</details>

## Base endpoint

The base endpoint http://localhost:2000 สามารถใช้เข้าถึง API endpoints ต่างๆ ตาม documents ด้านล่าง

## Open Endpoints

Route ที่เข้าได้โดยไม่ต้อง Authentication

<details>
  <summary>Register - ลงทะเบียนเป็น user</summary>

## Register

สำหรับลงทะเบียนเป็น user เพื่อใช้งานระบบ

**URL** : `/api/users`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
  "name": "ข้อมูลเป็น String",
  "email": "ต้องถูก Format ของ email address",
  "password": "ต้องมากกว่า 8 ตัวอักษรและประกอบไปด้วย ตัวเล็ก ตัวใหญ่ ตัวเลข และอักขระพิเศษ"
}
```

**Data example**

```json
{
  "name": "วันเดอร์วูแมน",
  "email": "user4@robinhood.co.th",
  "password": "Password1!"
}
```

## Success Response

**Code** : `201 Created`

**Content** :

```json
{
  "success": true,
  "user": {
    "email": "user4@robinhood.co.th",
    "name": "วันเดอร์วูแมน",
    "_id": "65d07b072bb274bc40edc356",
    "createdAt": "2024-02-17T09:23:19.874Z",
    "updatedAt": "2024-02-17T09:23:19.874Z",
    "__v": 0
  }
}
```

## Error Response

### Invalid parameters

**Condition** : ถ้าไม่ได้ส่ง `name` หรือ `email` หรือ `password` ไป

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid parameters"
}
```

<hr />

### Invalid email format

**Condition** : ถ้า `email` ผิด format

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid email format"
}
```

<hr />

### Invalid password format

**Condition** : ถ้า `password` ไม่ได้ประกอบไปด้วย ตัวอักษรเล็ก ตัวอักษรใหญ่ ตัวเลข และอักขระพิเศษ หรือน้อยกว่า 8 ตัวอักษร

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Password must contain uppercase, lowercase, integer, special character and more than 8 characters"
}
```

<hr />

### Email already exists

**Condition** : ถ้า `email` ที่ส่งมามีอยู่แล้วในระบบ

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "This email has already exists"
}
```

</details>

<details>
  <summary>Login - เข้าสู่ระบบ</summary>

## Login

สำหรับ Login ใช้งานระบบ

**URL** : `/api/users/login`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
  "email": "ต้องถูก Format ของ email address",
  "password": "เป็น String"
}
```

**Data example**

```json
{
  "email": "user1@robinhood.co.th",
  "password": "Password1!"
}
```

## Success Response

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "user": {
    "_id": "65cfa17ad00dcd13b311fc47",
    "email": "user1@robinhood.co.th",
    "name": "โรบินฮู้ด",
    "createdAt": "2022-12-31T17:00:00.000Z",
    "updatedAt": "2022-12-31T17:00:00.000Z",
    "__v": 0
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNmYTE3YWQwMGRjZDEzYjMxMWZjNDciLCJlbWFpbCI6InVzZXIxQHJvYmluaG9vZC5jby50aCIsIm5hbWUiOiLguYLguKPguJrguLTguJnguK7guLnguYnguJQiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwODIyODg2MSwiZXhwIjoxNzM5NzY0ODYxfQ.vZz_hJ5NjSF7Dr3LZrktewqCxMzJGGdQr-4sVS0Dt2o"
}
```

## Error Response

### Invalid parameters

**Condition** : ถ้าไม่ได้ส่ง `email` หรือ `password` ไป

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid parameters"
}
```

<hr />

### Invalid email or password

**Condition** : ถ้าหาก `email` หรือ `password` ไม่ถูกต้อง

**Code** : `401 Unauthorized`

**Content** :

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

</details>

## Endpoints that require Authentication

การ Authentication สามารถทำได้โดยเมื่อ Login เรียบร้อยแล้วให้เอา accessToken ที่ได้จาก response ของการ Login แนบมาใน header `Authorization` จะเป็น `Bearer [Token ที่ได้จากการ Login]` เช่น

```sh
curl --location --request GET 'http://localhost:2000/api/interviews?page=1&limit=3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWNmYTE4NmQwMGRjZDEzYjMxMWZjNGEiLCJlbWFpbCI6InVzZXIyQHJvYmluaG9vZC5jby50aCIsIm5hbWUiOiLguYHguJrguJfguYHguKHguJkiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwODE1Njc3MiwiZXhwIjoxNzA4MTU3NjcyfQ.pwwwt7GwnY1BI70xLqzcqSEoscbDxszdXvIrCjy-WiE'
```

> หากใน doc ระบุว่า **Auth required** : **YES** จะต้องแนบ header `Authorization` มาด้วยเสมอ จึงจะใช้งาน route นั้นๆ ได้

### Error Response

#### Unauthorized

**Condition** : ถ้าหากไม่ได้แนบ Header `Authorization` มาด้วย

**Code** : `401 Unauthorized`

**Content** :

```json
{
  "error": true,
  "message": "Access token is required"
}
```

<hr />

### Forbidden

**Condition** : ถ้าหาก Header `Authorization` ที่ส่งมาไม่ถูกต้อง

**Code** : `403 Forbidden`

**Content** :

```json
{
  "error": true,
  "message": "Invalid access token"
}
```

### Interviews

<details>
  <summary>Add Interview - เพิ่มข้อมูล interview</summary>

## Add Interview

เป็น Route เพิ่มข้อมูล interview

**URL** : `/api/interviews`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
  "title": "ข้อมูลเป็น String",
  "description": "ข้อมูลเป็น String",
  "status": "ข้อมูลเป็น String เป็นได้แค่ 'To Do', 'In Progress', 'Done'"
}
```

> `status` ถ้าหาก status ไม่ได้ส่งไป ค่าเริ่มต้นจะเป็น `To Do`

**Data example**

```json
{
  "title": "นัดสัมภาษณ์งาน 1",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
  "status": "To Do"
}
```

# Success Response

**Code** : `201 Created`

**Content** :

```json
{
  "success": true,
  "interview": {
    "title": "นัดสัมภาษณ์งาน 1",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    "status": "To Do",
    "createdBy": "65cfa17ad00dcd13b311fc47",
    "isArchive": false,
    "_id": "65d1823db1bb47c4f3c4bd5c",
    "edited": [],
    "createdAt": "2024-02-18T04:06:21.749Z",
    "updatedAt": "2024-02-18T04:06:21.749Z",
    "__v": 0,
    "name": "โรบินฮู้ด",
    "email": "user1@robinhood.co.th"
  }
}
```

## Error Response

### Invalid title or description

**Condition** : ถ้าไม่ได้ส่ง `title` หรือ `description` ไป

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid title or description"
}
```

### Invalid status

**Condition** : ถ้าหากส่ง `status` เป็นค่าที่ไม่ใช่ `To Do`, `In Progress`, `Done`

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid status"
}
```

</details>

<details>
  <summary>Get Interviews - ดึงข้อมูล Interviews</summary>

## Get Interviews

เป็น Route สำหรับดึงข้อมูลมาทำ List ของ Card ที่แสดงข้อมูล Interview ดังรูปด้านล่าง

![UX/UI List ของ Card ที่แสดงข้อมูล Interview](https://github.com/jame3032002/backend-interview/assets/8217160/860d2a00-634c-4bf7-9dd1-b5b5219d1f14)

**URL** : `/api/interviews`

**Method** : `GET`

> สามารถระบุ query เพิ่มเติมได้ 2 ค่าคือ `limit` และ `page`
>
> - page จะมีค่า default เป็น 1
> - limit จะมีค่า default เป็น 3

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "interviews": [
    {
      "_id": "65d061949166d015d47dee80",
      "title": "นัดสัมภาษณ์งาน 1",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
      "status": "To Do",
      "createdBy": "65cfa17ad00dcd13b311fc47",
      "isArchive": false,
      "createdAt": "2023-01-01T03:00:00.696Z",
      "updatedAt": "2023-01-01T04:00:00.696Z",
      "name": "โรบินฮู้ด",
      "email": "user1@robinhood.co.th"
    },
    {
      "_id": "65d061979166d015d47dee82",
      "title": "นัดสัมภาษณ์งาน 2",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
      "status": "To Do",
      "createdBy": "65cfa17ad00dcd13b311fc47",
      "isArchive": false,
      "createdAt": "2023-01-01T08:00:00.816Z",
      "updatedAt": "2023-01-01T08:00:00.816Z",
      "name": "โรบินฮู้ด",
      "email": "user1@robinhood.co.th"
    },
    {
      "_id": "65d0619b9166d015d47dee84",
      "title": "นัดสัมภาษณ์งาน 3",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
      "status": "To Do",
      "createdBy": "65cfa17ad00dcd13b311fc47",
      "isArchive": false,
      "createdAt": "2023-01-02T03:00:00.553Z",
      "updatedAt": "2023-01-02T03:00:00.553Z",
      "name": "โรบินฮู้ด",
      "email": "user1@robinhood.co.th"
    }
  ],
  "info": {
    "totalResults": 8,
    "isNextPage": true,
    "currentPage": 1,
    "limit": 3
  }
}
```

> จากรูป UX/UI ก่อนหน้า ถ้าหากกดปุ่ม `See more` ให้เรียก API route เดิมนี้โดยจะต้องระบุ page ส่งมาด้วย เพื่อโหลด List ของ Interviews เพิ่มเติม เช่น http://localhost:2000/api/interviews?page=2

</details>

<details>
  <summary>Get Interview By Id - ดึงข้อมูล Interviews ด้วย id</summary>

## Get Interview By Id

เป็น Route สำหรับดึงข้อมูล Interview ด้วย Id ใช้สำหรับดึงข้อมูลเพื่อดูข้อมูล Interview หรือดึงข้อมูลเพื่อจะแก้ไขข้อมูลของ Interview ใช้กับ UX/UI ในส่วนการคลิกที่ Card เพื่อดู detail ดังรูปด้านล่างนี้

![UX/UI เมื่อกดที่ Card เพื่อดู detail](https://github.com/jame3032002/backend-interview/assets/8217160/571cc064-9d04-41f7-96cf-d68ea166128d)

**URL** : `/api/interviews/:interviewId`

**Method** : `GET`

> สามารถระบุ query เพิ่มเติมได้ คือ `include=comments`
> ถ้าหากระบุจะมี comments แสดงขึ้นมาด้วย

**Auth required** : YES

## Success Response (?include=comments)

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "interview": {
    "_id": "65d061949166d015d47dee80",
    "title": "นัดสัมภาษณ์งาน 1",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    "status": "To Do",
    "createdBy": "65cfa17ad00dcd13b311fc47",
    "isArchive": false,
    "edited": [
      {
        "title": "นัดสัมภาษณ์งาน 1-1",
        "description": "1-1-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        "status": "To Do",
        "createdAt": "2023-01-01T03:10:00.696Z",
        "_id": "65d067709e8c3fb440e39d2c"
      },
      {
        "title": "นัดสัมภาษณ์งาน 1-2",
        "description": "1-2-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        "status": "Done",
        "createdAt": "2023-01-01T03:12:00.696Z",
        "_id": "65d0677a9e8c3fb440e39d30"
      },
      {
        "title": "นัดสัมภาษณ์งาน 1-3",
        "description": "1-3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        "status": "Done",
        "createdAt": "2023-01-01T03:20:00.696Z",
        "_id": "65d0677f9e8c3fb440e39d35"
      }
    ],
    "createdAt": "2023-01-01T03:00:00.696Z",
    "updatedAt": "2023-01-01T04:00:00.696Z",
    "name": "โรบินฮู้ด",
    "email": "user1@robinhood.co.th"
  },
  "comments": [
    {
      "_id": "65d062a99166d015d47dee8f",
      "interviewId": "65d061949166d015d47dee80",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "createdBy": "65cfa186d00dcd13b311fc4a",
      "createdAt": "2023-01-02T11:00:00.161Z",
      "name": "แบทแมน",
      "email": "user2@robinhood.co.th"
    },
    {
      "_id": "65d062a19166d015d47dee8c",
      "interviewId": "65d061949166d015d47dee80",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "createdBy": "65cfa19ad00dcd13b311fc4d",
      "createdAt": "2023-01-01T11:00:00.363Z",
      "name": "แคทวูแมน",
      "email": "user3@robinhood.co.th"
    },
    {
      "_id": "65d062469166d015d47dee88",
      "interviewId": "65d061949166d015d47dee80",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "createdBy": "65cfa186d00dcd13b311fc4a",
      "createdAt": "2023-01-01T08:00:00.492Z",
      "name": "แบทแมน",
      "email": "user2@robinhood.co.th"
    }
  ]
}
```

## Success Response (กรณีไม่ได้ระบุ query เพิ่มเติม)

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "interview": {
    "_id": "65d061949166d015d47dee80",
    "title": "นัดสัมภาษณ์งาน 1",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    "status": "To Do",
    "createdBy": "65cfa17ad00dcd13b311fc47",
    "isArchive": false,
    "edited": [
      {
        "title": "นัดสัมภาษณ์งาน 1-1",
        "description": "1-1-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        "status": "To Do",
        "createdAt": "2023-01-01T03:10:00.696Z",
        "_id": "65d067709e8c3fb440e39d2c"
      },
      {
        "title": "นัดสัมภาษณ์งาน 1-2",
        "description": "1-2-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        "status": "Done",
        "createdAt": "2023-01-01T03:12:00.696Z",
        "_id": "65d0677a9e8c3fb440e39d30"
      },
      {
        "title": "นัดสัมภาษณ์งาน 1-3",
        "description": "1-3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        "status": "Done",
        "createdAt": "2023-01-01T03:20:00.696Z",
        "_id": "65d0677f9e8c3fb440e39d35"
      }
    ],
    "createdAt": "2023-01-01T03:00:00.696Z",
    "updatedAt": "2023-01-01T04:00:00.696Z",
    "name": "โรบินฮู้ด",
    "email": "user1@robinhood.co.th"
  }
}
```

> **เพิ่มเติม** ในการ GET interview by id จะมีข้อมูล Edited ติดมาด้วย ซึ่งจะเอาไปใช้กับส่วนที่กดดูประวัติการแก้ไข

</details>

<details>
  <summary>Update interview - แก้ไขข้อมูล interview (title, description, status)</summary>

## Update interview

เป็น Route ที่เรียกเมื่อต้องการแก้ไข interview

**URL** : `/api/interviews/:interviewId`

**Method** : `PATCH`

**Auth required** : YES

**Data constraints**

```json
{
  "title": "ข้อมูลเป็น String",
  "description": "ข้อมูลเป็น String",
  "status": "ข้อมูลเป็น String เป็นได้แค่ 'To Do', 'In Progress', 'Done'"
}
```

> ไม่จำเป็นต้องส่งมาทุก field ถ้าหากค่าไหนที่ไม่ได้ส่งมา ค่านั้นจะไม่ถูกอัพเดท

**Data example**

```json
{
  "title": "นัดสัมภาษณ์งาน latest",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
  "status": "Done"
}
```

## Success Response

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "interview": {
    "_id": "65d0619b9166d015d47dee84",
    "title": "นัดสัมภาษณ์งาน latest",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    "status": "Done",
    "createdBy": "65cfa17ad00dcd13b311fc47",
    "isArchive": false,
    "edited": [
      {
        "title": "นัดสัมภาษณ์งาน 3",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        "status": "To Do",
        "createdAt": "2024-02-18T05:35:39.165Z",
        "_id": "65d1972b5c0d4112dd47b034"
      }
    ],
    "createdAt": "2023-01-02T03:00:00.553Z",
    "updatedAt": "2024-02-18T05:35:39.167Z",
    "__v": 0,
    "name": "โรบินฮู้ด",
    "email": "user1@robinhood.co.th"
  }
}
```

## Error Response

### Invalid parameters

**Condition** : ถ้าไม่ได้ส่ง `title` หรือ `description` หรือ `status` ไป

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid parameters"
}
```

<hr />

### Invalid interviewId

**Condition** : ถ้าหาก `interviewId` ที่ส่งมาไม่ตรงกับใน Database

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid interviewId"
}
```

<hr />

### Invalid status

**Condition** : ถ้าหาก `status` ที่ส่งมาค่าไม่ใช่ `To Do` หรือ `In Progress` หรือ `Done`

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid status"
}
```

<hr />

</details>

<details>
  <summary>Archive interview - เก็บข้อมูล interview</summary>

## Archive interview

เป็น Route ที่เรียกเมื่อกดที่ปุ่ม "จัดเก็บ" ดังรูปด้านล่าง

![UX/UI ปุ่มที่จัดเก็บ](https://github.com/jame3032002/backend-interview/assets/8217160/124feeb7-b3d4-4816-a284-f9e70fab3548)

**URL** : `/api/interviews/:interviewId/archive`

**Method** : `PATCH`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "interview": {
    "_id": "65d061949166d015d47dee80",
    "title": "นัดสัมภาษณ์งาน 1",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
    "status": "To Do",
    "createdBy": "65cfa17ad00dcd13b311fc47",
    "isArchive": true,
    "edited": [
      {
        "title": "นัดสัมภาษณ์งาน 1-1",
        "description": "1-1-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        "status": "To Do",
        "createdAt": "2023-01-01T03:10:00.696Z",
        "_id": "65d067709e8c3fb440e39d2c"
      },
      {
        "title": "นัดสัมภาษณ์งาน 1-2",
        "description": "1-2-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        "status": "Done",
        "createdAt": "2023-01-01T03:12:00.696Z",
        "_id": "65d0677a9e8c3fb440e39d30"
      },
      {
        "title": "นัดสัมภาษณ์งาน 1-3",
        "description": "1-3-Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
        "status": "Done",
        "createdAt": "2023-01-01T03:20:00.696Z",
        "_id": "65d0677f9e8c3fb440e39d35"
      }
    ],
    "createdAt": "2023-01-01T03:00:00.696Z",
    "updatedAt": "2024-02-18T05:27:50.165Z",
    "__v": 0,
    "name": "โรบินฮู้ด",
    "email": "user1@robinhood.co.th"
  }
}
```

> ระบบจะอัพเดท field ชื่อ `isArchive` ให้มีค่าเป็น **true**
>
> ซึ่งในส่วน `GET interviews` ปกติแล้วจะดึงเฉพาะค่า `isArchive` ที่เป็น **false** ไปแสดง

## Error Response

### Invalid interviewId

**Condition** : ถ้าหาก `interviewId` ที่ส่งมาไม่ถูกต้อง

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid interviewId"
}
```

</details>

<details>
  <summary>Add comment in interview - แสดงความคิดเห็นใน interview</summary>

## Add comment into interview

เป็น Route สำหรับเพิ่มความคิดเห็นใน interview ดัง UX/UI ด้านล่าง

![UX/UI ส่วนที่แสดงความคิดเห็น](https://github.com/jame3032002/backend-interview/assets/8217160/da21b4b5-f1b1-4af2-8710-5f36cf31f3cd)

**URL** : `/api/interviews/:interviewId/comments`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
  "comment": "ข้อมูลเป็น String"
}
```

**Data example**

```json
{
  "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
```

## Success Response

**Code** : `201 Created`

**Content** :

```json
{
  "success": true,
  "comment": {
    "interviewId": "65d061949166d015d47dee80",
    "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "createdBy": "65d07b072bb274bc40edc356",
    "_id": "65d0f6e467b048161e74dd6d",
    "createdAt": "2024-02-17T18:11:48.217Z",
    "updatedAt": "2024-02-17T18:11:48.217Z",
    "__v": 0
  }
}
```

## Error Response

### Invalid parameters

**Condition** : ถ้าหาก `comment` ไม่ได้ส่งมา

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid parameters"
}
```

### Invalid interviewId

**Condition** : ถ้าหาก `interviewId` ไม่ถูกต้อง

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid interviewId"
}
```

</details>

### Comments

<details>
  <summary>Update comment - แก้ไขความคิดเห็นใน interview</summary>

## Update comment

เป็น Route สำหรับอัพเดทความคิดเห็นของ user นั้นๆ ที่แสดง

**URL** : `/api/comments/:commentId`

**Method** : `PATCH`

**Auth required** : YES

**Data constraints**

```json
{
  "comment": "ข้อมูลเป็น String"
}
```

**Data example**

```json
{
  "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
```

## Success Response

**Code** : `200 OK`

**Content** :

```json
{
  "success": true,
  "comment": {
    "_id": "65d062469166d015d47dee88",
    "interviewId": "65d061949166d015d47dee80",
    "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "createdBy": "65cfa186d00dcd13b311fc4a",
    "createdAt": "2024-02-17T07:37:42.492Z",
    "updatedAt": "2024-02-17T18:51:50.821Z",
    "__v": 0
  }
}
```

## Error Response

### Invalid parameters

**Condition** : ถ้าหาก `comment` ไม่ได้ส่งมา

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid parameters"
}
```

<hr />

### Invalid commentId

**Condition** : ถ้าหาก `commentId` ไม่มีใน database

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid commentId"
}
```

<hr />

### Forbidden

**Condition** : ถ้าหากเราไม่ได้เป็นคนสร้างความคิดเห็นนั้น แล้วไปแก้ไขความคิดเห็น

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
  "error": true,
  "message": "You don't have permission"
}
```

</details>

<details>
  <summary>Delete comment - ลบความคิดเห็นใน interview</summary>

## Delete comment

เป็น Route สำหรับลบความคิดเห็นของ user นั้นๆ

**URL** : `/api/comments/:commentId`

**Method** : `DELETE`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content** :

```json
{
  "success": true
}
```

## Error Response

### Invalid commentId

**Condition** : ถ้าหาก `commentId` ไม่มีใน database

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "error": true,
  "message": "Invalid commentId"
}
```

<hr />

### Forbidden

**Condition** : ถ้าหากเราไม่ได้เป็นคนสร้างความคิดเห็นนั้น แล้วไปแก้ไขความคิดเห็น

**Code** : `403 FORBIDDEN`

**Content** :

```json
{
  "error": true,
  "message": "You don't have permission"
}
```

</details>

> **เพิ่มเติม** ถ้าหาก Error อื่น ๆ นอกจากที่กล่าวข้างต้นจะแสดงดัง Error Response ด้านล่างครับ

## Error Response

### Too many requests

**Condition** : ถ้าหากส่ง Request มากเกิน rate limit ที่กำหนด

> **Rate limit** สามารถกำหนดได้จาก env โดยจะกำหนด 2 ค่าคือ
>
> - **RATE_LIMIT_TIME_RESET** -> คือเวลาที่ต้องการให้ Reset หน่วยเป็น นาที (หากไม่กำหนดค่าเริ่มต้นจะเป็น 1)
> - **RATE_LIMIT_REQUEST_PER_TIME_RESET** -> คือ จำนวน request ในหนึ่งหน่วยเวลา (หากไม่กำหนดค่าเริ่มต้นจะเป็น 20)
>
> ซึ่งหากไม่ได้กำหนด จะ request ได้ 20 ครั้งใน 1 นาที

**Code** : `429 TOO MANY REQUESTS`

**Content** :

```json
{
  "error": true,
  "message": "Too many requests from this IP, please try again later."
}
```

### Internal server error

**Condition** : Error อื่น ๆ ที่นอกเหนือการควบคุม

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
{
  "error": true,
  "message": "Internal server error"
}
```
