# NotesApp

NotesApp is a Google Keep clone that is still under development. It is supposed to be a bit more advanced take on a classic "NotesApp".

At the moment, the app is mostly doing basic CRUD operations on front-end as well as the back-end while imitating Google Keep UI on the front-end. You can find the list of planned features below.

## Features

- [x] Basic CRUD operations on front-end
- [x] Basic CRUD operations on back-end
- [x] Changing colors of the notes
- [x] Toast notifications
- [x] Authentication
- [ ] Archiving notes
- [ ] Pinning notes
- [ ] Adding tags to the notes & filtering by them
- [ ] Search functionality
- [ ] Changing order via drag & drop
- [ ] Checklists inside notes

## Setup

First you need to install packages:

```
npm run install-modules
```

You also have to create .env file in the server directory with your own MongoDB credentials and a secret key, like this:

```
MONGO_USER="your_username"
MONGO_PASSWORD="your_password"
SECRET_KEY="secret_of_your_choice"
REFRESH_SECRET_KEY="secret_of_your_choice"
```

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

## Technologies

### Front-end

- React
  - React Router
  - PropTypes
  - CSS Modules
- SCSS

### Back-end

- Node.js
- Express
- MongoDB
- Mongoose
