# Protractor Accessibility Reporter

protractor-accessibility-reporter will run an accessibility audit using axe-webdriverjs and output the results in the console. The results can also be configured to output as a .csv file to a desired directory.

## Installation

To install the package use the following command at root level:

```
npm install --save protractor-accessibility-reporter
```

## Usage

In your config file you should set your plugin options:

```
{
 package: 'protractor-accessibility-reporter',
  options: {
   outputCSV: true,
   outputCSVFolder: 'tests/testresults/accessibility',
   exclude: [
    'Ensures the document has only one main landmark and each iframe in the page has at most one main landmark',
    'Ensures all page content is contained by landmarks'
   ]
 }
}
```

Set outputCSV to false if you do not want to export all results.
Add any tests to the exclude array that you do not want to run.

In your test file:

```
const accessibility = require('protractor-accessibility-reporter')

describe('W3C City Lights', () => {
  it('There should be no violations', async () => {
    await browser.waitForAngularEnabled(false)
    await browser.get('https://www.w3.org/WAI/demos/bad/after/home.html')
    expect(await acessibility.runAxeTest('City Lights Good')).toEqual(0)
  })

  it('There should be violations', async () => {
    await browser.waitForAngularEnabled(false)
    await browser.get('https://www.w3.org/WAI/demos/bad/before/home.html')
    expect(await acessibility.runAxeTest('City Lights Bad')).toBeGreaterThan(0)
  })
})
```

This will result in the following output:

```
---------- Accessibility Audit Results - City Lights Good ----------
 PASS: Ensures aria-hidden='true' is not present on the document body. (1 passes, 0 fails, 1 total)
 PASS: Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content (1 passes, 0 fails, 1 total)
 PASS: Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds (62 passes, 0 fails, 62 total)
 PASS: Ensures each HTML document contains a non-empty <title> element (1 passes, 0 fails, 1 total)
 PASS: Ensures every id attribute value used in ARIA and in labels is unique (1 passes, 0 fails, 1 total)
 PASS: Ensures every id attribute value is unique (22 passes, 0 fails, 22 total)
 PASS: Ensures headings have discernible text (9 passes, 0 fails, 9 total)
 PASS: Ensures form field does not have multiple label elements (1 passes, 0 fails, 1 total)
 PASS: Ensures the order of headings is semantically correct (9 passes, 0 fails, 9 total)
 PASS: Ensures every HTML document has a lang attribute (1 passes, 0 fails, 1 total)
 PASS: Ensures the lang attribute of the <html> element has a valid value (1 passes, 0 fails, 1 total)
 PASS: Ensures <img> elements have alternate text or a role of none or presentation (9 passes, 0 fails, 9 total)
 PASS: Ensure image alternative is not repeated as text (9 passes, 0 fails, 9 total)
 PASS: Ensures input buttons have discernible text (1 passes, 0 fails, 1 total)
 PASS: Ensures that every form element is not solely labeled using the title or aria-describedby attributes (1 passes, 0 fails, 1 total)
 PASS: Ensures every form element has a label (1 passes, 0 fails, 1 total)
 PASS: Ensures the document has at most one banner landmark (1 passes, 0 fails, 1 total)
 PASS: Ensures the document has at most one contentinfo landmark (1 passes, 0 fails, 1 total)
 PASS: Ensures links have discernible text (55 passes, 0 fails, 55 total)
 PASS: Ensures that lists are structured correctly (5 passes, 0 fails, 5 total)
 PASS: Ensures <li> elements are used semantically (16 passes, 0 fails, 16 total)
 PASS: Ensure that the page, or at least one of its frames contains a level-one heading (1 passes, 0 fails, 1 total)
 PASS: Ensure all skip links have a focusable target (1 passes, 0 fails, 1 total)

 This page had a 100% pass rate.

 The elements on this page had a 100% pass rate. More details are included in the report.

 ---------- Accessibility Audit Results - City Lights Bad ----------
 PASS: Ensures aria-hidden='true' is not present on the document body. (1 passes, 0 fails, 1 total)
 PASS: Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content (1 passes, 0 fails, 1 total)
 FAIL: Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds (62 passes, 2 fails, 64 total)
 PASS: Ensures each HTML document contains a non-empty <title> element (1 passes, 0 fails, 1 total)
 PASS: Ensures every id attribute value used in ARIA and in labels is unique (1 passes, 0 fails, 1 total)
 PASS: Ensures every id attribute value is unique (22 passes, 0 fails, 22 total)
 PASS: Ensures headings have discernible text (9 passes, 0 fails, 9 total)
 PASS: Ensures form field does not have multiple label elements (1 passes, 0 fails, 1 total)
 PASS: Ensures the order of headings is semantically correct (9 passes, 0 fails, 9 total)
 FAIL: Ensures every HTML document has a lang attribute (1 passes, 1 fails, 2 total)
 PASS: Ensures the lang attribute of the <html> element has a valid value (1 passes, 0 fails, 1 total)
 FAIL: Ensures <img> elements have alternate text or a role of none or presentation (9 passes, 33 fails, 42 total)
 PASS: Ensure image alternative is not repeated as text (9 passes, 0 fails, 9 total)
 PASS: Ensures input buttons have discernible text (1 passes, 0 fails, 1 total)
 PASS: Ensures that every form element is not solely labeled using the title or aria-describedby attributes (1 passes, 0 fails, 1 total)
 FAIL: Ensures every form element has a label (1 passes, 1 fails, 2 total)
 PASS: Ensures the document has at most one banner landmark (1 passes, 0 fails, 1 total)
 PASS: Ensures the document has at most one contentinfo landmark (1 passes, 0 fails, 1 total)
 FAIL: Ensures links have discernible text (55 passes, 7 fails, 62 total)
 PASS: Ensures that lists are structured correctly (5 passes, 0 fails, 5 total)
 PASS: Ensures <li> elements are used semantically (16 passes, 0 fails, 16 total)
 PASS: Ensure that the page, or at least one of its frames contains a level-one heading (1 passes, 0 fails, 1 total)
 PASS: Ensure all skip links have a focusable target (1 passes, 0 fails, 1 total)
 PASS: Ensures aria-hidden='true' is not present on the document body. (1 passes, 0 fails, 1 total)
 PASS: Ensure that text spacing set through style attributes can be adjusted with custom stylesheets (8 passes, 0 fails, 8 total)
 PASS: Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content (1 passes, 0 fails, 1 total)
 PASS: Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds (73 passes, 0 fails, 73 total)
 PASS: Ensures each HTML document contains a non-empty <title> element (1 passes, 0 fails, 1 total)
 PASS: Ensures every id attribute value is unique (14 passes, 0 fails, 14 total)
 PASS: Ensures headings have discernible text (1 passes, 0 fails, 1 total)
 PASS: Ensures form field does not have multiple label elements (1 passes, 0 fails, 1 total)
 PASS: Ensures the order of headings is semantically correct (1 passes, 0 fails, 1 total)
 PASS: Ensures <img> elements have alternate text or a role of none or presentation (9 passes, 0 fails, 9 total)
 PASS: Ensure image alternative is not repeated as text (42 passes, 0 fails, 42 total)
 PASS: Ensures that every form element is not solely labeled using the title or aria-describedby attributes (1 passes, 0 fails, 1 total)
 PASS: Ensures the document has at most one banner landmark (1 passes, 0 fails, 1 total)
 PASS: Ensures the document has at most one contentinfo landmark (1 passes, 0 fails, 1 total)
 PASS: Ensures presentational <table> elements do not use <th>, <caption> elements or the summary attribute (10 passes, 0 fails, 10 total)
 PASS: Ensures links have discernible text (48 passes, 0 fails, 48 total)
 PASS: Ensures that lists are structured correctly (2 passes, 0 fails, 2 total)
 PASS: Ensures <li> elements are used semantically (8 passes, 0 fails, 8 total)
 PASS: Ensure that the page, or at least one of its frames contains a level-one heading (1 passes, 0 fails, 1 total)
 PASS: Ensure all skip links have a focusable target (1 passes, 0 fails, 1 total)
 PASS: Ensure that tables do not have the same summary and caption (10 passes, 0 fails, 10 total)
 PASS: Ensure that each cell in a table using the headers refers to another cell in that table (10 passes, 0 fails, 10 total)

 Minor: 0
 Moderate: 0
 Serious: 5
 Critical: 3

 This page had a 89% pass rate.

 The elements on this page had a 91% pass rate. More details are included in the report.
```

## Testing

Install all modules:

```
npm install
```

Update webdriver:

```
npm run update-webdriver
```

Run tests:

```
npm run test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
