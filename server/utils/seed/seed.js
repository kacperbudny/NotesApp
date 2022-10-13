const Note = require("../../models/note");
const User = require("../../models/user");
const getDefaultUsers = require("./defaultUsers");
const getDefaultNotes = require("./defaultNotes");

async function seed() {
  const usersCount = await User.findOne();
  if (!usersCount) {
    const defaultUsers = await getDefaultUsers();

    for (const defaultUser of defaultUsers) {
      const user = new User(defaultUser);
      const defaultNotes = getDefaultNotes(user._id);
      const insertedNotes = await Note.insertMany(defaultNotes);
      user.notes.push(...insertedNotes);
      await user.save();
    }

    console.log("Seeded successfully");
  }
}

module.exports = seed;
