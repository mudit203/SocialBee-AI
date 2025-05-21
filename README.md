# SocialBee AI

A full-stack social media application built using the MERN stack (MongoDB, Express, React, Node.js). The app includes features like user authentication, posts, likes, comments, real-time messaging, and AI-generated captions.

---

## Features

### Backend
- **User Authentication**: Register, login, logout, and profile management.
- **Posts**: Create, like, unlike, comment, and bookmark posts.
- **Real-Time Messaging**: Chat with other users using Socket.IO.
- **AI-Generated Captions**: Generate captions for posts using Google Generative AI.
- **Notifications**: Real-time notifications for likes and comments.
- **Suggested Users**: View and follow suggested users.

### Frontend
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Dynamic Feed**: View posts from all users.
- **Profile Management**: Edit profile, view posts, followers, and following.
- **Real-Time Chat**: Send and receive messages instantly.
- **AI Integration**: Generate captions for posts using AI.

---

## Backend API Routes
- `POST /register`: Register a new user.
- `POST /login`: Login a user.
- `GET /logout`: Logout the current user.
- `GET /:id/profile`: Get user profile by ID.
- `POST /profile/edit`: Edit user profile (bio, gender, profile picture).
- `GET /suggested`: Get suggested users.
- `POST /followOrUnfollow/:id`: Follow or unfollow a user.

### Post Routes (`/api/v1/post`)
- `POST /addpost`: Create a new post.
- `GET /all`: Get all posts.
- `GET /:id/like`: Like a post.
- `GET /:id/unlike`: Unlike a post.
- `POST /:id/comment`: Add a comment to a post.
- `GET /:id/comment/all`: Get all comments for a post.
- `DELETE /delete/:id`: Delete a post.
- `GET /:id/bookmark`: Bookmark or unbookmark a post.

### Message Routes (`/api/v1/message`)
- `POST /send/:id`: Send a message to a user.
- `GET /all/:id`: Get all messages in a conversation.

---

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- Cloudinary account (for image uploads)
- Google Generative AI API key

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mern-social-app.git
   cd mern-social-app

1. Install required dependencies:

    ```
    cd .\backend\
    npm install
    cd .\frontend\
    npm install
    ```
# Set up environment variables
```
PORT=8000
MONGO_URI=your_mongo_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
# Start the servers
**Backend-**
```
cd .\backend\
npm run dev
```

**Frontend-**
```
cd .\frontend\
npm run dev
```

**Open the app in your browser**
```
http://localhost:5173
```



