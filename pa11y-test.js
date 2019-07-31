// Import Pa11y tools and file system modules
const fs = require("fs-extra");
const pa11y = require("pa11y");
const html = require("pa11y-reporter-html");

// Keep common default options separate
const defaultOptions = {
  includeNotices: true,
  includeWarnings: true,
  log: {
    debug: console.log,
    error: console.error,
    info: console.info
  }
};

const pa11yTest = async (name, url, options = {}) => {
  // Make sure directory exists
  await fs.ensureDir(`results/${name}`);

  // Pa11y returns a Promise object
  return pa11y(url, {
    ...defaultOptions,
    ...options,
    screenCapture: `results/${name}/screenshot.png` // Save screenshots of every test
  })
    .then(async results => {
      // Convert test result to HTML
      const htmlResult = await html.results(results);

      // Output HTML to a `results` directory
      await fs.outputFile(`results/${name}/index.html`, htmlResult);
    })
    .catch(e => {
      // Log any set up issues to investigate
      console.log(e);
    });
};

module.exports = pa11yTest;
