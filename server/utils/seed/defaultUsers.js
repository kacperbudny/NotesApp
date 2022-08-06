const bcrypt = require("bcryptjs");

const getDefaultUsers = async () => {
  return [
    {
      email: "test@user.com",
      password: await bcrypt.hash("testing", 12),
    },
    {
      email: "test2@user.com",
      password: await bcrypt.hash("testing", 12),
    },
  ];
};

module.exports = getDefaultUsers;
