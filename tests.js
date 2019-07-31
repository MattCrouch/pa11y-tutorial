const fs = require("fs-extra");
const pa11yTest = require("./pa11y-test");

const runTests = async () => {
  await fs.emptyDir("results");

  await pa11yTest("login", "localhost:3000/login");
  await pa11yTest("dashboard", "localhost:3000", {
    headers: {
      Cookie: "is-logged-in=1"
    }
  });
  await pa11yTest("more-info", "localhost:3000", {
    actions: ["click element .issue a"],
    headers: {
      Cookie: "is-logged-in=1"
    }
  });
};

runTests();
