const { Builder, Key, By } = require("selenium-webdriver");
const assert = require("assert");
const runTest = async () => {
  const browser = await new Builder().forBrowser("chrome").build();
  try {
    await browser.get("https://google.com");
    await browser
      .findElement(By.name("q"))
      .sendKeys("Search For Selenium", Key.ENTER);
    const responseReceived = await browser.getTitle();
    const expectedTitle = "Search For Selenium - Google Search";
    // if (assert.strictEqual(responseReceived, expectedTitle)) {
    if (responseReceived === expectedTitle) {
      let searchList = await browser.findElements(By.className("LC20lb"));
      for (let everySearch of searchList) {
        const textInside = await everySearch.getText();
        if (textInside !== "") {
          console.log(textInside);
        }
      }
      // let searchList = await browser.findElements(By.className("MjjYud"));
      // for (let everySearch of searchList) {
      //   const elementConsidered = await everySearch.findElement(
      //     By.className("LC20lb")
      //   );
      //   const textInside = await elementConsidered.getText();
      //   console.log(textInside);
      // }
    } else {
      throw new Error("Desired page not found");
    }
  } catch (errorOccurred) {
    console.log("The test has failed at poc point: ", errorOccurred);
  } finally {
    await browser.quit();
  }
};

runTest();
