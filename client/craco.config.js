const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@contexts": path.resolve(__dirname, "src/contexts/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@constants": path.resolve(__dirname, "src/utils/constants/"),
    },
  },
};
