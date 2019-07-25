const pa11y = require("pa11y");

pa11y("localhost:8080", {
  includeWarnings: true,
  standard: "WCAG2AA",
  level: "notice",
  log: {
    debug: console.log,
    error: console.error,
    info: console.info
  },
  screenCapture: `${__dirname}/my-screen-capture.png`
})
  .then(results => {
    console.log(results);
  })
  .catch(e => {
    console.log(e);
  });
