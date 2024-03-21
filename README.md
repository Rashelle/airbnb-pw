
<h1 align="center">
  <br>
  Airbnb E2E - Playwright
  <br>
</h1>

<h4 align="center">A sanity spec using <a href="https://playwright.dev" target="_blank">Playwright</a>.</h4>

<p align="center">
  <a href="https://badge.fury.io/js/node">
    <img src="https://badge.fury.io/js/node.svg"
         alt="Gitter">
  </a>

  <a href="https://badge.fury.io/js/playwright">
    <img src="https://badge.fury.io/js/playwright.svg"
         alt="Gitter">
  </a>
  
  <a href="https://feedback.io/to/rachelkosib@gmail.com">
      <img src="https://img.shields.io/badge/Feedback-%E2%98%BC-1EAEDB.svg">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#download">Reports</a> •
  <a href="#download">CI</a> •
  <a href="#license">License</a>
</p>

## Key Features

* Running on Playwright
* POM and fixture available
* Based on a real life airbnb website  
* Runs over all browsers (Desktop only support)
* Using best practices such as specific test-id selectors

## How To Use



```bash

# Install dependencies
$ npm install

# Run the spec
$ npm test:e2e

# Run the spec with UI
$ npm test:e2e:ui
```

> **Note**
> If you don't have playwright installed globally, you can use locally `npx` as a runner - e.g `npx playwright test` instead.


## Reports 

Reports are attached to CI run, and can be downloaded as an artifact. 
You could also use the GH pages linked to the repo to see reports. 

## CI 

You can find github actions workflow that runs E2E's as part of commits that are made during the PR phase.

## License

MIT

---