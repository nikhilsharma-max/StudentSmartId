# Authentication System (Register & Email Verification)

## Objective

Implement user registration and email verification flow for StudentSmartId.

---

## Work Completed

### 1. Created Authentication Module

Created:

* User Model
* Session Model
* Authentication Routes
* Authentication Controller

---

### 2. Implemented User Registration

Created:

POST /auth/register

Features:

* Username validation
* Email validation
* Password validation
* Role validation
* Duplicate user check
* Password hashing using SHA256
* Verification token generation
* Verification token hashing
* Verification token expiry generation
* User creation in database

---

### 3. Integrated Nodemailer

Created email service using:

* Nodemailer
* Gmail SMTP

Configured:

* HOST
* APP_PASSWORD

Successfully sent test emails.

---

### 4. Email Verification Flow

Generated:

* Raw verification token
* Hashed verification token

Stored:

* verificationTokenHash
* verificationTokenExpiry

Sent verification email containing verification link.

---

### 5. Implemented Email Verification Route

Created:

GET /auth/verify-email

Flow:

* Receive token
* Hash token
* Match with database record
* Verify expiry
* Set user as verified
* Remove verification token
* Return success response

Successfully verified user email.

---

## Major Debugging Performed

### Problem 1

Route was not appearing to work.

Investigation:

* Added global middleware logs
* Added route middleware logs
* Added controller logs

Result:

Request was reaching controller correctly.

---

### Problem 2

Register controller was failing.

Investigation:

* Commented entire controller
* Gradually uncommented sections
* Sent request after every change

Result:

Identified exact failing block inside user creation logic.

Fixed issue successfully.

---

### Problem 3

Email service not reading environment variables.

Investigation:

* Printed process.env values
* Verified dotenv loading path

Result:

Fixed .env loading issue.

---

### Problem 4

Email verification URL mismatch.

Investigation:

* Compared route definition and generated URL

Result:

Corrected verification URL format.

---

## Learnings

1. Debugging should be done step-by-step.
2. Logs are more valuable than guessing.
3. Always isolate the failing block.
4. Verification tokens should never be stored in plain text.
5. Hashing verification tokens improves security.
6. Route parameter and query parameter mismatches are common backend bugs.
7. Authentication systems are mostly flow management, not complex coding.

---

## Current Status

Completed:

* User Registration
* Email Verification
* Password Hashing
* Nodemailer Integration

Pending:

* Login
* JWT Access Token
* Refresh Token
* Session Management
* Logout
* Logout From All Devices

Project authentication foundation is now ready.
