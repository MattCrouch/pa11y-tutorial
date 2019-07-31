// Import file system and pa11y-test modules
const fs = require("fs-extra");
const pa11yTest = require("./pa11y-test");

// Pa11y runs asynchronously
const runTests = async () => {
  // Clear any previous results out
  await fs.emptyDir("results");

  // Test the login page
  await pa11yTest("login", "localhost:3000/login");

  // Test the initial dashboard view
  await pa11yTest("dashboard", "localhost:3000", {
    headers: {
      Cookie: "is-logged-in=1"
    }
  });

  // Test what the page looks like when an issue is present
  await pa11yTest("more-info", "localhost:3000", {
    actions: ["click element .issue a"],
    headers: {
      Cookie: "is-logged-in=1"
    }
  });
};

runTests();
