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

## Migration

```
npx prisma migrate dev
```

## Seed Data Dumy

```
npm run seed
```

## Run the app

```
npm run dev
```

## Deploy in Vercel

    Coming soon...

## Documentation in swagger

    Coming soon...

# ERD

![Tux, the Linux](/ERD.png)