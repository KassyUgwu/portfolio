module.exports = {
  ci: {
    collect: {
      startServerCommand: "npx next start --port 3011",
      startServerReadyPattern: "Ready",
      url: [
        "http://127.0.0.1:3011/",
        "http://127.0.0.1:3011/work",
        "http://127.0.0.1:3011/about",
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: "--no-sandbox",
      },
    },
    assert: {
      assertions: {
        "largest-contentful-paint": ["warn", { maxNumericValue: 4000, aggregationMethod: "median" }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1, aggregationMethod: "median" }],
        "categories:accessibility": ["error", { minScore: 0.9, aggregationMethod: "median" }],
      },
    },
  },
};
