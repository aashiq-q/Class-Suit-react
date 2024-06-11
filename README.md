# Classroom Management Application

## Overview

This project is a classroom management application designed to streamline educational processes and enhance student engagement. It allows administrators to create and manage classrooms, make announcements, assign tasks, and track submissions. Students can join classrooms, view announcements, and submit their work.

## Key Features

- **Classroom Creation & Management**: Admins can set up classrooms, distribute unique class codes, and manage memberships by adding or removing participants.
- **Announcements**: Facilitates real-time communication through announcements, ensuring all classroom members are informed of important updates.
- **Task Assignments**: Admins can assign tasks, and students can submit their work in various file formats.
- **Submission Review**: Provides an intuitive interface for admins to track, review, and evaluate student submissions.

## Tech Stack

- **React.js**: For crafting a dynamic and responsive user interface.
- **Firebase Firestore**: For robust and scalable database management.
- **Firebase Authentication**: For secure and seamless user login.
- **Firebase Storage**: For reliable and efficient file storage solutions.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development environment:

- Node.js
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mrudulkolambe/Class-Suit-react/
   cd Class-Suit-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a Firebase Project**

- Go to the [Firebase Console](https://console.firebase.google.com/).
- Click on "Add Project" and follow the instructions to set up a new project.

4. **Enable Firestore, Authentication, and Storage**

- In the Firebase Console, select your project.
- Enable Firestore:
  - Go to the "Firestore Database" section.
  - Click on "Create database" and follow the instructions to set up Firestore in production mode.
- Enable Authentication:
  - Go to the "Authentication" section.
  - Click on "Sign-in method" and enable "Google" as a sign-in provider.
- Enable Storage:
  - Go to the "Storage" section.
  - Click on "Get Started" and follow the instructions to set up Firebase Storage.

5. **Start project**
  ```bash
  npm run start
  ```
