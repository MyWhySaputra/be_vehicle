# REST API Vehicle Management

This API provides functionalities to manage vehicle data including brands, types, models, and pricelists. It supports operations such as creating, reading, updating, and deleting vehicle information. The API also includes authentication and authorization mechanisms to ensure secure access to resources.

## Install

```
npm install
```

## .env

```
PORT=
BASE_URL=""
SALT_ROUND=
SECRET_KEY=""
SECRET_KEY_RP=""
EMAIL_SMTP=""
PASS_SMTP=""
DATABASE_URL=""
```

## Push Database

```
npx prisma db push
```

## Seed Data Dumy

```
npm run seed
```

## Run the app

```
npm run dev
```

## Admin & User Account

```
email : admin@gmail.com
```
```
password : admin12345
```
```
email : user@gmail.com
```
```
password : admin12345
```

## Deploy in Vercel

    https://be-vehicle.vercel.app/

## Documentation in swagger

    https://be-vehicle.vercel.app/docs

# ERD

![Tux, the Linux](/ERD.png)