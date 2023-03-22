# NotesApp

NotesApp is a Google Keep clone built using MERN stack. It is supposed to be a bit more advanced take on a classic "NotesApp".

## Features

- [x] Basic CRUD operations on front-end
- [x] Basic CRUD operations on back-end
- [x] Changing colors of the notes
- [x] Toast notifications
- [x] Authentication with token refreshing
- [x] Archiving notes
- [x] Pinning notes
- [x] Adding tags to the notes & filtering by them
- [x] Search functionality
- [x] Changing order via drag & drop
- [x] Checklists inside notes
- [x] Masonry layout for notes
- [x] A somewhat responsive layout, of course

## Setup

First you need to install packages:

```
npm run install-modules
```

You also have to create .env file in the server directory with your own MongoDB credentials and a secret key. You can find a sample .env file in `server/.env.sample` - you can just copy it, rename it to .env and provide your own values.

Then to start the app you have to run two consoles, one for front-end and one for back-end. There are commands for the root directory:

```
npm run start:server
```

And on the second console:

```
npm run start:client
```

### Log-in credentials

The server application seeds automatically if there are no users in the database. You can find the most current seed data in `server/utils/seed` folder, but one of these credentials should work:

```
Username: test@user.com
Password: testing
```

```
Username: test2@user.com
Password: testing
```

### Environment variables

| Variable name      | Description                                                              | Required? |
| ------------------ | ------------------------------------------------------------------------ | --------- |
| MONGO_USER         | Username for your MongoDB connection string.                             | Yes       |
| MONGO_PASSWORD     | Password for your MongoDB connection string.                             | Yes       |
| SECRET_KEY         | A secret key that will be used to sign and verify JWTs.                  | Yes       |
| REFRESH_SECRET_KEY | A secret key that will be used to sign and verify JWT refresh tokens.    | Yes       |
| FORCE_SEED         | If you set it to "true", the database will be cleaned up before seeding. | No        |

## Technologies

### Front-end

- React
  - React Router
  - PropTypes
  - CSS Modules
- SCSS
- react-dnd

### Back-end

- Node.js
- Express
- MongoDB
- Mongoose
