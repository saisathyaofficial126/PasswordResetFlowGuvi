# README - Password Reset, Login, Register, and Home APIs

This document provides an overview of the application for **Login**, **Registration**, and **Password Reset** functionalities, built using a **React**, **Bootstrap**, **Node.js**, and **MongoDB** stack. Below is an explanation of the APIs and the process for resetting a forgotten password.

## Technologies Used:
- **Frontend:** React.js, Bootstrap
- **Backend:** Node.js
- **Database:** MongoDB
- **Email Service:** Gmail (for sending password reset links)

---

## API Endpoints

### 1. **Login API**
- **Endpoint:** `POST https://password-reset-4t87.onrender.com/login`
- **Request Body:** 
    - `email`: The user's email address.
    - `password`: The user's password.
    - `confirmPassword`: A confirmation of the password.
- **Purpose:** Authenticates the user by email and password.
- **Responses:**
  - **200 OK:** User is successfully logged in.
  - **400 Bad Request:** Invalid credentials or mismatched passwords.

---

### 2. **Register API**
- **Endpoint:** `POST https://password-reset-4t87.onrender.com/register`
- **Request Body:**
    - `email`: The user's email address.
    - `password`: The user's chosen password.
- **Purpose:** Registers a new user by email and password.
- **Responses:**
  - **201 Created:** User successfully registered.
  - **400 Bad Request:** Email already exists.

---

### 3. **Password Reset Request API**
- **Endpoint:** `POST https://password-reset-4t87.onrender.com/request-password-reset`
- **Request Body:**
    - `email`: The email address of the user who needs a password reset.
- **Purpose:** Initiates the password reset process by sending a reset link to the user's email.
- **Responses:**
  - **200 OK:** A reset link is sent to the email if the user exists.
  - **404 Not Found:** If the email is not registered.

---

### 4. **Password Reset API**
- **Endpoint:** `POST https://password-reset-4t87.onrender.com/reset-password/{randomString}`
- **Request Body:**
    - `newPassword`: The new password chosen by the user.
- **Purpose:** Resets the user's password using the random string from the reset link.
- **Responses:**
  - **200 OK:** Password successfully reset.
  - **400 Bad Request:** Invalid or expired reset link.

---

## Password Reset Flow

### 1. **Forgot Password Page Design**
The page allows the user to enter their registered email ID to start the password reset process.

**Flow:**
- **Email Input:** A form where the user enters their email address.
- **Submit Button:** Triggers the password reset process.

---

### 2. **Backend Logic for Password Reset Request**
- **Check if User Exists:** The backend verifies if the email entered by the user exists in the database.
  - If the user **does not exist**, return a "User Not Found" message.
  - If the user **exists**, generate a **random string** and send a **reset link** (containing the string) to the user's registered email address.

**Steps:**
1. **Generate Random String:** A unique random string is created, used to authenticate the reset request.
2. **Send Reset Link:** The system sends an email containing the reset link (e.g., `https://password-reset-4t87.onrender.com/reset-password/{randomString}`) to the user's email.
3. **Store the Random String:** The random string is saved in the database alongside the user's account for later verification.

---

### 3. **User Clicks the Reset Link**
When the user clicks the reset link in the email, the random string is passed to the backend for verification.

- **Validate the Random String:** The backend checks whether the string matches the one stored in the database for that user.
  - **If the string is valid**, proceed to display the password reset form.
  - **If invalid**, show an error message (e.g., "Invalid or Expired Link").

---

### 4. **Password Reset Form**
- **New Password Field:** The user enters their new password.
- **Submit Button:** The user submits the new password.

---

### 5. **Backend Logic for Password Reset**
- The backend verifies if the random string passed by the user matches the one stored in the database.
  - **If valid:** The user's password is updated in the database, and the random string is removed for security.
  - **If invalid:** An error message is returned, such as "Invalid or Expired Reset Link."

---

## Frontend Design (React & Bootstrap)

### 1. **Forgot Password Page**
- The page consists of a simple form with:
  - **Email Input:** The user enters their email address.
  - **Submit Button:** Initiates the password reset request.
- If the user does not exist in the database, an error message is displayed.

### 2. **Password Reset Page**
- After clicking the reset link, the user is directed to a page with:
  - **New Password Input:** Where the user types their new password.
  - **Submit Button:** To confirm the password change.

---

## Database Schema (MongoDB)

1. **User Schema:**
   The user schema stores essential information such as:
   - `email`: User's registered email (unique).
   - `password`: User's hashed password.
   - `randomString`: A temporary token used to verify the password reset request.
   - `resetTokenExpiry`: Expiry time of the reset token.

---

## Key Constraints

- **Email Validation:** Ensure that only registered users can request a password reset. If the user is not found, an error message should be shown.
- **Token Expiry:** The reset token should expire after a set period (e.g., 1 hour) for security reasons.
- **Random String Generation:** The random string used in the password reset link should be unique and difficult to guess to prevent security breaches.

---

## Conclusion

This system provides a seamless way for users to reset their passwords in case they forget them, with secure email-based verification. The backend verifies the user's identity, stores the reset token temporarily, and securely updates the password once the link is clicked. The frontend is designed using React and Bootstrap for ease of use and responsiveness, and the backend is built with Node.js and MongoDB for a reliable and scalable solution.