const puppeteer = require("puppeteer");

async function getOccucpancy() {
    let occupancy = 'ERROR';
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    //Get the occupancy page and wait for it to fully load
    await page.goto("https://www.nonstopgym.com/occupancy/", {
      waitUntil: "networkidle2",
    });

    occupancy = await page.evaluate(() => {
      //The element 8 in the data array is for Servette gym.
      // Get the variable from Servette in the Chart JS object
      return Chart.instances[0].data.datasets[0].data[7]
    });
    console.log(
      "Current occupacy:",
      occupancy
    );

    await browser.close();
    return occupancy;
}

exports.getOccucpancy = getOccucpancy;
