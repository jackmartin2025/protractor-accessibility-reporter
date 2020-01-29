Protractor Accessibility Reporter

This package will run an accessibility audit using axe-webdriverjs and output the results in the console. The results can also be configured to output as a .csv file to a desiered directory.

Similar to other protractor accessibility plugins, you can run the audit like...

```
runAxeTest('Test Name')
```

If there are no violations, this will result in a console output like...

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

 This elements on this page had a 100% pass rate.
```

If there are violations, you can expect to see a console output like...

```
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

 This elements on this page had a 91% pass rate.
```

This plugin can be configured to export test results in a .csv file and exclude certain accessibility tests...

Add the folowing code to your config file to do this:

```
plugins: [
  {
    package: 'protractor-accessibility-reporter',
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
```

Installation

```
npm install protractor-accessibility-reporter
```

Testing

```
npm install

npm run update-webdriver

npm run test
```
