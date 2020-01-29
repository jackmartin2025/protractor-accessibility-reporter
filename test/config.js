exports.config = {
  SELENIUM_PROMISE_MANAGER: false,
  directConnect: true,
  specs: ['test.spec.js'],
  plugins: [
    {
      path: '../index.js',
      options: {
        outputCSV: true,
        outputCSVFolder: 'test/results',
        exclude: [
          'Ensures the document has only one main landmark and each iframe in the page has at most one main landmark',
          'Ensures all page content is contained by landmarks'
        ]
      }
    }
  ]
}