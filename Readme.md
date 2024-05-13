# Hotel Booking App Backend

This is a backend project for the hotel booking app. Designed and implemented RESTful endpoints for user authentication, managing rooms, booking rooms, checking in, checking out, and cancelling bookings.

---

## Features

- [x] User can register and login
- [x] Authentication using JWT
- [x] Implemented mongoose transaction for data consistency
- [x] User can book or cancel a hotel room and get notified via email
- [x] Used Docker for containerization

---

## Technologies

- [x] TypeScript
- [x] Express.js
- [x] MongoDB
- [x] Mongoose
- [x] JWT
- [x] Bcrypt
- [x] Nodemailer
- [x] Zod
- [x] Docker

---

## How to run the project

- [x] Clone the repository
- [x] Run `npm install` to install dependencies
- [x] Create a `.env` file and add the following environment variables:
  - `PORT`
  - `DATABASE_URL`
  - `APP_NAME`
  - `SALT_ROUNDS`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN`
  - `EMAIL_USER`
  - `EMAIL_PASSWORD`
  - `EMAIL_HOST`

- [x] Run `npm run dev` to start the development server
- [x] Run `npm run build` to build the project

### For Docker

- [x] Run `docker compose up` to start the application
- [x] Your application will be available at http://localhost:5000

---

## API Documentation

- [x] [Swagger](http://localhost:5000/api-docs/)