const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@contexts": path.resolve(__dirname, "src/contexts/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@constants": path.resolve(__dirname, "src/utils/constants/"),
    },
  },
};
