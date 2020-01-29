const AxeBuilder = require('axe-webdriverjs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter

// Variables
let pluginConfig = {}
let resultsSummary = []
let name = ''

async function onPrepare() {
  // Get the full config.
  const conf = this.config

  // Get default or use option.
  pluginConfig.outputCSV = getDefault(conf.options.outputCSV, false)
  pluginConfig.outputCSVFolder = getDefault(conf.options.outputCSVFolder, null)
  pluginConfig.exclude = getDefault(conf.options.exclude, [])
}

function getDefault(option, def) {
  return option === undefined ? def : option
}

// Run the aXe test.
function runAxeTest(testName = 'No Name Provided') {
  // Get the test name and set as global var.
  name = testName

  // Set builder.
  const builder = AxeBuilder(browser.driver)

  return new Promise((resolve, reject) => {
    // Run the audit.
    builder.analyze((err, results) => {
      if (err) {
        console.log(err)
        reject()
      } else {
        // Process results.
        resolve(processResults(results))
      }
    })
  })
}

async function processResults(results) {
  // For each pass...
  for (let i = 0; i < results.passes.length; i += 1) {
    if (!pluginConfig.exclude.includes(results.passes[i].description)) {
      // Where results will be stored.
      const resultSummary = {}

      // Store name.
      resultSummary.name = results.passes[i].description

      // Store how many passes.
      resultSummary.passes = results.passes[i].nodes.length

      // Right now there are no fails.
      resultSummary.fails = 0

      // Store total number of elements in test.
      resultSummary.total = results.passes[i].nodes.length

      // This test is a pass.
      resultSummary.result = 'PASS'

      // Store the impact.
      resultSummary.impact = results.passes[i].impact

      // Pass elements will be stored here.
      resultSummary.passElements = []

      // Fail elements will be stored here.
      resultSummary.failElements = []

      // Loop through each element that passed.
      for (let x = 0; x < results.passes[i].nodes.length; x += 1) {
        // Push the element to the array.
        resultSummary.passElements.push(results.passes[i].nodes[x].html)
      }
      // Push the results to the global var.
      resultsSummary.push(resultSummary)
    }
  }

  // For each violation...
  for (let i = 0; i < results.violations.length; i += 1) {
    if (!pluginConfig.exclude.includes(results.violations[i].description)) {
      // Results will be stored here.
      const resultSummary = {}

      // Store the name.
      const name = results.violations[i].description

      // Setting exists to false, exists will verify that the test has already run in passed and is in array.
      let exists = false

      // Looping through the already processed results...
      for (let x = 0; x < resultsSummary.length; x += 1) {
        // If the test already exists and is stored...
        if (name === resultsSummary[x].name) {
          // Add in how many fails.
          resultsSummary[x].fails = results.violations[i].nodes.length

          // Store total.
          resultsSummary[x].total = (resultsSummary[x].fails + resultsSummary[x].passes)

          // The test is not a FAIL as it has failed elements.
          resultsSummary[x].result = 'FAIL'

          // Store the impact.
          resultsSummary[x].impact = results.violations[i].impact

          // For each element that failed the test...
          for (let y = 0; y < results.violations[i].nodes.length; y += 1) {
            // Push the failed element.
            resultsSummary[x].failElements.push(results.violations[i].nodes[y].html)
          }
          // This element already exists in results summary.
          exists = true

          // Break - don't keep looking for it.
          break
        }
      }
      // If it is not already in results summary...
      if (!exists) {
        // Store name.
        resultSummary.name = name

        // Store fails.
        resultSummary.fails = results.violations[i].nodes.length

        // It is not in resultsSummary already so it has no passes.
        resultSummary.passes = 0

        // total will be how many fails as no passes.
        resultSummary.total = resultSummary.fails

        // This test is a fail.
        resultSummary.result = 'FAIL'

        // Store impact.
        resultSummary.impact = results.violations[i].impact

        // Pass element would be sotred here.
        resultSummary.passElements = []

        // Fail elements will be stored here.
        resultSummary.failElements = []

        // For each element that violated...
        for (let x = 0; x < results.violations[i].nodes.length; x += 1) {
          // Push the element name.
          resultSummary.failElements.push(results.violations[i].nodes[x].html)
        }
        // Push the results.
        resultsSummary.push(resultSummary)
      }
    }
  }

  // Write to CSV.
  await writeResults()

  // Log the results.
  return logResults()
}

async function writeResults() {
  // If the user wants csv file and folder is not null...
  if (pluginConfig.outputCSV) {
    if (pluginConfig.outputCSVFolder !== null) {
      // Format folder string.
      pluginConfig.outputCSVFolder = pluginConfig.outputCSVFolder.slice(-1) === '/' ? pluginConfig.outputCSVFolder : pluginConfig.outputCSVFolder + '/'

      // Create writer.
      const csvWriter = createCsvWriter({
        path: `${pluginConfig.outputCSVFolder}${name}.csv`,
        header: [
          { id: 'result', title: 'RESULT' },
          { id: 'description', title: 'DESCRIPTION' },
          { id: 'impact', title: 'IMPACT' },
          { id: 'element', title: 'ELEMENT' }
        ]
      })

      // Records will be stored here.
      const records = []

      // For each result...
      for (let i = 0; i < resultsSummary.length; i += 1) {
        // For each pass element...
        for (let x = 0; x < resultsSummary[i].passElements.length; x += 1) {
          // Push all results.
          records.push({
            result: 'PASS',
            description: resultsSummary[i].name,
            impact: resultsSummary[i].impact === null ? 'N/A' : resultsSummary[i].impact.toUpperCase(),
            element: resultsSummary[i].passElements[x]
          })
        }
        // For each fail element...
        for (let x = 0; x < resultsSummary[i].failElements.length; x += 1) {
          // Push all results.
          records.push({
            result: 'FAIL',
            description: resultsSummary[i].name,
            impact: resultsSummary[i].impact === null ? 'N/A' : resultsSummary[i].impact.toUpperCase(),
            element: resultsSummary[i].failElements[x]
          })
        }
      }

      // Try to write the file.
      try {
        await csvWriter.writeRecords(records)
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('')
      console.log('NO FOLDER PROVIDED - CANNOT WRITE TO CSV')
    }
  }
}

async function logResults() {
  let passes = 0
  let passElements = 0
  let fails = 0
  let failElements = 0
  const impactNames = [
    { name: 'minor', count: 0, colour: '\x1b[37m' },
    { name: 'moderate', count: 0, colour: '\x1b[32m' },
    { name: 'serious', count: 0, colour: '\x1b[33m' },
    { name: 'critical', count: 0, colour: '\x1b[31m' }
  ]
  console.log('')
  console.log(` ---------- Accessibility Audit Results - ${name} ----------`)
  // For each result...
  for (let i = 0; i < resultsSummary.length; i += 1) {
    // Set colour depending on result.
    const colour = resultsSummary[i].result === 'PASS' ? '\x1b[32m' : '\x1b[31m'

    // Count pass and fails.
    resultsSummary[i].result === 'PASS' ? passes += 1 : fails += 1

    // Output result.
    console.log(colour, `${resultsSummary[i].result}: ${resultsSummary[i].name} (${resultsSummary[i].passes} passes, ${resultsSummary[i].fails} fails, ${resultsSummary[i].total} total)`)

    passElements += resultsSummary[i].passElements.length
    failElements += resultsSummary[i].failElements.length
  }
  // br
  console.log('\x1b[0m', '')

  // If fail elements is not 0...
  if (failElements !== 0) {
    // For each pre defined impact...
    for (let i = 0; i < impactNames.length; i += 1) {
      // For each impact in the report
      for (let j = 0; j < resultsSummary.length; j += 1) {
        // If the impact is in the report, add 1 to counter.
        if ((impactNames[i].name === resultsSummary[j].impact) && (resultsSummary[j].failElements.length > 0)) {
          impactNames[i].count += 1
        }
      }
      // Output how many impacts.
      console.log(impactNames[i].colour, `${impactNames[i].name.replace(/^\w/, c => c.toUpperCase())}: ${impactNames[i].count}`)
    }
    // br
    console.log('')
  }

  // Log the pass percentage.
  console.log('\x1b[37m', `This page had a ${Math.round((passes / (passes + fails)) * 100)}% pass rate with ${passes} passes and ${fails} fails out of ${passes + fails} total tests.`)
  console.log('')
  console.log('\x1b[37m', `Within those ${passes + fails} total tests, ${(passElements + failElements)} elements were tested. ${passElements} passed and ${failElements} failed. The elements tested had a ${Math.round((passElements / (passElements + failElements)) * 100)}% pass rate.`)
  console.log('')
  // Only output this text if writing to CSV.
  if ((pluginConfig.outputCSV && pluginConfig.outputCSVFolder !== null)) {
    console.log('\x1b[37m', 'More details are included in the report.')
    console.log('')
  }

  // Empty results.
  resultsSummary = []

  return fails
}

exports.runAxeTest = runAxeTest
exports.onPrepare = onPrepare