# Diagnostic Center Management System (HealthFlow)

## Overview
HealthFlow is a comprehensive Diagnostic Center Management System designed to manage appointments, patient records, test results, and administrative tasks effectively for diagnostic centers. The project aims to enhance the efficiency of diagnostic centers and provide users with a seamless experience.

## Live Site
[HealthFlow Live Site](https://assignment-twelve---full-stack.web.app)

## Admin Credentials
- **Username:** mithubiswasinfo@gmail.com
- **Password:** Mithu@1122

## Features
- **User Authentication and Profile Management**:
  - Secure email/password authentication using Firebase Authentication.
  - User registration with details like name, avatar (using imageBB for avatar upload), blood group, district, upazila, and password.
  - User profile management and admin control over user status (active/blocked).

- **User Dashboard (Private 🔒)**:
  - Private dashboard with sections for profile management, upcoming appointments, and test results.
  - Users can view and cancel upcoming appointments.
  - Access to test results with options to download or print.

- **Admin Dashboard**:
  - Management of users, tests, reservations, and banners.
  - Download user details in PDF format using jsPDF.
  - Statistical charts for booking and delivery ratios.

## Technology Stack
- **Frontend**: React, Firebase Authentication, React Router, Tailwind CSS/Bootstrap, Axios, Tanstack Query
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **Payment Gateway**: Stripe
- **PDF Generation**: jsPDF

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB
- Firebase Project

## Client Site GitHub Repository
[Client Repository](https://github.com/mithuchandrabiswas/Diagnostic-Center-Management-System-HealthFlow--Client)

## Server Site GitHub Repository
[Server Repository](https://github.com/mithuchandrabiswas/Diagnostic-Center-Management-System-HealthFlow--Server)

