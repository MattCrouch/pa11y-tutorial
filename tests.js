const fs = require("fs").promises;
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

// Login tests
pa11y("localhost:3000/login", {
  ...defaultOptions,
  screenCapture: `${__dirname}/login.png`
})
  .then(results => {
    console.log(results);
  })
  .catch(e => {
    console.log(e);
  });

// dashboard tests
pa11y("localhost:3000", {
  ...defaultOptions,
  headers: {
    Cookie: "is-logged-in=1"
  },
  screenCapture: `${__dirname}/dashboard.png`
})
  .then(async results => {
    const htmlResult = await html.results(results);
    await fs.writeFile("example.html", htmlResult);
  })
  .catch(e => {
    console.log(e);
  });
