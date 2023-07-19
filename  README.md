### Installation

This project is tested on **Node v18.0.0** and above. While earlier versions of node may be compatible, but they have not been verified.

`Node.JS:` Install from the site - https://nodejs.org/en/ take the LTS version based on your Operating system. Please make sure you install NodeJS globally.

### Run Some Sample Tests

To execute the entire test suite you can use below command:
Local Environment `npx wdio run wdio.conf.js`.

##### Allure

The Allure Reporter creates [Allure](https://docs.qameta.io/allure/) test reports which is an HTML generated website with all necessary information to debug your test results and take a look on error screenshots. Add allure to the reporters array in config file and define the output directory of the allure reports. Please note, this has been added in wdio.conf.js file.

To generate and view an Allure report locally, run `npx allure generate` and `npx allure open`. The Allure report is hosted on a `web server` and can be accessed through http://YourMachineIP:5050/ and also generated locally which can be found at `./allure-report/index.html`.

### The Page Object Design Pattern

Within your web app's UI there are areas that your tests interact with. A Page Object simply models these as objects within the test code. This reduces the amount of duplicated code and means that if the UI changes, the fix need only be applied in one place. In other wards one of the challenges of writing test automation is keeping your [selectors] (classes, id's, or xpath's etc.) up to date with the latest version of your code. The next challenge is to keep the code you write nice and [DRY] (Don't Repeat Yourself). The page object pattern helps us accomplish this in one solution. Instead of including our selectors in Spec file (in Jasmine), we instead place them in a `<pagename>.ts` file where we can manage all these selectors and methods together. Your test file should only call the test methods.

You can also place reusable functions or logic inside of these pages and call them from your step files. The page object serves as a layer of abstraction between tests and code. When A test fails, it fails on a individual step. That step may call a selector that is no longer valid, but that selector may be used by many other steps. By having a single source of truth of what the selector is supposed to be, fixing one selector on the page object could repair a number of failing tests that were affected by the same selector.

An object called `Page` will be created with the prototype model or by ES6 class pattern. This ensures that every instance of a page object is exported as a stateless construct. Any any changes to that state are handled in the browser, rather than on the server.

It is preferable to separate page objects into individual files that end with `.page.ts`. These will require the basic `page.ts` prototype construct / abstract class and create new objects for each individual page.
