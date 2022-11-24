const Note = require("../../models/note");
const User = require("../../models/user");
const UserToken = require("../../models/userToken");

async function cleanupDb() {
  await Note.deleteMany({});
  await User.deleteMany({});
  await UserToken.deleteMany({});
  console.log("Cleaned up the database.");
}

module.exports = cleanupDb;
