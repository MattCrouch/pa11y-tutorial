const fs = require("fs-extra");
const html = require("pa11y-reporter-html");
const pa11y = require("pa11y");

const defaultOptions = {
  includeWarnings: true,
  standard: "WCAG2AA",
  level: "notice",
  log: {
    debug: console.log,
    error: console.error,
    info: console.info
  }
};

const pa11yTest = async (name, url, options = {}) => {
  await fs.emptyDir(`results/${name}`);

  return pa11y(url, {
    ...defaultOptions,
    ...options,
    screenCapture: `results/${name}/screenshot.png`
  })
    .then(async results => {
      const htmlResult = await html.results(results);
      await fs.outputFile(`results/${name}/index.html`, htmlResult);
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports = pa11yTest;
