const acessibility = require('../index')

describe('W3C City Lights', () => {
  it('There should be no violations', async () => {
    await browser.waitForAngularEnabled(false)
    await browser.get('https://www.w3.org/WAI/demos/bad/after/home.html')
    await browser.sleep(2000)
    expect(await acessibility.runAxeTest('City Lights Good')).toEqual(0)
  })

  it('There should be violations', async () => {
    await browser.waitForAngularEnabled(false)
    await browser.get('https://www.w3.org/WAI/demos/bad/before/home.html')
    await browser.sleep(2000)
    expect(await acessibility.runAxeTest('City Lights Bad')).toBeGreaterThan(0)
  })
})