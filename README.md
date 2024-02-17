# Backend interview system

Rest API ของระบบ Interview

## Quick Start

Clone Project ลงมาในเครื่อง

```sh
git clone git@github.com:jame3032002/backend-interview.git
```

ใช้คำสั่ง

```sh
docker-compose up
```

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

**Content example**

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
  "email": "user4@robinhood.co.th",
  "password": "Password1!"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "success": true,
  "user": {
    "_id": "65d07b072bb274bc40edc356",
    "email": "user4@robinhood.co.th",
    "name": "วันเดอร์วูแมน",
    "createdAt": "2024-02-17T09:23:19.874Z",
    "updatedAt": "2024-02-17T09:23:19.874Z",
    "__v": 0
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQwN2IwNzJiYjI3NGJjNDBlZGMzNTYiLCJlbWFpbCI6InVzZXI0QHJvYmluaG9vZC5jby50aCIsIm5hbWUiOiLguKfguLHguJnguYDguJTguK3guKPguYzguKfguLnguYHguKHguJkiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwODE2MzUxOCwiZXhwIjoxNzM5Njk5NTE4fQ.Rsj6OUIMLBsABlG2k4fZ-PHyNvg6A6HoT4pxaagq-2U"
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

### Interviews

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
> - limit จะมีค่า default เป็น 5

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

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
      "name": "โรบินฮู้ด"
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
      "name": "โรบินฮู้ด"
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
      "name": "โรบินฮู้ด"
    },
    {
      "_id": "65d064b99166d015d47dee93",
      "title": "นัดสัมภาษณ์งาน 4",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
      "status": "To Do",
      "createdBy": "65cfa19ad00dcd13b311fc4d",
      "isArchive": false,
      "createdAt": "2023-01-03T07:48:09.519Z",
      "updatedAt": "2023-01-03T07:48:09.519Z",
      "name": "แคทวูแมน"
    },
    {
      "_id": "65d064bc9166d015d47dee95",
      "title": "นัดสัมภาษณ์งาน 5",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed sed. Pulvinar neque laoreet suspendisse interdum consectetur libero. Ut lectus arcu bibendum at varius vel. Feugiat in ante metus dictum at tempor commodo ullamcorpera. Lacinia at quis risus sed. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Nulla aliquet enim tortor at auctor urna nunc.",
      "status": "To Do",
      "createdBy": "65cfa19ad00dcd13b311fc4d",
      "isArchive": false,
      "createdAt": "2023-02-17T13:00:12.789Z",
      "updatedAt": "2023-02-17T13:00:12.789Z",
      "name": "แคทวูแมน"
    }
  ],
  "info": {
    "totalResults": 8,
    "isNextPage": true,
    "currentPage": 1,
    "limit": 5
  }
}
```

> จากรูป UX/UI ก่อนหน้า ถ้าหากกดปุ่ม `See more` ให้เรียก API route เดิมนี้โดยจะต้องระบุ page ส่งมาด้วย เพื่อโหลด List ของ Interviews เพิ่มเติม เช่น http://localhost:2000/api/interviews?page=2

## Error Response

### Unauthorized

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

</details>
