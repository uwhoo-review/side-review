/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");

module.exports = () => {
  const path = ".env.development.local";
  const exist = fs.existsSync(path);

  if (exist) {
    return {
      path,
    };
  } else {
    throw new Error(
      "`.env.development.local` file is not existed!\n Please, add '.env.development.local' in your project"
    );
  }
};
