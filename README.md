# NotesApp

NotesApp is a Google Keep clone that is still under development. It is supposed to be a bit more advanced take on a classic "NotesApp".

At the moment, the app is mostly doing basic CRUD operations on front-end as well as the back-end while imitating Google Keep UI on the front-end. You can find the list of planned features below.

## Features

- [x] Basic CRUD operations on front-end
- [x] Basic CRUD operations on back-end
- [x] Changing colors of the notes
- [x] Toast notifications
- [ ] Authentication
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

You also have to create .env file in the server directory with your own MongoDB credentials, like this:

```
MONGO_USER="your_username"
MONGO_PASSWORD="your_password"
```

Then to start the app you have to run two consoles, one for front-end and one for back-end. There are commands for the root directory:

```
npm run start:server
```

And on the second console:

```
npm run start:client
```

## Technologies

### Front-end

- React
- SCSS
- PropTypes

### Back-end

- Node.js
- Express
- MongoDB
- Mongoose
